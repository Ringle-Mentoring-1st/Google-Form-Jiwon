import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { firebaseApp } from "../../firebase"
import { userLogOut } from "../../reducers";
import "./style.css"

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.userProfile);
    const onLogout = () => {
        firebaseApp
            .auth()
            .signOut()
            .then(() => {
                dispatch(userLogOut());
                alert("로그아웃되었습니다.");
                history.push("/login");
            })
            .catch((error) => {
                alert(error);
            });
    };
    const clickLogo = () => {
        if (userProfile) {
            history.push("/");
        }
        if (!userProfile) {
            history.push("/login");
        }
    };
    return (
        <div className="header-container">
            <div>폼폼</div>
            <Link to="/create/form">폼 만들기</Link>
            <button onClick={onLogout}>로그아웃</button>
        </div>
    );
}

export default Header;