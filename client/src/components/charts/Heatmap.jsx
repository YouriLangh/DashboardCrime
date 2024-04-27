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

    // Calculate color scale ranges dynamically
    const calculateColorScaleRanges = () => {
        if (!heatmapData) return [];

        // Flatten the matrix to find the min and max values
        const values = heatmapData.matrix.flat();
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        // Calculate the range intervals
        const rangeSize = (maxValue - minValue) / 4;

        // Create color scale ranges
        return [
            { from: minValue, to: minValue + rangeSize, color: '#14151A' }, // Dark
            { from: minValue + rangeSize, to: minValue + 2 * rangeSize, color: '#555555' }, // Medium dark
            { from: minValue + 2 * rangeSize, to: minValue + 3 * rangeSize, color: '#CACACA' }, // Medium light
            { from: minValue + 3 * rangeSize, to: maxValue, color: '#FEFEFE' }, // Light
        ];
    };

    // Prepare data and options for the heatmap using ApexCharts
    const heatmapOptions = {
        theme: {
            mode: 'dark',
        },
        chart: {
            type: 'heatmap',
            height: '100%',
            width: '100%',
            background: 'rgba(0, 0, 0, 0)', // Set background to transparent
        },
        dataLabels: {
            enabled: false, // Disable data labels
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: calculateColorScaleRanges(),
                },
                rowHeight: 15, // Set row height to make rows thinner
            },
        },
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
        <div className='heatmap' style={{ width: '100%', height: '100%', overflowX: 'hidden', color: 'black'}}>
            {isDataEmpty ? (
                <CircularProgress />
            ) : (
                <ApexCharts
                    options={heatmapOptions}
                    series={heatmapSeries}
                    type="heatmap"
                    height={"130%"}
                />
            )}
        </div>
    );
}

export default Heatmap;
