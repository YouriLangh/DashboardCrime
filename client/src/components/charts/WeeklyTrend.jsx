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
  Cell,
} from "recharts";
import { Box } from "@mui/material";
import  CustomProgress  from '@/components/CustomProgress'

function WeeklyTrend({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(filters, "/api/data/bar-chart/week").then((res) => {
      setData(res.data);
    });
  }, [filters]);

  // Define the colors to alternate between
  const colors = ["#4A89E7", "#787A7D"];

  // Check if the data is empty or undefined
  const isDataEmpty = !data || data.length === 0;

  return (
    <div className="transform grid-cell" style={{ width: "100%", height: "100%" }}>
      {isDataEmpty ? (
        <CustomProgress />
      ) : (
        <Box className='title-container'>
        <Box className="title"><strong>Weekly Crime Trends</strong></Box>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 5" stroke="#979494" />
            <XAxis
              dataKey="name"
              tickFormatter={(day) => day.slice(0, 3)}
              stroke="#fff"
            />
            <YAxis stroke="#fff" />
            <Tooltip
              cursor={{ fill: "#42424F" }}
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "14px",
                fontWeight: "800",
                color: "black",
              }}
            />
            {/* Customize the color of each bar */}
            <Bar dataKey="crime">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 2]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </Box>
      )}
    </div>
  );
}

export default WeeklyTrend;
