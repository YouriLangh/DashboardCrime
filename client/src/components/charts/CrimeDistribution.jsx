/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CircularProgress } from "@mui/material";

function CrimeDistribution({ filters }) {
  const [data, setData] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    fetchData(filters, "/api/data/bar-chart/crime").then((res) => {
      setData(res.data);
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
      <text x={labelX} y={labelY} dy={3} fill="#fef" textAnchor="insideLeft" style={{ position: "absolute", left: "0", stroke:"white"}}>
        {value}
      </text>
    );
  };

  // Handle scroll event in the container
  const handleScroll = (e) => {
    const container = e.target;
    const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
    setIsAtBottom(isAtBottom);
  };

  return (
    <div
      className="crime-distribution"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        position: "relative",
      }}
      onScroll={handleScroll} // Add scroll event listener
    >
      {isDataEmpty ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height="300%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
            <XAxis type="number" orientation="top" stroke="#fff" />
            <YAxis dataKey="name" type="category" width={0} stroke='#fff'/>
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
            <Bar dataKey="value" label={{
                dataKey: "name",
                content: CustomLabel,
              }}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Sticky arrow div */}
      <div
        className={`arrow-container ${isAtBottom ? "bottom" : "sticky-bottom"}`}
        style={{
          position: isAtBottom ? "static" : "sticky",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          backgroundColor: "transparent",
          visibility: isAtBottom ? "hidden" : "visible",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "24px" }}>⬇️</span>
      </div>
    </div>
  );
}

export default CrimeDistribution;
