import api from './../api'

export default async function store(formData, token) {
 
  for (const pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}

  const response = await api.post('posts', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response;
}


    
  
