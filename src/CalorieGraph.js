import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./CalorieGraph.css"

const CalorieGraph = ({chartArr}) => {
    console.log(chartArr)
  return (
    <div className='calorie-wrapper'>
        <h3>Calorie Burned</h3>
        <div className='calorie-graph'>
            <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={chartArr}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="workoutDate" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalCalories" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
)
};

export default CalorieGraph;
