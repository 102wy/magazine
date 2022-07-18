
import React from 'react';
import styles from './loginheader.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth';
import { auth, db } from '../shared/firebase';
import { getDocs, collection, getDoc } from "firebase/firestore";

const Loginheader = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.pagew}>
                <FontAwesomeIcon icon={faHouse} className={styles.home} onClick={() => navigate(`/`)} />
                <ul className={styles.on}>
                    <p className={styles.username}>Hello user</p>
                    <li><FontAwesomeIcon icon={faBell} /> 2 </li>
                    <li onClick={() => signOut(auth)}>로그아웃</li>
                </ul>
            </div>
        </header>
    );
};

export default Loginheader;