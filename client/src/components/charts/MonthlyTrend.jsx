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

    return (
        <div className="monthly-trend" style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        {/* X-Axis: Display month names */}
                        <XAxis dataKey="name" />
                        
                        {/* Y-Axis */}
                        <YAxis />
                        
                        {/* Tooltip */}
                        <Tooltip />
                        
                        {/* CartesianGrid */}
                        <CartesianGrid stroke="#bbb" strokeDasharray="5 5" />
                        
                        {/* Area with stroke and small dots at every tick */}
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#fff"  // Specify the stroke color
                            fill="#8884d8"  // Specify the fill color
                            dot={{ stroke: '#fff', fill: '#8884d8', strokeWidth: 2, r: 3 }} // Customize the dot style
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default MonthlyTrend;
