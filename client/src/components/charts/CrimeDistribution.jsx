/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function CrimeDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/bar-chart/crime').then((res) => 
            setData(res)
        );
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
        <div>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
                <BarChart
                    width={600}
                    height={400}
                    data={data}
                    layout="vertical" // Set the chart layout to vertical for horizontal bars
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X-Axis for the crime counts */}
                    <XAxis type="number" />
                    {/* Y-Axis for the crime names */}
                    <YAxis dataKey="name" type="category" />
                    {/* Tooltip for additional information on hover */}
                    <Tooltip />
                    {/* Bar representing the counts of crimes */}
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
}

export default CrimeDistribution;
