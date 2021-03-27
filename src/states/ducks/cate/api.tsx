import apiClient from '../../../ApiClient/Client'

export const getCateMusic = () => {
    let url = '/api/backend@@!xabcd/category-get'
    return apiClient.request(url, 'get')
}