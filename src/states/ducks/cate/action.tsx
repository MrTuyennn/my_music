import * as types from './type'

export const getCataMusic = () => {
    console.log('1')
    return {
        type: types.GET_CATEGORY_MUSIC
    }
}

export const getCateMusic_reset = () => {
    return {
        type: types.GET_CATEGORY_MUSIC_RESET
    }
}