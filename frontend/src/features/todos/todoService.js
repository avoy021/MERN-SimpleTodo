import axios from "axios";

let API_URL = 'http://localhost:5000/api/todo'

export const getTodos = async(userData) => {
    try {
        const response = await axios.get(API_URL,{
            headers: {
                Authorization : `Bearer ${userData.token}`
            }
        })

        // console.log('Get all todos',response.data);
        return response.data;
    } catch (err) {
        return err.message; 
    }
}

export const addTodo = async(userData,content) => {
    try {
        const response = await axios.post(API_URL,{content},{
            headers: {
                Authorization : `Bearer ${userData.token}`
            }
        })
       
        // console.log('created todos',response.data);
        return response.data;
    } catch (err) {
        return err.message; 
    }
}

export const update = async(userData,todoId,content) => {
    try {
        const response = await axios.put(API_URL,{todoId,content },{
            headers: {
                Authorization : `Bearer ${userData.token}`
            } 
        }
        )
        console.log("updated todo",response.data)
        return response.data;
    } catch (err) {
        return err.message; 
    }
}
export const deleteTodo = async(userData,todoId) => {
    try {
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
    } catch (err) {
        return err.message; 
    }
}

