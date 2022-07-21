import React, { useEffect } from 'react';
import styles from './magazine.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../shared/firebase';
import { useDispatch, useSelector } from 'react-redux';
import MagazineItem from './magazine_item';
import { loadMagazineFB } from '../../redux/modules/magazine';


const Magazine = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMagazineFB());
    }, []);
    const data = useSelector((state) => state.magazine.post);
    const navigate = useNavigate();
    return (
        <div className={styles.wrap}>
            <ul className={styles.list}>
                {data.map((item, index) => <MagazineItem key={index} index={index} />)}
            </ul>
            <div className={styles.togo} onClick={() => navigate(`/write`)}>
                <FontAwesomeIcon icon={faPen} className={styles.icon} />
            </div>
        </div>
    );
};
export default Magazine;