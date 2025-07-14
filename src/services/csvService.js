import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const csvService = {
    async getCSV({ month, year }) {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        try {
            const response = await axios.get(`${API_URL}/api/aena_csv`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { month, year },
                responseType: 'blob', // Para recibir archivo
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.description || 'Error desconocido al descargar el archivo.';
            console.error('Error al descargar el archivo CSV:', errorMessage);
            alert(`Hubo un error al intentar descargar el archivo: ${errorMessage}`);
            throw error;  // Muy importante relanzar para que el catch del componente funcione
        }
    },
};
