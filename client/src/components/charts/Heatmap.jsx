/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { fetchData } from '@/services/dataService';
import  CustomProgress  from '@/components/CustomProgress'
import { Box } from '@mui/material';

// Heatmap component that displays a heatmap of the victim's ethnicity and the crime
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
    
        // Create color scale ranges with the new color scheme
        return [
            { from: minValue, to: minValue + rangeSize, color: '#0D0887' }, // Dark blue
            { from: minValue + rangeSize, to: minValue + 2 * rangeSize, color: '#225EA8' }, // Medium blue
            { from: minValue + 2 * rangeSize, to: minValue + 3 * rangeSize, color: '#41B6C4' }, // Light blue
            { from: minValue + 3 * rangeSize, to: maxValue, color: '#FDE725' }, // Light yellow
        ];
    };
    
    

    // Prepare data and options for the heatmap using ApexCharts
    const heatmapOptions = {
        grid:{
            show:false
        },
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
        legend: {
            fontSize: '13px',
            fontWeight: 400,
        },
        
        plotOptions: {
            heatmap: {
                enableShades: true,
                shadeIntensity: 0.9,
                colorScale: {
                    ranges: calculateColorScaleRanges(),
                },
                useFillColorAsStroke:true,
            },
        },
        xaxis: {
            categories: heatmapData ? heatmapData.crimes : [],
            labels: {
                rotate: -45,
                style: {
                    colors: '#FFFFFF', // Set label color to white
                    fontSize: '14px',
            fontWeight: 400,
                },
            },
        },
        yaxis: {
            categories: heatmapData ? heatmapData.ethnicities : [],
            labels: {
                style: {
                    colors: '#FFFFFF', // Set label color to white
                    fontSize: '14px',
            fontWeight: 400,
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
                <CustomProgress />
            ) : (
                <>
                <Box className="title crime-dist" style={{color:'white'}}><strong>Victim Ethnicity & Crime Heatmap</strong></Box>
                <ApexCharts
                style={{marginTop:"10px"}}
                    options={heatmapOptions}
                    series={heatmapSeries}
                    type="heatmap"
                    height={"130%"}
                />
                </>
            )}
        </div>
    );
}

export default Heatmap;
