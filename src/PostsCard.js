import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import "./PostsCard.css"

const PostsCard = ({_id, totalCalories, username, workoutDate, workoutSummary, workoutTitle}) => {
    const activityDate = new Date(workoutDate)
  return (
        <div className='postsCard-wrapper' onClick={()=>{console.log(_id)}}>
            <div className='postsCard-header'>
                <AccountCircleIcon />
                <h3>{username}</h3>
            </div>
            <div className='postsCard-title'>
                <h3>{workoutTitle}</h3>
                <h4>{activityDate.toLocaleDateString()} {activityDate.toLocaleTimeString()}</h4>
                <h4>Calories burned <LocalFireDepartmentIcon />{totalCalories} kcal</h4>
            </div>
            <div className='postsCard-content'>
                <h4>Workouts</h4>
                {workoutSummary.map((item)=>{
                    const {_id, sets, reps, activityName} = item
                    return(
                        <>
                            <p key={_id}><SportsSoccerOutlinedIcon />{sets} sets, {reps} reps, {activityName}</p>
                        </>
                    )
                })}
            </div>
        </div>
)
};

export default PostsCard;
