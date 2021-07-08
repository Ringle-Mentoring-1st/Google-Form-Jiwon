import React from 'react';
import "./style.css"
import {useDispatch} from "react-redux";
import {onChangeFormInfo} from "../../reducers/form";

function Title({formInfo}) {
    const dispatch = useDispatch();
    console.log('formInfo', formInfo)
    return (
        <div className="form-title-container">
            <input className="title" type="text" placeholder="제목 없는 설문지"
                   value={formInfo.title}
                   onChange={(e) => dispatch(onChangeFormInfo('title', e.target.value))}/>
            <input className="subtitle" type="text" placeholder="설문지 설명"
                   value={formInfo.subTitle}
                   onChange={(e) => dispatch(onChangeFormInfo("subTitle", e.target.value))}/>
        </div>
    );
}

export default Title;