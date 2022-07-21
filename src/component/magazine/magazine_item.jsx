import React, { useEffect, useState } from 'react';
import styles from './magazine_item.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../shared/firebase';
import { deleteMagazineFB } from '../../redux/modules/magazine';

const MagazineItem = ({ index }) => {
    const [user, setUser] = useState(null);
    const data = useSelector((state) => state.magazine.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const editPost = () => {
        navigate(`/update/${data[index].id}`);
    }
    const deletePost = () => {
        dispatch(deleteMagazineFB(data[index].id));
        alert('삭제완료!');
    }
    useEffect(() => {
        setUser(auth.currentUser);
    }, []);
    const layout = data[index].layout;
    return (
        <li className={`${styles[layout]}`} >
            <div className={styles.header}>
                <div className={styles.user}>
                    <div className={styles.user_img}></div>
                    <p>{data[index].user}</p>
                </div>
                <p>{data[index].time}</p>
                {user !== null && (
                    <div className={styles.buttons}>
                        <button onClick={editPost}>수정</button>
                        <button onClick={deletePost}>삭제</button>
                    </div>
                )}
            </div>
            <section className={styles.section}>
                <div className={styles.imgbox} style={{ backgroundImage: `url(${data[index].img_url})`, backgroundSize: "cover" }}></div>
                <div className={styles.textbox}>
                    <p>{data[index].text}</p>
                </div>
            </section>
        </li >
    );
};

export default MagazineItem;