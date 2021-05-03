import { DATA_MUSIC } from './types'
const initialState = {
    dataMusic: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_MUSIC:
            console.log('lưu không')
            return {
                ...state,
                dataMusic: action.payload
            }
        default:
            return state;
    }
}