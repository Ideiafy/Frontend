import api from './../api'

export default async function index(token)
{
    try {
        const response = await api.get('/posts',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}