import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./UserLastActivity.css"

const UserLastActivity = ({userLatestActivity}) => {
    const {workoutTitle ,workoutSummary, totalCalories} = userLatestActivity.length > 0 && userLatestActivity[0]
  return (
    <div className='userLastActivity-wrapper'>
        <h2>Today's Activity</h2>
        <div className='userLastActivity-header'>
            <h2>{userLatestActivity.length > 0 && workoutTitle}</h2>
            <h3>Calories Burned <LocalFireDepartmentIcon /> : {userLatestActivity.length > 0 && totalCalories} kcal</h3>
        </div>
        <div className='userLastActivity-graph'>
            {userLatestActivity.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={workoutSummary}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activityName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sets" fill="#8884d8" />
                    <Bar dataKey="reps" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    </div>
)
};

export default UserLastActivity;
