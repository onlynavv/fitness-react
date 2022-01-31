import React from 'react';
import { useGlobalContext } from './context';
import "./LogWorkout.css"
import {nanoid} from "nanoid"

const LogWorkout = () => {

  const {workoutSelected, logWorkoutDispatcher} = useGlobalContext()

  console.log(workoutSelected)

  const handleAddSets = (e, _id) => {
    e.preventDefault()
    console.log(_id)
    logWorkoutDispatcher({type:"ADD_SET", payload:{_id, setId: nanoid(6)}})
  }

  const handleRemoveActivity = (e, _id) => {
    e.preventDefault()
    console.log(_id)
    logWorkoutDispatcher({type:"REMOVE_ACTIVITY", payload:{_id}})
  }

  const handleRemoveSets = (e, setId, _id) => {
    e.preventDefault()
    console.log({activityId:_id, setId:setId})
    logWorkoutDispatcher({type:"REMOVE_SET", payload:{activityId:_id, setId:setId}})
  }

  const handleDurationChange = (e, _id, setId) => {
    logWorkoutDispatcher({type:"CHANGE_DURATION", payload:{_id:_id, setId:setId, durationValue:e.target.value}})
  }

  return (
    <div>
        <form>
          {workoutSelected.map((item)=>{
            const {activityName, activityLevels, _id} = item
            return(
              <div key={_id} className='activity-wrapper'>
                <div className='activity-name'>
                  <h4>{activityName}</h4>
                  <button onClick={(e)=>{handleRemoveActivity(e, _id)}}>Remove Activity</button>
                </div>
                {item.setsPerformed && item.setsPerformed.map((sets)=>{
                  return(
                    <div key={sets.setId} className='sets-wrapper'>
                      <h5>set: {sets.setId}</h5>
                      <div className='sets-info'>
                        {item.catName === "cardio" ? (
                          <div className='form-control'>
                            <label>Enter Km</label>
                            <input type="number"></input>
                          </div>
                        ) : (
                          <div className='form-control'>
                            <label>Enter Kgs</label>
                            <input type="number"></input>
                          </div>
                        )}
                        <div className='form-control'>
                          <label>Enter duration</label>
                          <input type="number" placeholder='duration in min' value={sets.duration && sets.duration} onChange={(e)=>handleDurationChange(e, _id, sets.setId)}></input>
                        </div>
                        <div className='form-control'>
                          <label>Enter Reps</label>
                          <input type="number"></input>
                        </div>
                        <div className='form-control'>
                          <label>select activity level: </label>
                          <select name="activityLevel">
                            {item.activityLevels.map((levels)=>{
                              return <option key={levels.id} value={levels.name}>{levels.name}</option>
                            })}
                          </select>
                        </div>
                        <div className='form-control'>
                          <button onClick={(e)=>{handleRemoveSets(e, sets.setId, _id)}}>Remove set</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                <button onClick={(e)=>handleAddSets(e,_id)}>Add Set +</button>
              </div>
            )
          })}
        </form>
    </div>
  )
};

export default LogWorkout;
