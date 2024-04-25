/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function GenderDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/pie-chart/gender').then((res) => {
            setData(res);
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
        <PieChart width={400} height={400}>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            )}
            <Tooltip />
        </PieChart>
    );
}

export default GenderDistribution;
