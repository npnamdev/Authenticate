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
    const response = await api.get(`api/v1/users`);
    return response.data;
}

export { loginUser, registerUser, verifyEmailToken, getUsers };