import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { useGlobalContext } from './context';
import {nanoid} from "nanoid"
import { useHistory } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import "./SaveWorkout.css"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const SaveWorkout = () => {

    const history = useHistory()

    const [dateValue, setDateValue] = useState(new Date())
    const [workoutDetails, setWorkoutDetails] = useState({workoutTitle:"", workoutNotes:""})

    const {workoutSelected, userState} = useGlobalContext()

    const handleDateChange = (e) => {
        setDateValue(e)
  }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setWorkoutDetails({...workoutDetails, [name]:value})
    }

    const handleWorkoutSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/workouts/saveworkout', {
            method:'POST',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({...workoutDetails,workoutDate: moment(dateValue).unix(),workoutId: nanoid(6), workoutSummary:workoutSelected, userId:userState.user._id, username:userState.user.username})
                })
            if(resp.ok){
                
                history.push("/")
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

  return (
    <div className='save-workout-wrapper'>
        <div className='save-workout-header'>
            <h1>Save Workout</h1>
            <button onClick={()=>history.goBack()} className='backBtn'><ArrowBackOutlinedIcon /> Go Back</button>
        </div>
        <form className='form-wrapper'>
            <div className='form-control'>
                <label>Enter Workout Title</label>
                <input type="text" placeholder='Activity Summary Title' name="workoutTitle" id="workoutTitle" value={workoutDetails.workoutTitle} onChange={handleChange}></input>
            </div>
            <div className='form-control'>
                <label>Enter Notes:</label>
                <input type="text" placeholder='How did the workout go? leave some comments' name="workoutNotes" id="workoutNotes" value={workoutDetails.workoutNotes} onChange={handleChange}></input>
            </div>
            <div className='form-control'>
                <Calendar value={dateValue} name="date" onChange={handleDateChange}/>
                <label>Date: {moment(dateValue).format('dddd, MMMM Do YYYY, h:mm:ss a')}</label>
            </div>
            <div className='form-control'>
                <button onClick={(e)=>{handleWorkoutSubmit(e)}} className='saveWorkout'>Save Workout <SaveOutlinedIcon /> </button>
            </div>
        </form>
    </div>
  )
};

export default SaveWorkout;
