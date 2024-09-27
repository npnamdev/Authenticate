import api from '../utils/axiosConfig';

const loginUser = async (email: string, password: string): Promise<any> => {
    const response = await api.post('api/v1/auth/login', { email, password });
    return response.data;
}

const registerUser = async (username: string, email: string, password: string): Promise<any> => {
    const response = await api.post('api/v1/auth/register', { username, email, password });
    return response.data;
}

const verifyEmailToken = async (token: string): Promise<any> => {
    const response = await api.get(`api/v1/auth/verify-email?token=${token}`);
    return response.data;
}

const getUsers = async (): Promise<any> => {
    const response = await api.get(`api/v1/users?page=1&limit=20`);
    return response.data;
}

const getRoles = async (): Promise<any> => {
    const response = await api.get(`api/v1/roles`);
    return response.data;
}

const createUser = async (username: string, email: string, password: string): Promise<any> => {
    const response = await api.post('api/v1/users', { username, email, password });
    return response.data;
}

const deleteUser = async (userId: string): Promise<any> => {
    const response = await api.delete(`api/v1/users/${userId}`);
    return response && response.data ? response.data : response;
}

export { loginUser, registerUser, verifyEmailToken, getUsers, getRoles, createUser, deleteUser };