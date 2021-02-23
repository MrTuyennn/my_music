import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer, rootSaga } from './ducks';
import sagaMiddleware from './middlewares/saga';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
};

const logger = (store) => (next) => (action) => {
    let result = next(action);
    return result;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(logger, sagaMiddleware),
            // other store enhancers if any
        ),
    );
    let persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
}