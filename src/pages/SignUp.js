import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, firebaseApp, firebase } from "../firebase";
import { Link } from "react-router-dom";
import { setUserId, setUserProfile } from '../reducers/user';
import { useDispatch } from "react-redux";
import { validateEmail, validateName, validatePW } from '../util/formCheck';

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [signupPayload, setSignupPayload] = useState({
        email: "",
        pw: "",
        name: "",
        loading: false,
        message: "",
    });
    const [isAgreeInfo, setIsAgreeInfo] = useState(false);
    const onChange = (e, key) => {
        const cp = { ...signupPayload };
        cp[key] = e.target.value;
        setSignupPayload(cp);
    };
    const updateIsAgreeInfo = () => {
        setIsAgreeInfo(!isAgreeInfo);
    };
    const onSubmit = () => {
        setSignupPayload({ ...signupPayload, loading: true });
        setSignupPayload({ ...signupPayload, message: "" });

        if (!validateEmail(signupPayload.email).result) {
            const message = validateEmail(signupPayload.email).message;
            setSignupPayload({ ...signupPayload, message: message });
            return;
        }
        if(!validateName(signupPayload.name).result){
            const message = validateName(signupPayload.name).message;
            setSignupPayload({...signupPayload, message: message})
            return
        }
        if (!validatePW(signupPayload.pw).result) {
            const message = validatePW(signupPayload.pw).message;
            setSignupPayload({ ...signupPayload, message: message });
            return;
        }
        if (!isAgreeInfo) {
            setSignupPayload({
                ...signupPayload,
                message: "개인 정보 수집에 동의해주세요.",
            });
            return;
        }

        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(signupPayload.email, signupPayload.pw)
            .then(async () => {
                const uid = (firebaseApp.auth().currentUser || {}).uid;

                if (uid) {
                    const payload = {
                        uid: uid,
                        name: signupPayload.name,
                        email: signupPayload.email,
                        created: firebase.firestore.Timestamp.now().seconds,
                    };

                    await db.collection("users")
                        .doc(uid)
                        .set(payload)
                        .then(() => {
                            dispatch(setUserId(payload.uid))
                            dispatch(
                                setUserProfile({
                                    name: payload.name,
                                    email: payload.email,
                                })
                            );
                            alert("회원가입이 완료되었습니다.");
                            history.push("/");
                        })
                        .catch((error) => {
                            const errorMessage = error.message;
                            setSignupPayload({
                                ...signupPayload,
                                loading: false,
                                message: errorMessage,
                            });
                        });
                    //then set next navigation
                    //set user for redux
                } else {
                    alert("error");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setSignupPayload({
                    ...signupPayload,
                    loading: false,
                    message: errorMessage,
                });
            });
    };

    return (
        <div>
            <div>회원가입</div>
            <div>이메일</div>
            <input
                type="email"
                onChange={(e) => onChange(e, "email")}
                value={signupPayload.email}
                placeholder="이메일을 입력하세요."
            />
            <div>이름</div>
            <input
                onChange={(e) => onChange(e, "name")}
                value={signupPayload.name}
                placeholder="이름을 입력하세요."
            />
            <div>비밀번호</div>
            <input
                type="password"
                onChange={(e) => onChange(e, "pw")}
                value={signupPayload.pw}
                placeholder="비밀번호를 입력하세요."
            />
            <div>
                <div>개인 정보 수집 동의</div>
                <input
                    type="checkbox"
                    onClick={updateIsAgreeInfo}
                    defaultChecked={isAgreeInfo}
                    style={{ transform: "scale(1.5)", marginLeft: "20px" }}
                />
            </div>
            <button type="button" onClick={onSubmit}>
                가입하기
            </button>
            <div>{signupPayload.message}</div>
            <Link to="/login">이미 회원이신가요?</Link>
        </div>
    );
}

export default SignUp;