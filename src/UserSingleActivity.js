import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from './context';
import SingleActivityCard from './SingleActivityCard';

const UserSingleActivity = () => {
    const {id} = useParams()
    console.log(id)

    const {userState, isUserLoggedIn} = useGlobalContext()

    const [userSingleActivity, setUserSingleActivity] = useState()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    useEffect(()=>{
    fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/getUserSingleActivity/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> setUserSingleActivity(item))
  },[userState])

  console.log(userSingleActivity)

  return (
    <>
        {userSingleActivity && <SingleActivityCard {...userSingleActivity} />}
    </>
  )
};

export default UserSingleActivity;
