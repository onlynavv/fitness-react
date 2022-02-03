import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './context';
import './Sidebar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const Sidebar = () => {

    const {userState, userSignout} = useGlobalContext()

  return <>
            <aside className="sidebar">
                <div className='sidebar-header'>
                    <h1>Fitness Logger</h1>
                </div>
                <div className="sidebar-content">
                    <Link to="/"><InsertChartOutlinedIcon /> Profile</Link>
                    <Link to="/workouts"><FitnessCenterIcon /> Workout</Link>
                    <Link to="/measurements"><StraightenIcon /> Measurements</Link>
                    <Link to="/timer"><AlarmOnIcon /> Tabata Timer</Link>
                    {/* <Link to="/signup">SignUp</Link>
                    <Link to="/login">Login</Link> */}
                    {userState.isUserAuthenticated && <p onClick={userSignout}><LogoutIcon /> Logout</p>}
                </div>
            </aside>
  </>;
};

export default Sidebar;
