import React,{useEffect} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import "./SingleActivityCard.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const SingleActivityCard = ({workoutDate, username, workoutTitle, totalCalories, workoutSummary,_id}) => {

  const userActivityDate = new Date(workoutDate)

  const {userState, isUserLoggedIn} = useGlobalContext()
  const history = useHistory()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const handleActivityDelete = async(_id) => {
        if(userState.isUserAuthenticated){
            try{
                const resp = await fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/deleteUserSingleActivity/${_id}`, {
            method:'DELETE',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})

            const data = await resp.json()

            if(resp.ok){
                
                history.push("/")
            }
            }catch(error){
                console.warn(error.toString())
            }
            
        }
  }

  return (
    <div className='userSingleActivity-wrapper'>
        <div className='singleActivity-card'>
            <div className='userSingleActivity-header'>
                <div className='userInfo-div'>
                    <AccountCircleIcon />
                    <h3>{username}</h3>
                </div>
                <button onClick={()=>history.goBack()} className='backBtn'><ArrowBackOutlinedIcon /> Go Back</button>
            </div>
            <div className='userSingleActivity-title'>
                <h4>{workoutTitle}</h4>
                <h4>{userActivityDate.toLocaleDateString()} {userActivityDate.toLocaleTimeString()}</h4>
                <h4>Calories Burned <img src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/313/fire_1f525.png' alt='calorie-burned' className='calorie-img'></img> {totalCalories} kcal</h4>
            </div>
            <div className='userSingleActivity-content'>
                <h4>Workouts</h4>
                {workoutSummary.map((item)=>{
                    const {activityName, catName, sets, reps, levels, duration, _id} = item
                    return(
                        <div key={_id} className='single-workoutInfo'>
                            <h3>{activityName}({catName})</h3>
                            <p>Sets: {sets}</p>
                            <p>Reps: {reps}</p>
                            <p>Activity Level: {levels}</p>
                            <p>Duration: {duration}</p>
                        </div>
                    )
                })}
            </div>
            <div className='action-btns'>
                <button onClick={()=>{history.push(`/editWorkout/${_id}`)}} className='editBtn'>Edit</button>
                <button onClick={()=>handleActivityDelete(_id)} className='deleteBtn'>Delete</button>
            </div>
        </div>
    </div>
  )
};

export default SingleActivityCard;
