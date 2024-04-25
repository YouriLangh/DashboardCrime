/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function CrimeDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/bar-chart/crime').then((res) => {
            setData(res.data);
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ResponsiveContainer width="100%" height="250%">
                    <BarChart
                        data={data}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* X-Axis starting point adjusted */}
                        <XAxis type="number" domain={['dataMin', 'dataMax']} tick={{ x: 0 }} />
                        {/* Y-Axis */}
                        <YAxis dataKey="name" type="category" width={100} />
                        {/* Tooltip for additional information */}
                        <Tooltip />
                        {/* Bars */}
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default CrimeDistribution;
