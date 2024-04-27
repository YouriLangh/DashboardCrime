/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, CircularProgress } from "@mui/material"; // Import CircularProgress

// Define the colors for each pie slice
const colors = ["#EBCB8B", "#D08770", "#B48EAD"];

function GenderDistribution({ filters }) {
    const [data, setData] = useState([]);
    const [alreadyRendered, setAlreadyRendered] = useState(false)
    useEffect(() => {
        fetchData(filters, "/api/data/pie-chart/gender").then((res) => {
            setData(res.data);
            setAlreadyRendered(true)
        });
    }, [filters]);

    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;

    // Custom label function to display percentages centered in the pie slice
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        // Calculate the position for the label
        const radius = (innerRadius + outerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        // Return the SVG text element with the calculated position and percentage value
        return (
            <text
                x={x}
                y={y}
                fill="#000" // Text color 
                textAnchor="middle" // Center the text horizontally
                dominantBaseline="central" // Center the text vertically
                fontWeight={800}
            >
                {`${(percent * 100).toFixed(2)}%`} 
            </text>
        );
    };

    return (
        <div className="grid-cell" style={{ width: "100%", height: "100%" }}>
            {isDataEmpty ? (
    !alreadyRendered ? (
        <CircularProgress />
    ) : (
        <p>No data matches this description</p>
    )
) : (
    <Box className='title-container'>
        <Box className="title"><strong>Victim Gender Distribution</strong></Box>
                <ResponsiveContainer className={"chart-container"} width="100%" height="100%">
                    <PieChart>
                        {/* Tooltip for displaying additional information */}
                        <Tooltip contentStyle={{ fontSize: "14px", fontWeight: '800' }} />

                        {/* Pie component */}
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            fill="#8884d8"
                            label={renderLabel} // Use the custom renderLabel function
                            labelLine={false} // Disable label lines
                        >
                            {/* Map each data entry to a Cell component with the corresponding color */}
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>

                        {/* Legend for the pie chart */}
                        <Legend layout="vertical" align="right" verticalAlign="middle" formatter={(value) => <strong>{value}</strong>} />
                    </PieChart>
                </ResponsiveContainer>
                </Box>
            )}
        </div>
    );
}

export default GenderDistribution;
