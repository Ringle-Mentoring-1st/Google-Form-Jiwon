import React from 'react';
import Header from "../components/Header/index"

function Landing() {

    const onClick = (good) => {
        return good.map(x => x * 2)
    }

    return (
        <div>
            <Header />
            홈
            <button onClick={e=>onClick()}>버튼</button>
        </div>
    );
}

export default Landing;