import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./WeightGraph.css"

const WeightGraph = ({weightArr}) => {
  return (
    <div className='weightGraph-wrapper'>
        <h3>Weight Progress</h3>
        <div className='weightGraph-container'>
            <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={weightArr}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateData" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="weightValue" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
)
};

export default WeightGraph;
