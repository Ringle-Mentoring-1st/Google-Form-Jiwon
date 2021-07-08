import React from 'react';
import "./style.css"
import {useDispatch} from "react-redux";
import {deleteQuestion} from "../../reducers/form";
import TextInput from "../TextInput";
import OptionInput from "../OptionInput";

function QuestionItem({onQuestionUpdate, uuid, title, questionType, question}) {
    const dispatch = useDispatch();
    console.log('title', title)
    console.log('questionType', questionType)
    return (
        <div className="question-container">
            <div className="question-header">
                <input type="text" placeholder="질문" onChange={(e)=>onQuestionUpdate('title', uuid, e.target.value)} value={title} />
                <select onChange={(e)=>onQuestionUpdate('questionType', uuid, e.target.value)} value={questionType}>
                    <option value={"text"} >단답형</option>
                    <option value={"radio"} >객관식 질문</option>
                    <option value={"checkbox"} >체크박스</option>
                </select>
                <button onClick={()=>dispatch(deleteQuestion(uuid))}>삭제</button>
            </div>
            <div className="question-input">
                {questionType === "text" && <TextInput />}
                {questionType !== "text" && <OptionInput questionType={questionType} uuid={uuid} question={question}/> }
            </div>
        </div>
    );
}

export default QuestionItem;