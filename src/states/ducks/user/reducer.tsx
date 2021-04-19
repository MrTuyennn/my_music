import * as types from './type'
const initialState = {
    isAuth: false,
    userInfo: null,
    err: null,
    succ: null,
    checkUserRegister : null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                checkUserRegister: action.payload
            }
        case types.REGISTER_USER_FAIL:
            return {
                ...state,
                err: action.payload
            }
        case types.LOG_OUT:
            return {
                ...state,
                userInfo: null
            }
        case types.REGISTER_USER_RESET:
            return {
                ...state,
                err: null,
                checkUserRegister : null
            }
        case types.LOGIN_USER_SUCESS:
            return {
                ...state,
                userInfo: action.payload
            }
        case types.LOGIN_USER_FAIL:
            return {
                ...state,
                err: action.payload,
                isAuth : false
            }
        case types.LOGIN_USER_RESET:
            return {
                ...state,
                arr: null
            }
        default:
            return state;
    }
}