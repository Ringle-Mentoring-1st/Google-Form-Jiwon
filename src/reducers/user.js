export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_PROFILE = "SET_USER_PROFILE";

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId,
});

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    payload: userProfile,
});

const initialState = {
    userId: null,
    userProfile: null,
    isLoading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
                isLoading: false
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            };
        default:
            return state;
    }
}