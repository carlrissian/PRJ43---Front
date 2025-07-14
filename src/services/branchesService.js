import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const branchesService = {
    async getBranches() {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await axios.get(`${API_URL}/api/branches`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data.map(branch => ({
                key: branch.id,
                name: branch.name,
                iata: branch.iata
            }));
        } catch (error) {
            console.error('Error fetching branches:', error);
            throw new Error('Error fetching branches');
        }
    }
};
