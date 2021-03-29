import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import * as types from './type'
import * as api from './api'
export default function* watchSagas() {
    yield all([fork(watchRequestUser)]);
}

function* watchRequestUser() {
    yield all([
        takeLatest(types.GET_CATEGORY_MUSIC, getcateMusic),
    ])
}

function* getcateMusic() {
    try {
        const user = yield select((state) => state.user?.userInfo?.data?.accessToken);
        console.log(user)
        console.log('2')
        const { data } = yield call(api.getCateMusic,user)
        console.log('data cate', JSON.stringify(data?.data?.data, null, 2))
        yield put({ type: types.GET_CATEGORY_MUSIC_SUCCESS, payload: data?.data?.data })
    } catch (error) {
        console.log('error có lỗi xãy ra', error)
    }
}