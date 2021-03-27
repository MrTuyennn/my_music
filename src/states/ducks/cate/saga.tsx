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
        console.log('2')
        const { data } = yield call(api.getCateMusic)
        yield put({ type: types.GET_CATEGORY_MUSIC_SUCCESS, payload: data })
    } catch (error) {
        console.log('error có lỗi xãy ra', error)
    }
}