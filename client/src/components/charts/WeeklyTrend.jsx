/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function WeeklyTrend({ filters }) {
    const [data, setData] = useState([]);

    // Define the colors to alternate between
    const colors = ['#5E81B5', '#7E8795'];

    useEffect(() => {
        fetchData(filters, '/api/data/bar-chart/weekly').then((res) => 
            setData(res)
        );
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    // Conditionally render loading icon or bar chart
    return (
        <div>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
                <BarChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* Use a function to alternate bar colors based on the index */}
                    <Bar dataKey="crime" fill={(data, index) => colors[index % colors.length]} />
                </BarChart>
            )}
        </div>
    );
}

export default WeeklyTrend;
