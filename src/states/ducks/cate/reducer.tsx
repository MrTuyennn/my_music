import * as types from './type'
const initialState = {
    dataCate: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CATEGORY_MUSIC_SUCCESS:
            return {
                ...state,
                dataCate: action.payload
            }
        default:
            return state;
    }
}