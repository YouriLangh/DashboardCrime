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
    const colors = ['#4A89E7', '#787A7D'];

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
      <div className='chart-container' style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
                    <XAxis dataKey="name" stroke='#fff' />
                    <YAxis stroke='#fff'/>
                    <Tooltip
              cursor={{ fill: "#42424F" }}
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "14px",
                fontWeight: '800',
                color: "black",
              }} // Example of custom styles
            />
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
