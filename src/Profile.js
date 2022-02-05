import React,{useState, useEffect} from 'react';
import CalorieGraph from './CalorieGraph';
import { useGlobalContext } from './context';
import Posts from './Posts';
import UserLastActivity from './UserLastActivity';
import WeightGraph from './WeightGraph';
import "./Profile.css"

const Profile = () => {

  const {userState, isUserLoggedIn} = useGlobalContext()
  const [usersActivities, setUserActivities] = useState([])
  const [userMeasurementInfo, setUserMeasurementInfo] = useState()
  const [userCalories, setUserCalories] = useState([])
  const [userLatestActivity, setUserLatestActivity] = useState([])

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/workouts/getUserActivity', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserActivities(item))
  },[userState])


  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/measurements/getUsersMeasurementInfo', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserMeasurementInfo(item))
  },[userState])


  const weightArr = userMeasurementInfo && userMeasurementInfo.weightData.map((item)=>{
    const newWeightArr = {}
    newWeightArr.dateData = new Date(item.dateData).toLocaleDateString()
    newWeightArr.weightValue = item.weightInt
    return newWeightArr
})

  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/workouts/getCalories', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserCalories(item))
  },[userState])


  const chartArr = userCalories.length > 0 && userCalories.map((item)=>{
    const newArr = {}
    newArr.workoutDate = new Date(item.workoutDate).toLocaleDateString()
    newArr.totalCalories = item.totalCalories
    return newArr
})


  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/workouts/getUserLatestActivity', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserLatestActivity(item))
  },[userState])


  return <div className='profile-wrapper'>
      <div className='profile-header'>
        <h2>Profile</h2>
        <h3>Welcome {userState.user.username} 😊!!</h3>
      </div>

      <div className='userInfo-wrapper'>
        <div className='userInfo-left'>
          {chartArr.length > 0 ? <CalorieGraph chartArr={chartArr}  /> : <h3>You haven't have any Calorie graph</h3>}

          {usersActivities.length > 0 ? <Posts usersActivities = {usersActivities} /> : <h3>You haven't have any Posts</h3>}
        </div>
        <div className='userInfo-right'>
          {userLatestActivity.length > 0 ? <UserLastActivity userLatestActivity={userLatestActivity} /> : <h3>You haven't have any Latest activity graph</h3>}

          {weightArr ? <WeightGraph weightArr={weightArr} /> : <h3>You haven't have any Weight graph</h3>}
        </div>
      </div>
  </div>;
};

export default Profile;
