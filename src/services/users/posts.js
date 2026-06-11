import api from './../api'

export default async function indexPosts(token)
{
    try {
        const response = await api.get('/user/posts',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}