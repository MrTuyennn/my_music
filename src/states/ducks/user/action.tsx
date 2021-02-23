import * as types from './type'


export const registerUser = (payload) => {
    return {
        type: types.REGISTER_USER,
        payload
    }
}

export const LoginUser = (payload) => {
    return {
        type: types.LOGIN_USER,
        payload
    }
}

export const resetLoginUser = () => {
    return {
        type: types.LOGIN_USER_RESET
    }
}

export const resetregisterUser = () => {
    return {
        type: types.REGISTER_USER_RESET
    }
}

export const logOut = () => {
    return {
        type: types.LOG_OUT,
    }
}