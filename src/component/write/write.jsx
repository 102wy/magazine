import React from 'react';
import styles from './write.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Write = () => {
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
                        <input type="file" id="file" accept='image/*' required style={{ display: "none" }} />
                    </form>
                </div>
                <div className={styles.right}>
                    <form action="" className={styles.textform}>
                        <textarea name="" id="" cols="30" rows="10" className={styles.textarea} placeholder="내용을 입력해 주세요"></textarea>
                    </form>
                </div>
            </div>
            <div className={styles.layout}>
                <h3>미리보기</h3>
            </div>
        </div>
    );
};

export default Write;