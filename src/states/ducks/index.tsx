import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';


// User
import userReducer from './user/reducer'
import userSaga from './user/saga'

export function* rootSaga() {
    yield all([
      fork(userSaga),
    ]);
  }
  
  export const rootReducer = combineReducers({
    user: userReducer,
  });