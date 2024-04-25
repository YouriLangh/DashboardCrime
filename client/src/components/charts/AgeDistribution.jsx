/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function AgeDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/bar-chart/age').then((res) => 
            setData(res.data)
        );
    }, [filters]);

    // Define the colors to alternate between
    const colors = ['#5E81B5', '#7E8795'];

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
      <div style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* Use a function to alternate bar colors based on the index */}
                    <Bar dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 2]} />
                            ))}
                        </Bar>
                </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default AgeDistribution;
