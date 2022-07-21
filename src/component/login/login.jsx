import React, { useEffect, useRef } from 'react';
import styles from './login.module.scss';
import { auth, db } from '../../shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const id_ref = useRef();
    const pw_ref = useRef();
    const button_ref = useRef();
    const navigate = useNavigate();

    const loginFB = async (e) => {
        e.preventDefault();

        console.log(id_ref.current.value);

        const user = await signInWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        ).catch((error) => {
            alert('아이디와 비밀번호를 확인해주세요');
            id_ref.current.value = '';
            pw_ref.current.value = '';
        });
        const user_docs = await getDocs(query(
            collection(db, "users"), where("user_id", "==", user.user.email)
        ));
        // user_docs.forEach(user => console.log(user.data()));
        navigate(`/`);
    }

    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>로그인</h3>
            <form action="">
                <label htmlFor="loginform">
                    <p>아이디</p>
                    <input type="text" name="loginform" placeholder='아이디를 입력하세요' ref={id_ref} />
                </label>
                <label htmlFor="loginform">
                    <p>비밀번호</p>
                    <input type="text" name="loginform" placeholder='비밀번호를 입력하세요' ref={pw_ref} type='password' />
                </label>
                <button onClick={loginFB} ref={button_ref}>로그인하기</button>
            </form>
        </div>
    )
}

export default Login;