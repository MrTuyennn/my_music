import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';


// User
import userReducer from './user/reducer'
import userSaga from './user/saga'


// CateMusic
import cateReducer from './cate/reducer'
import cateSaga from './cate/saga'

// DataMusic
import musicReducer from './musics/reducers'


export function* rootSaga() {
    yield all([
      fork(userSaga),
      fork(cateSaga)
    ]);
  }
  
  export const rootReducer = combineReducers({
    user: userReducer,
    cate : cateReducer,
    musics: musicReducer
  });