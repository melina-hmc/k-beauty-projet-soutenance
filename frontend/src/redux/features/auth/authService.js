import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true, // include cookies
    })
    return response.data
};

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)
    return response.data
};

// Logout User
const logout = async () => {
    const response = await axios.get(API_URL + "logout")
    return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus")
    return response.data;
};

// Get User
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser")
    return response.data;
};

// Update User
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData)
    return response.data;
};

// Update photo
const updatePhoto = async (userData) => {
    const response = await axios.patch(API_URL + "updatePhoto", userData)
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatePhoto
};

export default authService;