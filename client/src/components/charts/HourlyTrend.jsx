/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function HourlyTrend({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/area-chart/hour').then((res) => {
            setData(res.data);
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className='custom-tooltip' style={{ backgroundColor: "#f5f5f5", borderRadius: "5px", padding: "5px", fontSize: "14px", fontWeight: '800', color: "black" }}>
                    <p>{`${label % 12 === 0 ? 12 : label % 12}${label < 12 ? 'am' : 'pm'}`}</p>
                    <p className='label'>crime: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

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
                        <Tooltip cursor={{ fill: "#42424F" }} content={<CustomTooltip />} />
                        <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
                        <Area type="monotone" dataKey="crimeCount" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default HourlyTrend;
