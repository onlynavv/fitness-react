import React,{useEffect} from 'react';
import { useGlobalContext } from './context';

const Dashboard = () => {

  const {userState, isUserLoggedIn} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  return <div>
      Welcome!! {userState.user.username}
  </div>;
};

export default Dashboard;
