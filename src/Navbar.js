import React from 'react'
import './Navbar.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Divider from '@mui/material/Divider';
import { useGlobalContext } from './context';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

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
                        <Stack direction="row" spacing={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>{userState.user.username.substring(0,2)}</Avatar>
                        </Stack>
                        <h3>{userState.user.username}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
