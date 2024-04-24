import axios from 'axios'

const apiUrl = import.meta.env.VITE_SERVER_BASE_URL; 

export async function fetchGeneralStatData(filters) {
    try {
        // Make an API call to the backend endpoint to fetch filter values
        axios.post(apiUrl + '/api/data/general-stats', filters).then((res) => {
            return res
            
        })
        
    } catch (error) {
        console.error('Error fetching filter values:', error);
        // Handle the error, e.g., by returning an empty object or array
        return {};
    }
}
