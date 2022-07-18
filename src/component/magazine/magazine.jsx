import React from 'react';
import styles from './magazine.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Magazine = (props) => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrap}>
            <ul className={styles.list}>
                <li className={styles.right}>
                    <div className={styles.header}>
                        <h1>메인입니다</h1>
                    </div>
                    <section className={styles.section}>
                        <div className={styles.imgbox}></div>
                        <div className={styles.textbox}></div>
                    </section>
                </li>
            </ul>
            <div className={styles.togo} onClick={() => navigate(`/write`)}>
                <FontAwesomeIcon icon={faPen} className={styles.icon} />
            </div>
        </div>
    );
};
export default Magazine;