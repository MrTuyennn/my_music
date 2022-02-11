import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import * as types from './type'
import * as api from './api'
export default function* watchSagas() {
    yield all([fork(watchRequestUser)]);
}

function* watchRequestUser() {
    yield all([
        takeLatest(types.LOGIN_USER, loginUser),
        takeLatest(types.REGISTER_USER, registerUser),
        takeLatest(types.CHANGE_PASSWORD, changePassword)
    ])
}

function* loginUser({ payload }) {
    console.log(payload)
    try {
        // const { data } = yield call(api.loginUser, {
        //     password: payload.passWord,
        //     numberPhone: payload.numberPhone
        // })
        // console.log('data login', data)
        yield put({ type: types.LOGIN_USER_SUCESS, payload: payload })
    } catch (error) {
        console.log('err login', error)
    }
}

function* registerUser({ payload }) {
    console.log('payload', payload)
    try {
        const { data } = yield call(api.registeruser, {
            username: payload.userName,
            password: payload.passWord,
            numberPhone: payload.numberPhone
        })
        console.log('đăng kí thành công', data)
        yield put({ type: types.REGISTER_USER_SUCCESS, payload: data })
    } catch (error) {
        console.log('đăng kí thất bại', error)
        yield put({ type: types.REGISTER_USER_FAIL, payload: error })
    }
}

function* changePassword({ payload }) {
    console.log('payload', payload)
    const user = yield select((state) => state.user?.userInfo?.data?.accessToken);

    try {
        const { data } = yield call(api.changePassword, {
            accessToken: user,
            oldPassword: payload?.oldPassword,
            newPassword: payload?.newPassword,
            confirmPassword: payload?.confirmPassword
        })
        console.log('dataaa password',JSON.stringify(data, null, 2))
      yield  put({ type: types.CHANGE_PASSWORD_SUCCESS, payload: data })
    } catch (error) {
        console.log('error', error)
    }
}