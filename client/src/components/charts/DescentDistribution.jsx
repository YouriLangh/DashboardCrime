/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { fetchData } from '@/services/dataService';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

function DescentDistribution({ filters }) {
    // Initialize state to hold data
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Ethnic Descent Distribution',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    // Add more colors as needed
                ],
                borderWidth: 1,
            },
        ],
    });

    // Options object for the PolarArea chart
    const options = {
        responsive: true,
    maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Remove the legend
            },
            datalabels: {
                // Customize the data labels
                formatter: function(value, context) {
                    // Calculate the total sum of values
                    const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                    // Calculate the percentage
                    const percentage = (value / total * 100).toFixed(2);
                    // Return the percentage with a "%" sign
                    return `${percentage}%`;
                },
                color: '#FFFFFF', // Set the color of the data labels
            },
        },
        // Customize the radial linear scale
        scales: {
            r: {
                grid: {
                    color: '#FFFFFF', // Set the color of the polar lines to white
                },
                ticks: {
                    display: false, // Hide radial ticks
                },
            },
        },
    };

    // Fetch data and create the chart
    useEffect(() => {
        fetchData(filters, '/api/data/polar-chart/descent')
            .then((res) => {
                const descentData = res.data;

                // Transform the data to fit the PolarArea component
                const labels = descentData.map(item => item.name);
                const values = descentData.map(item => item.value);

                // Update the data state
                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Ethnic Descent Distribution',
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                // Add more colors as needed
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            });
    }, [filters]);

    // Return the PolarArea component with the data and options
    return (
        <div style={{ width: '100%', height: '100%', padding: '5px' }}>
            <PolarArea  style={{ width: '100%', height: '100%'}} data={data} options={options} />
        </div>
    );
}

export default DescentDistribution;
