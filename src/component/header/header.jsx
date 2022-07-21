import React, { useEffect } from 'react';
import styles from './header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <div className={styles.pagew}>
                <FontAwesomeIcon icon={faHouse} className={styles.home} onClick={() => navigate(`/`)} />
                <ul className={styles.on}>
                    <li onClick={() => navigate(`/signup`)}>회원가입</li>
                    <li onClick={() => navigate(`/login`)}>로그인</li>
                </ul>
            </div>
        </header>
    );
};

export default Header;