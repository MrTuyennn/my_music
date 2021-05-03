import { DATA_MUSIC } from './types'

export const setDataMusic = (payload) => {
    console.log('payload', JSON.stringify(payload, null, 2))
    return {
        type: DATA_MUSIC,
        payload: payload
    }
}