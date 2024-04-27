/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { fetchData } from '@/services/dataService';
import { CircularProgress } from '@mui/material';

function Heatmap({ filters }) {
    const [heatmapData, setHeatmapData] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetchData(filters, '/api/data/heatmap').then((res) => {
            setHeatmapData(res.data);
        });
    }, [filters]);

    // Check if data is empty or undefined
    const isDataEmpty = !heatmapData || !heatmapData.matrix || heatmapData.matrix.length === 0;

    // Prepare data and options for the heatmap using ApexCharts
    const heatmapOptions = {
        chart: {
            type: 'heatmap',
            height: '400px',
            width: '100%',
            background: 'rgba(0, 0, 0, 0)', // Set background to transparent
        },
        dataLabels: {
            enabled: false, // Disable data labels
        },
        colors: ["#000"], // Use a single color
        xaxis: {
            categories: heatmapData ? heatmapData.crimes : [],
            labels: {
                rotate: -45,
                style: {
                    colors: '#FFFFFF', // Set label color to white
                    fontWeight: 'bold', // Make labels bold
                },
            },
        },
        yaxis: {
            categories: heatmapData ? heatmapData.ethnicities : [],
            labels: {
                style: {
                    colors: '#FFFFFF', // Set label color to white
                    fontWeight: 'bold', // Make labels bold
                },
            },
        },
    };

    // Prepare the data for the heatmap
    const heatmapSeries = heatmapData
        ? heatmapData.matrix.map((row, index) => ({
            name: heatmapData.ethnicities[index],
            data: row,
        }))
        : [];

    // Conditionally render loading icon or heatmap
    return (
        <div className='heatmap' style={{ width: '100%', height: '100%', overflowX: 'scroll', color: 'black' }}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ApexCharts
                    options={heatmapOptions}
                    series={heatmapSeries}
                    type="heatmap"
                />
            )}
        </div>
    );
}

export default Heatmap;
