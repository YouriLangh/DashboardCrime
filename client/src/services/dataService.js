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

export async function fetchGeoJson(){
    try{
        let data;
        await axios.get(apiUrl + '/api/data/geojson').then((res) =>{
            data = res.data
        })
        return data
    } catch (error) {
        console.error('Error fetching geojson:', error);
        // Handle the error, e.g., by returning an empty object or array
        return {};
}
}

export async function fetchUpdatedGeoJson(filters){
    try{
        let data;
        await axios.post(apiUrl + '/api/data/geojson/update', filters).then((res)=>{
            data = res.data
        })
        return data
    }catch (error) {
        console.error('Error updating geojson:', error);
        // Handle the error, e.g., by returning an empty object or array
        return {};
}
}

export async function fetchInstances(filters, mapbounds){
    try{
        let data;
        await axios.post(apiUrl + '/api/data/geojson/instances', {filters: filters, mapbounds: mapbounds}).then((res)=>{
            data = res.data
        })
        return data
    }catch (error) {
        console.error('Error fetching map instances:', error);
        // Handle the error, e.g., by returning an empty object or array
        return {};
}
}