/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import { renderHourlyTooltip } from '../CustomTooltips';
function HourlyTrend({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/area-chart/hour').then((res) => {
            setData(res.data);
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    const handleChartClick = (event) => {
        // Log the hour data key value when a user clicks on a specific part of the chart
        if (event && event.activeLabel !== undefined) {
            console.log(`Clicked on hour: ${event.activeLabel}`);
        }
    };

    // Conditionally render loading icon or area chart
    return (
        <div className="transform" style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} onClick={handleChartClick}>
                        <XAxis
                            stroke='#fff'
                            dataKey="hour"
                            ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                            tickFormatter={(hour) => `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`}
                        />
                        <YAxis stroke='#fff' />
                        <Tooltip cursor={{ fill: "#42424F" }} content={renderHourlyTooltip} />
                        <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
                        <Area type="monotone" dataKey="crimeCount" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default HourlyTrend;
