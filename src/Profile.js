import React,{useState, useEffect} from 'react';
import CalorieGraph from './CalorieGraph';
import { useGlobalContext } from './context';
import Posts from './Posts';
import UserLastActivity from './UserLastActivity';
import WeightGraph from './WeightGraph';

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

  console.log(usersActivities)

  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/measurements/getUsersMeasurementInfo', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserMeasurementInfo(item))
  },[userState])

  console.log(userMeasurementInfo)

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

  console.log(userCalories)

  const chartArr = userCalories.length > 0 && userCalories.map((item)=>{
    const newArr = {}
    newArr.workoutDate = new Date(item.workoutDate).toLocaleDateString()
    newArr.totalCalories = item.totalCalories
    return newArr
})

  console.log(chartArr)

  useEffect(()=>{
    fetch('https://fitness-logger-node-app.herokuapp.com/workouts/getUserLatestActivity', {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserLatestActivity(item))
  },[userState])

  console.log(userLatestActivity)

  return <div>
      <h2>Profile</h2>
      Welcome!! {userState.user.username}
      {usersActivities.length > 0 ? <Posts usersActivities = {usersActivities} /> : <h3>Posts loading...</h3>}
      {chartArr.length > 0 ? <CalorieGraph chartArr={chartArr}  /> : <h3>Calorie graph loading...</h3>}
      {userLatestActivity.length > 0 ? <UserLastActivity userLatestActivity={userLatestActivity} /> : <h3>Latest activity graph loading...</h3>}
      {weightArr ? <WeightGraph weightArr={weightArr} /> : <h3>Weight graph loading...</h3>}
      
  </div>;
};

export default Profile;
