import React, { useRef } from 'react';
import styles from './signup.module.scss';
import { auth } from '../../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const id_ref = useRef();
    const name_ref = useRef();
    const pw_ref = useRef();
    const pw_re_ref = useRef();

    const navigate = useNavigate();

    const signupFB = async (e) => {
        e.preventDefault();
        if (id_ref.current.value == '') {
            alert('아이디를 입력해 주세요');
            return;
        }
        if (!(id_ref.current.value.includes('@'))) {
            alert('이메일로 가입해주세요');
            return;
        }
        if (pw_ref.current.value == '') {
            alert('비밀번호를 입력해 주세요');
            return;
        }
        if (pw_ref.current.value !== pw_re_ref.current.value) {
            alert('비밀번호를 다시 확인해 주세요');
            return
        }
        const user = await createUserWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        )
        const user_doc = await addDoc(collection(db, "users"), {
            user_id: user.user.email,
            name: name_ref.current.value
        });
        navigate(`/login`);
    }


    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>회원가입</h3>
            <form action="">
                <label htmlFor="signupform">
                    <p>아이디</p>
                    <input type="text" name="signupform" placeholder='아이디를 입력하세요' ref={id_ref} />
                </label>
                <label htmlFor="signupform">
                    <p>닉네임</p>
                    <input type="text" name="signupform" placeholder='닉네임을 입력하세요' ref={name_ref} />
                </label>
                <label htmlFor="signupform">
                    <p>비밀번호</p>
                    <input type="text" name="signupform" placeholder='비밀번호를 입력하세요' ref={pw_ref} type='password' />
                </label>
                <label htmlFor="signupform">
                    <p>비밀번호 확인</p>
                    <input type="text" name="signupform" placeholder='비밀번호를 다시 입력하세요' ref={pw_re_ref} type='password' />
                </label>
                <button onClick={signupFB}>회원가입하기</button>
            </form>
        </div>
    );
};

export default Signup;