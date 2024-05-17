/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchData } from '@/services/dataService';
import { Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box } from '@mui/material'; // Import CircularProgress
import  CustomProgress  from '@/components/CustomProgress'

// AgeDistribution component that displays a bar chart of the age distribution of the victims
function AgeDistribution({ filters, filterCallback }) {
    const [data, setData] = useState([]);
    const [clickedAge, setClickedAge] = useState(null)
    useEffect(() => {
        fetchData(filters, '/api/data/bar-chart/age').then((res) => 
            setData(res.data)
        );
    }, [filters]);

    // Define the colors to alternate between
    const colors = ['#4A89E7', '#787A7D'];

    // We use this function to process the clicked element into an object that can be used for filtering
    function processEntry(entry){
        const name = entry.name
        let bottomAge = 0;
        let topAge = Infinity
        if(name.includes('-')){
            bottomAge = parseInt(name.split('-')[0])
            topAge = parseInt(name.split('-')[1])
        } else{
            // In the case of "+90", the bottom age is just the name without the "+" sign
            bottomAge = parseInt(name.replace(/\+/g, ''));
        }
        return {'bottomAge': bottomAge, 'topAge': topAge}
    }
    // Function to handle the click event on the chart, use the data of the element to create a filter object.
    const handleChartClick = (entry, idx) => {
        let filter = { bottomAge: 0, topAge: Infinity }
        // Log the hour data key value when a user clicks on a specific part of the chart
        if (idx) {
            if(clickedAge === idx){
                setClickedAge()
            } else{
                setClickedAge(idx)
                filter = processEntry(entry)
            }
        }
        filterCallback("ageFilter", filter)
    };
    // Check if the data is empty or undefined
    const isDataEmpty = !data || data.length === 0;


    return (
      <div className='chart-container grid-cell' style={{ width: '100%', height: '100%' }}>
            {isDataEmpty ? (
                // Display a custom loading icon if there is no data
                <CustomProgress />
            ) : (
                <Box className='title-container'>
                <Box className="title"><strong>Victim Age Distribution</strong></Box>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="2 5" stroke="#42424F" />
                    <XAxis dataKey="name" stroke='#fff' />
                    <YAxis stroke='#fff'/>
                    <Tooltip
              cursor={{ fill: "#42424F" }}
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "14px",
                fontWeight: '800',
                color: "black",
              }} 
            />
                    {/* Use a function to alternate bar colors based on the index to help with differentiation */}
                    <Bar dataKey="value" onClick={(entry, index) => handleChartClick(entry, index)}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 2]} stroke={index === clickedAge ? "red" : ""} />
                            ))}
                        </Bar>
                </BarChart>
                </ResponsiveContainer>
                </Box>
            )}
        </div>
    );
}

export default AgeDistribution;
