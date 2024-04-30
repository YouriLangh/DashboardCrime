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
import { Box } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import  CustomProgress  from '@/components/CustomProgress'


function CrimeDistribution({ filters, filterCallback }) {
  const [data, setData] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [size, setSize] = useState(1);
  const [alreadyRendered, setAlreadyRendered] = useState(false);
  useEffect(() => {
    fetchData(filters, "/api/data/bar-chart/crime").then((res) => {
      setData(res.data);
      setAlreadyRendered(true);
      if (res.data && res.data.length > 10) {
        setSize(res.data.length / 10);
      } else {
        setSize(1);
      }
    });
  }, [filters]);

  // Check if the data is empty or undefined
  const isDataEmpty = !data || data.length === 0;

  // Colors for the bars
  const colors = [
    "#5E81B5",
    "#8CB16C",
    "#D8795C",
    "#B681AC",
    "#6FB6CA",
    "#BF616A",
  ];

  // Custom label for bars
  const CustomLabel = (props) => {
    const { x, y, height, value } = props;
    // Calculate the absolute position for the label
    const labelX = x + 5;
    const labelY = y + height / 2;

    return (
      <text
        x={labelX}
        y={labelY}
        dy={3}
        fill="#fff"
        textAnchor="insideLeft"
        style={{ position: "absolute", left: "0", stroke: "white" }}
      >
        {value}
      </text>
    );
  };

  // Handle scroll event in the container
  const handleScroll = (e) => {
    const container = e.target;
    // Allow a small threshold to account for discrepancies when checking if the user is at the bottom
    const threshold = 80;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;
    setIsAtBottom(isAtBottom);
  };

  return (
    <div
      className="crime-distribution"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      {isDataEmpty ? (
        !alreadyRendered ? (
          <CustomProgress />
        ) : (
          <p>No data matches this description</p>
        )
      ) : (
        <>
        <Box className="title crime-dist"><strong>Crime Distribution Overview</strong></Box>
        <ResponsiveContainer width="100%" height={`${100 * size}%`}>
          <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="2 5" stroke="#979494" />
            <XAxis type="number" orientation="top" stroke="#fff" />
            <YAxis dataKey="name" type="category" width={0} stroke="#fff" />
            <Tooltip
              // Conditionally style the tooltip wrapper based on whether the active bar index matches the selected index
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "14px",
                fontWeight: "800",
                color: "black",
              }}
              cursor={{ fill: "#42424F" }}
            />
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
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </>
      )}

      {/* Sticky arrow div */}
      <div
        className={`arrow-container ${isAtBottom ? "bottom" : "sticky-bottom"}`}
        style={{
          position: isAtBottom ? "absolute" : "sticky",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          backgroundColor: "transparent",
          opacity: isAtBottom || size === 1 ? 0 : 1,
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "24px" }}>
          <KeyboardDoubleArrowDownIcon />
        </span>
      </div>
    </div>
  );
}

export default CrimeDistribution;
