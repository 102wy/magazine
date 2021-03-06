import React, { useEffect, useRef, useState } from 'react';
import styles from './write.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFB } from '../../redux/modules/user';
import { addMagazine, addMagazineFB } from '../../redux/modules/magazine';

const Write = () => {
    const [img, setImg] = useState(null);
    const [layout, setLayout] = useState(null);
    const navigate = useNavigate();
    const text_ref = useRef();
    const button = document.querySelector('#button');
    const dispatch = useDispatch();
    const user = auth.currentUser;
    useEffect(() => {
        dispatch(loadUserFB());
    }, []);
    const data = useSelector(state => state.user.users);
    const name = data.map(item => item.user_id == user.email ? item.name : 'user');
    const uploadFB = async (e) => {
        const uploaded_file = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`), e.target.files[0]);
        const file_url = await getDownloadURL(uploaded_file.ref);
        setImg({ url: file_url });
    }
    const uploadPost = async () => {
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
            // const post_doc = await addDoc(collection(db, "post"), {
            //     img_url: img.url,
            //     text: text_ref.current.value,
            //     layout: layout,
            //     time: now,
            //     user: name,
            // });
            dispatch(addMagazineFB({
                img_url: img.url,
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
                        <textarea name="" id="" cols="30" rows="10" className={styles.textarea} placeholder="내용을 입력해주세요" ref={text_ref}></textarea>
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
                            {img == null ? <FontAwesomeIcon icon={faImage} className={styles.img_icon} /> : <img src={img.url} alt="업로드 이미지" className={styles.image} />}
                        </div>
                    </div>
                </div>
                <div className={styles.right_layout}>
                    <div className={styles.img_area}>
                        <div className={styles.img}>
                            {img == null ? <FontAwesomeIcon icon={faImage} className={styles.img_icon} /> : <img src={img.url} alt="업로드 이미지" className={styles.image} />}
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
                            {img == null ? <FontAwesomeIcon icon={faImage} className={styles.img_icon} /> : <img src={img.url} alt="업로드 이미지" className={styles.image} />}
                        </div>
                    </div>
                </div>
            </div>
            <button id="button" className={styles.button} onClick={uploadPost}>게시글 작성</button>
        </div >
    );
};

export default Write;