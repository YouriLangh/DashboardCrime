/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function DescentDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(filters, '/api/data/polar-chart/descent').then((res) => 
            setData(res.data)
        );
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    return (
      <div style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                // Display a CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    data={data}
                >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, Math.max(...data.map(item => item.value))]} />
                    <Radar
                        name="Ethnicity"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default DescentDistribution;
