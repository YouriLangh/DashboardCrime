/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
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


  const CustomLabel = (props) => {
    const { x, y, width, height, value } = props;

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
            style={{ position: "absolute", left:"0" }}
        >
            {value}
        </text>
    );
};


  return (
    <div
      className="crime-distribution"
      style={{ width: "100%", height: "100%", overflowY: "scroll" }}
    >
      {isDataEmpty ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height="300%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-Axis starting point adjusted */}
            <XAxis
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ x: 0 }}
            />
            {/* Y-Axis */}
            <YAxis dataKey="name" type="category" width={0} />
            {/* Tooltip for additional information */}
            <Tooltip />
            {/* Bars */}
            <Bar
              dataKey="value"
              fill="#8884d8"
              label={{
                dataKey: 'name',
                content: CustomLabel,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CrimeDistribution;
