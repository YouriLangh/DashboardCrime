/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import {
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import { Box } from "@mui/material";
import { renderHourlyTooltip } from "../CustomTooltips";
import CustomProgress from "@/components/CustomProgress";

// Component that displays an area chart of the crime trends by hour of the day
function HourlyTrend({ filters, filterCallback }) {
  const [data, setData] = useState([]);
  const [clickedHour, setClickedHour] = useState();

  useEffect(() => {
    fetchData(filters, "/api/data/area-chart/hour").then((res) => {
      setData(res.data);
    });
  }, [filters]);

  // Check if the data is empty or undefined
  const isDataEmpty = !data || data.length === 0;

  // Function to handle the click event on the chart, use the data of the element to create a filter object.
  const handleChartClick = (props) => {
    let filter = [{value : 'All'}]
    if(clickedHour === props.activeLabel){
        setClickedHour()
    } else {
        setClickedHour(props.activeLabel)
        filter = [{value: props.activeLabel}]
  }
  filterCallback("hourOfDayFilter", filter)
}
;

  // Conditionally render loading icon or area chart
  return (
    <div
      className="transform grid-cell"
      style={{ width: "100%", height: "100%" }}
    >
      {isDataEmpty ? (
        <CustomProgress />
      ) : (
        <Box className="title-container">
          <Box className="title">
            <strong>Hourly Crime Trends</strong>
          </Box>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} onClick={handleChartClick}>
              <XAxis
                stroke="#fff"
                dataKey="hour"
                ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                tickFormatter={(hour) =>
                  `${hour % 12 === 0 ? 12 : hour % 12}${
                    hour < 12 ? "am" : "pm"
                  }`
                }
              />
              <YAxis stroke="#fff" />
              <Tooltip
                cursor={{ fill: "#42424F" }}
                content={renderHourlyTooltip}
              />

              <CartesianGrid strokeDasharray="2 5" stroke="#979494" />
              <Area
                type="monotone"
                stroke="#8884d8" // Specify the stroke color
                strokeWidth={2}
                dot={{
                  stroke: "#8884d8",
                  fill: "#8884d8",
                  strokeWidth: 2,
                  r: 3,
                }} // Customize the dot style
                dataKey="crimeCount"
                fill="#8884d8"
              />
              <ReferenceLine x={clickedHour} stroke="red" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </div>
  );
}

export default HourlyTrend;
