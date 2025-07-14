import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export const authService = {
    async login(user, password, country_id) {
        try {
            const response = await axiosInstance.post('/login', {
                user,
                password,
                country_id
            });
            const token = response.data.token;
            if (!token) {
                return { success: false, message: 'No se recibió token del servidor' };
            }
            // Guardar token en localStorage
            localStorage.setItem('token', token);
            return { success: true, token };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    'Error desconocido al hacer login'
            };
        }
    },

    logout() {
        localStorage.removeItem('token');
    }
};
