import axios from "axios";

let API_URL = 'http://localhost:5000/api/todo'

export const getTodos = async(userData) => {
    const response = await axios.get(API_URL,{
        headers: {
            Authorization : `Bearer ${userData.token}`
        }
    })
    if(response.data){

        return response.data;
    }
}

export const addTodo = async(userData,content) => {
    const response = await axios.post(API_URL,{content},{
        headers: {
            Authorization : `Bearer ${userData.token}`
        }
    })
    return response.data;
}

export const update = async(userData,todoId,content) => {
    const response = await axios.put(API_URL,{todoId,content },{
        headers: {
            Authorization : `Bearer ${userData.token}`
        } 
    }
    )
    return response.data;
}
export const deleteTodo = async(userData,todoId) => {
    const response = await axios.delete(API_URL,{
        headers: {
            Authorization : `Bearer ${userData.token}`
        },
        data : {
          todoId 
        }
    }
    )
    return response.data;
}

