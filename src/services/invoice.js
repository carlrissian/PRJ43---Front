import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const invoiceService = {
    async getPartners() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no encontrado');
        }

        try {
            const response = await axios.get(`${API_URL}/api/partners`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener los partners:', error);
            throw error;
        }
    },

    async getInvoices(partnerCode, dateStart, dateEnd) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no encontrado');
        }

        try {
            const url = `${API_URL}/api/invoices/partner/${partnerCode}/${dateStart}/${dateEnd}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener las facturas:', error);
            throw error;
        }
    },
};
