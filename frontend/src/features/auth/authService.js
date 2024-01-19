import axios from "axios";

let API_URL = 'http://localhost:5000/api/user/'

export const userLogin = async(userData) => {
    try {
        const response = await axios.post(API_URL + 'login', userData);
        if(response.data) {
            localStorage.setItem('user',JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const userLogout = async () => {
    localStorage.removeItem('user');
} 

