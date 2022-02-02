import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './context';
import './Sidebar.css'

const Sidebar = () => {

    const {userState, userSignout} = useGlobalContext()

  return <>
            <aside className="sidebar">
                <div className='sidebar-header'>
                    <h4>Fitness Logger</h4>
                </div>
                <div className="sidebar-content">
                    <Link to="/">Profile</Link>
                    <Link to="/workouts">Workout</Link>
                    <Link to="/measurements">Measurements</Link>
                    <Link to="/timer">Tabata Timer</Link>
                    {/* <Link to="/signup">SignUp</Link>
                    <Link to="/login">Login</Link> */}
                    {userState.isUserAuthenticated && <p onClick={userSignout}>Logout</p>}
                </div>
            </aside>
  </>;
};

export default Sidebar;
