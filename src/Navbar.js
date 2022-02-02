import React from 'react'
import './Navbar.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Divider from '@mui/material/Divider';
import { useGlobalContext } from './context';

const Navbar = () => {
    const {userState} = useGlobalContext()
    return (
        <>
            <div className="navbar">
                <div className="navbar-wrapper">
                    <div className="navbar-left">
                    </div>
                    <div className="navbar-right">
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <AccountCircleOutlinedIcon /> {userState.user.username}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
