import v4 from "uuid/dist/esm-browser/v4";

export const SET_FORM = "SET_USER_ID";
export const ONCHANGE_FORM_INFO = "ONCHANGE_FORM_INFO";
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";

export const setForm = (form) => ({
    type: SET_FORM,
    payload: form,
});
export const onChangeFormInfo = (key,input) => ({
    type: ONCHANGE_FORM_INFO,
    payload: {key, input}
});
export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    payload: question
})
export const deleteQuestion = (uuid) =>({
    type: DELETE_QUESTION,
    payload: uuid
})
export const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    payload: question
})

const initialState = {
    formInfo: {
        title: "",
        subTitle: ""
    },
    questions: [{
        uuid: v4(),
        title: "",
        questionType: "text"
    }]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FORM:
            return {
                ...state,
                form: action.payload,
            };

        case ONCHANGE_FORM_INFO:
            return {
                ...state,
                formInfo:{
                    ...state.formInfo,
                    [action.payload.key] : action.payload.input
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                questions: state.questions.concat(action.payload)
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(({uuid})=> uuid !== action.payload)
            }
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: action.payload
            }
        default:
            return state;
    }
}