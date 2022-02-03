import React from 'react';
import { useGlobalContext } from './context';
import "./LogWorkout.css"
import { useHistory } from 'react-router-dom';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DoneIcon from '@mui/icons-material/Done';

const LogWorkout = () => {

  const {workoutSelected, logWorkoutDispatcher} = useGlobalContext()

  console.log(workoutSelected)

  const history = useHistory()

  const handleRemoveActivity = (e, _id) => {
    e.preventDefault()
    console.log(_id)
    logWorkoutDispatcher({type:"REMOVE_ACTIVITY", payload:{_id}})
  }

  const handleDurationChange = (e, _id, durationValue) => {
    e.preventDefault()
    console.log(_id)
    logWorkoutDispatcher({type:"CHANGE_DURATION", payload:{_id:_id, durationValue:durationValue}})
  }

  const handleDistanceChange = (e, _id, distanceValue) => {
    e.preventDefault()
    logWorkoutDispatcher({type:"CHANGE_DISTANCE", payload:{_id:_id, distanceValue:distanceValue}})
  }

  const handleSetsChange = (e, _id, setsValue) => {
    e.preventDefault()
    logWorkoutDispatcher({type:"CHANGE_SETS", payload:{_id:_id, setsValue:setsValue}})
  }

  const handleRepsChange = (e, _id, repsValue) => {
    e.preventDefault()
    logWorkoutDispatcher({type:"CHANGE_REPS", payload:{_id:_id, repsValue:repsValue}})
  }

  const handleLevelsChange = (e, _id, levelsValue) => {
    e.preventDefault()
    logWorkoutDispatcher({type:"CHANGE_LEVELS", payload:{_id:_id, levelsValue:levelsValue}})
  }

  const handleWeightChange = (e, _id, weightValue) => {
    e.preventDefault()
    logWorkoutDispatcher({type:"CHANGE_WEIGHTS", payload:{_id:_id, weightValue:weightValue}})
  }

  return (
    <div className='logWorkout-wrapper'>
        <div className='logWorkout-header'>
            <h1>Select Activity Type</h1>
            <button onClick={()=>history.goBack()} className='backBtn'><ArrowBackOutlinedIcon /> Go Back</button>
        </div>
        <form>
          {workoutSelected.map((item)=>{
            const {activityName, activityLevels, _id} = item
            return(
              <div key={_id} className='activity-wrapper'>
                <div className='activity-name'>
                  <h2>{activityName}</h2>
                  <button className='removeBtn' onClick={(e)=>{handleRemoveActivity(e, _id)}}>Remove Activity <RemoveCircleOutlineIcon /> </button>
                </div>
                    <div className='sets-wrapper'>
                      <div className='sets-info'>
                        {item.catName === "cardio" ? (
                          <div className='form-control'>
                            <label>Enter Km</label>
                            <input type="number" placeholder='enter km' value={item.distance} onChange={(e)=>{handleDistanceChange(e, _id, e.target.value)}}></input>
                          </div>
                        ) : (
                          <div className='form-control'>
                            <label>Enter Kgs</label>
                            <input type="number" placeholder='enter kgs' value={item.weight} onChange={(e)=>{handleWeightChange(e, _id, e.target.value)}}></input>
                          </div>
                        )}
                        <div className='form-control'>
                          <label>Enter duration</label>
                          <input type="number" placeholder='duration in min' value={item.duration} onChange={(e)=>{handleDurationChange(e, _id, e.target.value)}}></input>
                        </div>
                        <div className='form-control'>
                          <label>Enter No of Sets</label>
                          <input type="number" placeholder="enter no of sets" value={item.sets} onChange={(e)=>{handleSetsChange(e, _id, e.target.value)}}></input>
                        </div>
                        <div className='form-control'>
                          <label>Enter Reps</label>
                          <input type="number" placeholder="enter no of reps" value={item.reps} onChange={(e)=>{handleRepsChange(e, _id, e.target.value)}}></input>
                        </div>
                        <div className='form-control'>
                          <label>select activity level: </label>
                          <select name="activityLevel" value={item.levels} onChange={(e)=>{handleLevelsChange(e, _id, e.target.value)}}>
                            {activityLevels.map((levels)=>{
                              return <option key={levels.id} value={levels.name}>{levels.name}</option>
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
              </div>
            )
          })}
          {workoutSelected.length > 0 ? (
            <div className='form-control'>
              <button onClick={()=>{history.push("/saveworkout")}} className='finish-wrapper'>Finish Workout <DoneIcon /> </button>
            </div>
          ) : (
            <div className='form-control'>
              <h3 style={{textAlign:"center"}}>Please Select Activities, Go back and select</h3>
            </div>
          )}
        </form>
    </div>
  )
};

export default LogWorkout;
