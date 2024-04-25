/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function MonthlyTrend({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/area-chart/month').then((res) => {
            setData(res);
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    // Conditionally render loading icon or area chart
    return (
        <div>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
                <AreaChart width={500} height={300} data={data}>
                    {/* X-Axis: Display month names */}
                    <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottomRight', offset: -10 }} />
                    
                    {/* Y-Axis: Display crime count */}
                    <YAxis label={{ value: 'Crime Count', angle: -90, position: 'insideLeft' }} />

                    {/* Tooltip: Shows information on hover */}
                    <Tooltip />

                    {/* CartesianGrid: Optional grid lines */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* Area: Represents the crime count per month */}
                    <Area type="monotone" dataKey="crime" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            )}
        </div>
    );
}

export default MonthlyTrend;
