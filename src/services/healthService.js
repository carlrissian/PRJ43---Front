import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

console.log('API_URL configurada:', API_URL); // Log para verificar la URL base

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const healthService = {
    async checkHealth() {
        try {
            console.log('Intentando conectar a:', `${API_URL}/check_health`); // Log de la URL completa
            const response = await axiosInstance.get('/check_health');
            console.log('Respuesta recibida:', response.status); // Log de la respuesta
            return {
                status: response.status === 200,
                message: 'API está funcionando correctamente'
            };
        } catch (error) {
            console.error('Error completo:', {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method,
                error: error.message
            });
            return {
                status: false,
                message: 'Error al conectar con la API: ' + (error.response?.data?.message || error.message)
            };
        }
    }
};