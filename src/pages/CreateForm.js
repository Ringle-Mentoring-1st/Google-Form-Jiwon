import React from 'react';
import v4 from "uuid/dist/esm-browser/v4";
import Title from "../components/Title";
import QuestionItem from "../components/QuestionItem";
import {useDispatch, useSelector} from "react-redux";
import {addQuestion, updateQuestion} from "../reducers/form";
import FormHeader from "../components/FormHeader";

function CreateForm() {
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.form.formInfo)
    const questions = useSelector(state => state.form.questions)
    const uuid = v4();

    const createDefaultQuestion = () => {
        return {
            uuid: v4(),
            title: "",
            questionType: "text"
        }
    }

    const onQuestionUpdate = (key, uuid, data) => {
        if (key === "questionType" && data !== "text") {
            const cp = [...questions]
            const index = cp.findIndex(x => x.uuid === uuid)
            cp[index] = {...cp[index], [key]: data}
            cp[index].options = [
                {
                    uuid: v4(),
                    text: `옵션1`
                }
            ]
            dispatch(updateQuestion(cp))
            return
        }
        const cp = [...questions]
        const index = cp.findIndex(x => x.uuid === uuid)
        cp[index] = {...cp[index], [key]: data}
        dispatch(updateQuestion(cp))
    }
    console.log(questions)

    return (
        <div>
            <FormHeader />
            <button>보내기</button>
            <button onClick={() => dispatch(addQuestion(createDefaultQuestion()))}>추가</button>
            {formInfo && <Title formInfo={formInfo}/>}
            {questions && questions.map((question) =>
                <QuestionItem key={question.uuid} questionType={question.questionType} title={question.title}
                              uuid={question.uuid}
                              question={question} onQuestionUpdate={onQuestionUpdate}/>)}
        </div>
    );
}

export default CreateForm;