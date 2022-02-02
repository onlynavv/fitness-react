import React from 'react';
import './DashboardContent.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calculator from "./Calculator";
import Dashboard from "./Dashboard";
import Measurements from "./Measurements";
import Workouts from "./Workouts";
import Profile from "./Profile";
import Programs from "./Programs";
import Navbar from "./Navbar";
import ActivityType from './ActivityType';
import Activities from './Activities';
import TabataTimer from './TabataTimer';
import TimerForm from './TimerForm';
import LogWorkout from './LogWorkout';
import Signup from './Signup';
import Login from './Login';
import SaveWorkout from './SaveWorkout';
import UserSingleActivity from './UserSingleActivity';
import EditLogWorkout from './EditLogWorkout';

const DashboardContent = () => {
  return (
        <div className="dashboard-content">
            <div className="content">
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Profile />
                    </Route>
                    <Route path="/measurements">
                        <Measurements />
                    </Route>
                    <Route path="/workouts">
                        <Workouts />
                    </Route>
                    <Route path="/activitytype/:id">
                        <ActivityType />
                    </Route>
                    <Route path="/activities/:id">
                        <Activities />
                    </Route>
                    <Route path="/userSingleActivty/:id">
                        <UserSingleActivity />
                    </Route>
                    <Route path="/timer">
                        <TabataTimer />
                    </Route>
                    <Route path="/logworkout">
                        <LogWorkout />
                    </Route>
                    <Route path="/saveworkout">
                        <SaveWorkout />
                    </Route>
                    <Route path="/editWorkout/:id">
                        <EditLogWorkout />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </div>
    )
};

export default DashboardContent;
