import apiClient from '../../../ApiClient/Client'

export const getCateMusic = (payload) => {
    console.log('sds',payload)
    const accessToken = {
        accessToken : payload
    }
    let url = '/api/users/category/all'
    return apiClient.request(url, 'post',accessToken)
}