/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function MonthlyTrend({ filters }) {
    const [data, setData] = useState([]);
    const [isDataEmpty, setIsDataEmpty] = useState(true);

    useEffect(() => {
        fetchData(filters, '/api/data/area-chart/month').then((res) => {
            setData(res.data);
            setIsDataEmpty(!res || res.length === 0);
        });
    }, [filters]);

    // Conditionally render loading icon or area chart based on whether the data is empty
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        {/* X-Axis: Display month names */}
                        <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottomRight', offset: -10 }} />
                        
                        {/* Y-Axis: Display crime count */}
                        <YAxis label={{ value: 'Crime Count', angle: -90, position: 'insideLeft' }} />

                        {/* Tooltip: Shows information on hover */}
                        <Tooltip />

                        {/* CartesianGrid: Optional grid lines */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}

                        {/* Area: Represents the crime count per month */}
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default MonthlyTrend;
