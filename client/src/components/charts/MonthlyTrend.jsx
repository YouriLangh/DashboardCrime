/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import { Box } from "@mui/material";
import { renderMonthlyTooltip } from "../CustomTooltips";
import YearDropdownMonth from "../YearDropdownMonth";
import CustomProgress from "@/components/CustomProgress";

function MonthlyTrend({ allFilters, filters }) {
  const [data, setData] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [localFilterSets, setLocalFilterSets] = useState({});
  const [comparisonYear, setComparisonYear] = useState(2022);
  const [comparisonData, setComparisonData] = useState([]);
  const [currentYear, setCurrentYear] = useState(2023)

  useEffect(() => {
    fetchData(filters, "/api/data/area-chart/month").then((res) => {
      setData(res.data);
      setIsDataEmpty(!res || res.length === 0);
      
    })
  }, [filters]);

  useEffect(() => {
    setLocalFilterSets(allFilters);
  }, [allFilters]);

  useEffect(() => {
    const comparisonFilter = { ...filters, yearFilter: comparisonYear };
    fetchData(comparisonFilter, "/api/data/area-chart/month").then((res) => {
      setComparisonData(res.data);
    });
    setCurrentYear(filters.yearFilter)
  }, [filters, comparisonYear]);

  function handleYearSelection(value) {
    setComparisonYear(value);
  }

  // Calculate the maximum value from data and comparisonData
  const maxDataValue = Math.max(...data.map((d) => d.value));
  const maxComparisonDataValue = Math.max(
    ...comparisonData.map((d) => d.value)
  );
  const maxYValue = Math.max(maxDataValue, maxComparisonDataValue);

  const colors = ["#80AAE9", "#FF9F40"];
  const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

  return (
    <div
      className="chart-container grid-cell"
      style={{ width: "100%", height: "100%" }}
    >
      {isDataEmpty ? (
        <CustomProgress />
      ) : (
        <Box className="title-container">
          <Box className="title monthly-trend-title">
            <strong>Monthly Crime Trends: </strong>
            <strong style={{color:colors[0]}}>{currentYear}</strong>
            <strong>vs.</strong>
            <Box className="year-dropdown-container monthly">
              <YearDropdownMonth
              color={colors[1]}
                smallestYear={
                  hasLocalFilterSets
                    ? localFilterSets.yearSet.smallestYear
                    : null
                }
                largestYear={
                  hasLocalFilterSets
                    ? localFilterSets.yearSet.largestYear
                    : null
                }
                onFilterChange={handleYearSelection}
              />
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              {/* X-Axis: Display month names */}
              <XAxis
                dataKey="name"
                stroke="#fff"
                tickFormatter={(day) => day.slice(0, 3)}
              />

              {/* Y-Axis: Set the domain using maxYValue */}
              <YAxis
                stroke="#fff"
                domain={[0, maxYValue]}
              />

              {/* Tooltip */}
              <Tooltip
                content={(props) =>
                  renderMonthlyTooltip({
                    ...props,
                    currentYear: filters.yearFilter,
                    comparisonYear: comparisonYear,
                  })
                }
              />
              {/* CartesianGrid */}
              <CartesianGrid strokeDasharray="2 5" stroke="#979494" />
              <Area
                type="monotone"
                dataKey="value"
                data={comparisonData}
                stroke={colors[1]}
                strokeWidth={2}
                fill={colors[1]}
                fillOpacity={0.5} // Adjust the opacity for see-through colors
                dot={{
                  stroke: colors[1],
                  fill: colors[1],
                  strokeWidth: 2,
                  r: 3,
                }}
              />
              {/* Area with stroke and small dots at every tick */}
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={2}
                fill={colors[0]}
                fillOpacity={0.5} // Adjust the opacity for see-through colors
                dot={{
                  stroke: colors[0],
                  fill: colors[0],
                  strokeWidth: 2,
                  r: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </div>
  );
}

export default MonthlyTrend;
