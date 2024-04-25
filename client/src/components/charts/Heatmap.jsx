/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { fetchData } from '@/services/dataService';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

function Heatmap({ filters }) {
    const [heatmapData, setHeatmapData] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetchData(filters, '/api/data/heatmap').then((res) => {
            setHeatmapData(res);
        });
    }, [filters]);

    // Once data is available, render the heatmap using Plotly
    useEffect(() => {
        if (heatmapData) {
            // Destructure the heatmap data
            const { crimes, ethnicities, matrix } = heatmapData;

            // Render the heatmap using Plotly
            Plotly.newPlot('heatmap', [{
                z: matrix,
                x: crimes,
                y: ethnicities,
                type: 'heatmap',
                colorscale: 'Viridis' // Choose your preferred color scale
            }], {
                title: 'Ethnicity-Crime Correlation Heatmap',
                xaxis: {
                    title: 'Crimes',
                    tickangle: -45 // Angle the x-axis labels by -45 degrees
                },
                yaxis: {
                    title: 'Ethnicities'
                }
            });
        }
    }, [heatmapData]);

    // Check if data is empty or undefined
    const isDataEmpty = !heatmapData || !heatmapData.matrix || heatmapData.matrix.length === 0;

    // Conditionally render loading icon or heatmap
    return (
        <div>
            {isDataEmpty ? (
                // Display CircularProgress loading icon if there is no data
                <CircularProgress />
            ) : (
                <div id="heatmap"></div>
            )}
        </div>
    );
}

export default Heatmap;
