
import React, { useEffect, useState } from 'react';
import styles from './loginheader.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth';
import { auth } from '../../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFB } from '../../redux/modules/user';

const Loginheader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_email = auth.currentUser.email;
    useEffect(() => {
        dispatch(loadUserFB());
    }, []);
    const data = useSelector(state => state.user.users);
    const name = data.map(item => item.user_id == user_email ? item.name : 'user');
    return (
        <header className={styles.header}>
            <div className={styles.pagew}>
                <FontAwesomeIcon icon={faHouse} className={styles.home} onClick={() => navigate(`/`)} />
                <ul className={styles.on}>
                    <p className={styles.username}>Hello {name}</p>
                    <li><FontAwesomeIcon icon={faBell} /></li>
                    <li onClick={() => signOut(auth)}>로그아웃</li>
                </ul>
            </div>
        </header>
    );
};

export default Loginheader;