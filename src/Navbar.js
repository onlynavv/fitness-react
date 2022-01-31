import React from 'react'
import './Navbar.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-wrapper">
                    <div className="navbar-left">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                             className="paper-modified">
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search For"
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <div className="navbar-right">
                        <div className="navbarRight-container">
                            <NotificationsIcon />
                            <span className="notification-badge">2</span>
                        </div>
                        <div className="navbarRight-container">
                            <MailOutlineIcon />
                            <span className="notification-badge">2</span>
                        </div>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <img src="https://pbs.twimg.com/profile_images/1436192632338673667/GXyiOpHy_400x400.jpg" alt="avatarImage" className="navbar-avatar"></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
