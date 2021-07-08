import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import v4 from "uuid/dist/esm-browser/v4";
import {updateQuestion} from "../../reducers/form";

function OptionInput({questionType, uuid, question}) {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.form.questions)
    const [etc, setEtc] = useState(true)

    useEffect(()=>{
        question.options.map(({text})=> {
            if(text === "기타"){
                setEtc(false)
            }
            else {
                setEtc(true)
            }
        })
    },[question])

    const addOption = (optionType) => {
        const cp = [...questions]
        const index = cp.findIndex(x => x.uuid === uuid)
        const options = cp[index].options
        const length = question.options.length
        if(optionType === 'etc'){
            options.push({
                uuid:v4(),
                text: '기타'
            })
        }
        if(optionType == 'option') {
            options.push({
                uuid: v4(),
                text: `옵션${length + 1}`
            })
        }
        dispatch(updateQuestion(cp))
    }
    const deleteOption = (optionUuid) => {
        const cp = [...questions]
        const index = cp.findIndex(x => x.uuid === uuid)
        const newOptions = question.options.filter(({uuid}) => uuid !== optionUuid)
        cp[index].options = newOptions
        dispatch(updateQuestion(cp))
    }

    const onChangeOption = (optionUuid, value) => {
        const cp = [...questions]
        const index = cp.findIndex(x => x.uuid === uuid)
        const optionIndex = question.options.findIndex(op => op.uuid === optionUuid)
        cp[index].options[optionIndex].text = value
        dispatch(updateQuestion(cp))
    }


    return (
        <div>
            {
                question.options && question.options.map(({text, uuid}) =>
                    <div key={uuid}>
                        {questionType === "radio" ?
                            <input type="radio"/>
                            :
                            <input type="checkbox"/>
                        }
                        <input type="text" placeholder={text} value={text}
                               onChange={(e) => onChangeOption(uuid, e.target.value)}/>
                        <button onClick={() => deleteOption(uuid)}>옵션 삭제</button>
                    </div>
                )
            }
            <button onClick={()=>addOption('option')}>옵션 추가</button>
            { etc && <button onClick={()=>addOption('etc')}>기타 추가</button>}
        </div>
    );
}


export default OptionInput;