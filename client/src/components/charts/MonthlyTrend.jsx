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

    const colors = ["#3573D0", "#FF9F40" ]
    const darkerColors = ["#083D8C", "#FF942B"]
    return (
        <div className="chart-container" style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        {/* X-Axis: Display month names */}
                        <XAxis dataKey="name" stroke='#fff'/>
                        
                        {/* Y-Axis */}
                        <YAxis stroke='#fff'/>
                        
                        {/* Tooltip */}
                        <Tooltip />
                        
                        {/* CartesianGrid */}
                        <CartesianGrid strokeDasharray="2 5" stroke="#979494" />
                        
                        {/* Area with stroke and small dots at every tick */}
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={darkerColors[0]}  // Specify the stroke color
                            strokeWidth={2}
                            fill={colors[0]}  // Specify the fill color
                            dot={{ stroke: colors[0], fill: colors[0] , strokeWidth: 2, r: 3 }} // Customize the dot style
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default MonthlyTrend;
