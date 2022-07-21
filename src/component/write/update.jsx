import React, { useEffect, useRef, useState } from 'react';
import styles from './write.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../shared/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFB } from '../../redux/modules/user';
import { loadMagazineFB, updateMagazineFB } from '../../redux/modules/magazine';

const Update = () => {
    useEffect(() => {
        dispatch(loadUserFB());
        dispatch(loadMagazineFB());
    }, []);
    const [layout, setLayout] = useState(null);
    const navigate = useNavigate();
    const text_ref = useRef();
    const button = document.querySelector('#button');
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const id = useParams();
    const user_data = useSelector(state => state.user.users);
    const name = user_data.map(item => item.user_id == user.email ? item.name : 'user');
    const magazine_data = useSelector(state => state.magazine.post);
    const data = magazine_data.filter(item => item.id == id.id);
    const img_url = data[0].img_url;
    const [img, setImg] = useState(img_url);
    const uploadFB = async (e) => {
        const uploaded_file = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`), e.target.files[0]);
        const file_url = await getDownloadURL(uploaded_file.ref);
        setImg(file_url);
    }
    const updatePost = async () => {
        let toDay = new Date();
        let year = toDay.getFullYear();
        let month = ("0" + toDay.getMonth()).slice(-2);
        let date = ("0" + toDay.getDate()).slice(-2);
        let hours = ("0" + toDay.getHours()).slice(-2);
        let minutes = ("0" + toDay.getMinutes()).slice(-2);
        let seconds = ("0" + toDay.getSeconds()).slice(-2);
        let now = (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

        if (text_ref.current.value == '') {
            button.disabled = true;
            alert('내용을 입력하세요');
            button.disabled = false
        } else if (img == null) {
            button.disabled = true;
            alert('사진을 추가하세요');
            button.disabled = false
        } else if (layout == null) {
            button.disabled = true;
            alert('레이아웃을 선택하세요');
            button.disabled = false
        } else {
            dispatch(updateMagazineFB(id, {
                img_url: img,
                text: text_ref.current.value,
                layout: layout,
                time: now,
                user: name,
            }));
            navigate(`/`);
        }
    }

    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>게시글 작성</h3>
            <div className={styles.write}>
                <div className={styles.left}>
                    <label htmlFor="file" className={styles.ficture}>
                        <FontAwesomeIcon icon={faCamera} className={styles.camera} />
                        <p>사진 올리기</p>
                    </label>
                    <form method='post'>
                        <input type="file" id="file" accept='image/*' required style={{ display: "none" }} onChange={uploadFB} />
                    </form>
                </div>
                <div className={styles.right}>
                    <form action="" className={styles.textform}>
                        <textarea name="" id="" cols="30" rows="10" className={styles.textarea} placeholder="내용을 입력해주세요" ref={text_ref} defaultValue={data[0].text}></textarea>
                    </form>
                </div>
            </div>
            <div className={styles.layout}>
                <h3>레이아웃 선택</h3>
                <div className={styles.right_layout}>
                    <div className={styles.input_area}>
                        <input type="radio" name="layout" value='right' onChange={(e) => setLayout(e.target.value)} />
                        <label htmlFor="layout">오른쪽에 이미지 왼쪽에 텍스트</label>
                    </div>
                    <div className={styles.img_area}>
                        <div className={styles.img}>
                            <img src={img} alt="업로드 이미지" className={styles.image} />
                        </div>
                    </div>
                </div>
                <div className={styles.right_layout}>
                    <div className={styles.img_area}>
                        <div className={styles.img}>
                            <img src={img} alt="업로드 이미지" className={styles.image} />
                        </div>
                    </div>
                    <div className={styles.input_area}>
                        <input type="radio" name="layout" value='left' onChange={(e) => setLayout(e.target.value)} />
                        <label htmlFor="layout">왼쪽에 이미지 오른쪽에 텍스트</label>
                    </div>
                </div>
                <div className={styles.bottom_layout}>
                    <div className={styles.input_area}>
                        <input type="radio" name="layout" value='bottom' onChange={(e) => setLayout(e.target.value)} />
                        <label htmlFor="layout">하단에 이미지 상단에 텍스트</label>
                    </div>
                    <div className={styles.img_area}>
                        <div className={styles.img}>
                            <img src={img} alt="업로드 이미지" className={styles.image} />
                        </div>
                    </div>
                </div>
            </div>
            <button id="button" className={styles.button} onClick={updatePost}>게시글 작성</button>
        </div >
    );
};

export default Update;