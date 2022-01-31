import React,{useContext, useReducer} from "react";
import { LogWorkoutReducer } from "./LogWorkoutReducer";
import { LogWorkoutState } from "./LogWorkoutState";
import { TimerInitialState } from "./TimerInitialState";
import { TimerReducer } from "./TimerReducer";
import { UserReducer } from "./UserReducer";
import { UserState } from "./UserState";

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    // user functions
    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            userDispatch({type:"SET_USER", payload:{token, userFromDB}})
        }
    }

    const userSignout = () => {
        localStorage.clear()
        userDispatch({type:"LOGOUT_USER"})
    }

    // tabata timer

    const [timerState, timerDispatch] = useReducer(TimerReducer, TimerInitialState)

    const [logWorkoutState, logWorkoutDispatcher] = useReducer(LogWorkoutReducer, LogWorkoutState)

    // user useReducer
    const [userState, userDispatch] = useReducer(UserReducer, UserState)

    console.log(timerState.workoutSecs)
    console.log(timerState.restSecs)
    console.log(logWorkoutState.workoutSelected)

    return(
        <AppContext.Provider value={{timerState, ...logWorkoutState, logWorkoutDispatcher, userState, userDispatch, isUserLoggedIn, userSignout}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}