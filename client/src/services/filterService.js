import axios from 'axios'

const apiUrl = import.meta.env.VITE_SERVER_BASE_URL; 

// Service to fetch all the filters from the backend
export async function fetchFilterValues() {
    try {
        let filterValues;
        // Make an API call to the backend endpoint to fetch filter values
        await axios.get(apiUrl + '/api/filters').then((res) => {
            if (res.status === 200){
                filterValues = res.data;
            } else {
                console.log("Something went wrong when fetching the data")
            }
            
        })
        
        // Return the filter values
        return filterValues;
    } catch (error) {
        console.error('Error fetching filter values:', error);
        return {};
    }
}
