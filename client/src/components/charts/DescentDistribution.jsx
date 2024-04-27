/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import { preprocessEthnicityData } from "@/helpers/helpers";
import { renderEthnicityTooltip }  from "@/components/CustomTooltips";



// Define the colors for each pie slice
const colors = ["#5E81B5", "#8CB16C", "#D8795C", "#B681AC", "#6FB6CA", "#BF616A"];

function DescentDistribution({ filters }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint that provides ethnicity data
        fetchData(filters, "/api/data/polar-chart/descent").then((res) => {
            setData(preprocessEthnicityData(res.data));
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
    <div style={{ width: "100%", height: "100%" }}>
        {isDataEmpty ? (
            // Display a CircularProgress loading icon if there is no data
            <CircularProgress />
        ) : (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    {/* Tooltip with custom content function */}
                    <Tooltip content={(props) => renderEthnicityTooltip(props, data, colors)} />

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
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        )}
    </div>
);

}

export default DescentDistribution;
