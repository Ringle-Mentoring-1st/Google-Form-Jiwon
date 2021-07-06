import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { firebaseApp, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserId, setUserProfile } from "../reducers/user";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loginPayload, setLoginPayload] = useState({
        email: "",
        pw: "",
        message: "",
    });

    const onChange = (e, key) => {
        const cp = { ...loginPayload };
        cp[key] = e.target.value;
        setLoginPayload(cp);
    };
    const onSubmit = () => {
        setLoginPayload({ ...loginPayload, message: "" });
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(loginPayload.email, loginPayload.pw)
            .then(() => {
                const uid = (firebaseApp.auth().currentUser || {}).uid;
                if (uid) {
                    //사인인 성공
                    history.push("/");
                    const userRef = db.collection("users").doc(uid);
                    userRef.get().then((snapShot) => {
                        const userInfo = snapShot.data();
                        dispatch(setUserId(userInfo.uid))
                        dispatch(
                            setUserProfile({
                                name: userInfo.name,
                                email: userInfo.email,
                            })
                        );
                    });
                } else {
                    alert("해당하는 유저가 없습니다.");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoginPayload({ ...loginPayload, message: errorMessage });
            });
    };
    return (
        <div>
            <div>로그인</div>
            <div>이메일</div>
            <input
                type="email"
                onChange={(e) => onChange(e, "email")}
                value={loginPayload.email}
                placeholder="이메일을 입력하세요."
            />
            <div>비밀번호</div>
            <input
                type="password"
                onChange={(e) => onChange(e, "pw")}
                value={loginPayload.pw}
                placeholder="비밀번호를 입력하세요."
            />
            <button type="button" onClick={onSubmit}>
                로그인
            </button>
            <div>{loginPayload.message}</div>
            <Link to="/signup">회원가입</Link>
        </div>
    );
}

export default Login;