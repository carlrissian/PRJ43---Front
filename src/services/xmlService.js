import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const xmlService = {
    async getXML({ branch, month, year }) {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        try {
            const response = await axios.get(`${API_URL}/api/aena_xml`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { branch, month, year },
                responseType: 'blob', // Asegura que la respuesta sea un archivo
            });
            return response.data;
        } catch (error) {
            // Extraer detalle del error
            const errorMessage = error.response?.data?.description || 'Error desconocido al descargar el archivo.';
            console.error('Error al descargar el archivo XML:', errorMessage);
            alert(`Hubo un error al intentar descargar el archivo: ${errorMessage}`);
        }

    },
};
