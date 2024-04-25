/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function HourlyTrend({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/area-chart/hour').then((res) => {
          console.log(res)
          setData(res.data)
        }


        );
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    // Conditionally render loading icon or area chart
    return (
      <div style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
              <ResponsiveContainer  width="100%" height="100%">
                <AreaChart data={data}>
                    <XAxis
                        dataKey="hour"
                        ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                        tickFormatter={(hour) => `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`}
                        label="Hour of Day"
                    />
                    <YAxis label={{ value: 'Crime Count', angle: -90 }} />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="crimeCount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default HourlyTrend;
