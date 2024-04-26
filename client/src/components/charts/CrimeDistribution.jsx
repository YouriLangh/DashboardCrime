/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CircularProgress } from "@mui/material"; // Import CircularProgress

function CrimeDistribution({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(filters, "/api/data/bar-chart/crime").then((res) => {
      setData(res.data);
    });
  }, [filters]);

  // Check if the data is empty or undefined
  const isDataEmpty = !data || data.length === 0;
  const colors = [
    "#5E81B5",
    "#A3BE8C",
    "#EBCB8B",
    "#D08770",
    "#B48EAD",
    "#88C0D0",
    "#E5C07B",
    "#BF616A",
  ];

  const CustomLabel = (props) => {
    const { x, y, height, value } = props;
    // Calculate the absolute position for the label
    const labelX = x + 5; // Adjust the x-coordinate for positioning
    const labelY = y + height / 2; // Center the label vertically

    // Render the label absolutely positioned
    return (
      <text
        x={labelX}
        y={labelY}
        dy={3} // Adjust vertical offset for visual alignment
        fill="#fef"
        textAnchor="insideLeft"
        style={{ position: "absolute", left: "0" }}
      >
        {value}
      </text>
    );
  };

  return (
    <div
      className="crime-distribution"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {isDataEmpty ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height="300%" position="absolute">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
            {/* X-Axis starting point adjusted */}
            <XAxis type="number" tick={{ x: 0 }} orientation="top" style={{position: "sticky"}} stroke='#fff' />
            {/* Y-Axis */}
            <YAxis dataKey="name" type="category" width={0} stroke='#fff'/>
            {/* Tooltip for additional information */}
            <Tooltip
              cursor={{ fill: "#42424F" }}
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "14px",
                fontWeight: '800',
                color: "black",
              }} // Example of custom styles
            />
            {/* Bars */}
            <Bar
              dataKey="value"
              label={{
                dataKey: "name",
                content: CustomLabel,
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}{" "}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CrimeDistribution;
