import axios from 'axios'

const apiUrl = import.meta.env.VITE_SERVER_BASE_URL; 

export async function fetchData(filters, link) {
    try {
        let data;
        // Make an API call to the backend endpoint to fetch filter values
        await axios.post(apiUrl + link, filters).then((res) => {
            data = res
            
        })
        return data
    } catch (error) {
        console.error('Error fetching filter values:', error);
        // Handle the error, e.g., by returning an empty object or array
        return {};
    }
}
