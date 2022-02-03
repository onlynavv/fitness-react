import React,{useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGlobalContext } from './context';
import "./EditLogWorkout.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const EditLogWorkout = () => {

    const {id} = useParams()

    const history = useHistory()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const {userState, isUserLoggedIn, editWorkoutDispatcher, editWorkoutState} = useGlobalContext()
    const {workoutSelected} = editWorkoutState
    console.log(workoutSelected)
    const [editFormData, setEditFormData] = useState()

    useEffect(()=>{
        fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/getUserSingleActivity/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token}})
    .then((data)=> data.json())
    .then((item)=> {
      setEditFormData(item)
      editWorkoutDispatcher({type:"LOAD_ACTIVITIES", payload:item.workoutSummary})
    })
    },[id])

    const handleRemoveActivity = (e, _id) => {
    e.preventDefault()
    console.log(_id)
    editWorkoutDispatcher({type:"REMOVE_ACTIVITY", payload:{_id}})
  }

  const handleDurationChange = (e, _id, durationValue) => {
    e.preventDefault()
    console.log(_id)
    editWorkoutDispatcher({type:"EDIT_DURATION", payload:{_id:_id, durationValue:durationValue}})
  }

  const handleDistanceChange = (e, _id, distanceValue) => {
    e.preventDefault()
    editWorkoutDispatcher({type:"EDIT_DISTANCE", payload:{_id:_id, distanceValue:distanceValue}})
  }

  const handleSetsChange = (e, _id, setsValue) => {
    e.preventDefault()
    editWorkoutDispatcher({type:"EDIT_SETS", payload:{_id:_id, setsValue:setsValue}})
  }

  const handleRepsChange = (e, _id, repsValue) => {
    e.preventDefault()
    editWorkoutDispatcher({type:"EDIT_REPS", payload:{_id:_id, repsValue:repsValue}})
  }

  const handleLevelsChange = (e, _id, levelsValue) => {
    e.preventDefault()
    editWorkoutDispatcher({type:"EDIT_LEVELS", payload:{_id:_id, levelsValue:levelsValue}})
  }

  const handleWeightChange = (e, _id, weightValue) => {
    e.preventDefault()
    editWorkoutDispatcher({type:"EDIT_WEIGHTS", payload:{_id:_id, weightValue:weightValue}})
  }

  const handleEditWorkout = async(e) => {
    e.preventDefault()
    console.log({...editFormData, workoutSummary:workoutSelected})
    try{
            const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/workouts/editworkout', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({workoutSummary:workoutSelected, workoutId:editFormData.workoutId})
                })
            if(resp.ok){
                console.log("success")
                history.push("/")
            }
        }catch(error){
            console.warn(error.toString())
        }
  }

  return (
    <div className='editLogWorkout-wrapper'>
        <div className='editLogWorkout-header'>
          <h2>Edit Activity</h2>
          <button onClick={()=>history.goBack()} className='backBtn'><ArrowBackOutlinedIcon /> Go Back</button>
        </div>
        <form>
            {workoutSelected && workoutSelected.map((item)=>{
            const {activityName, activityLevels, _id} = item
            return(
              <div key={_id} className='activity-wrapper'>
                <div className='activity-name'>
                  <h4>{activityName}</h4>
                  <button onClick={(e)=>{handleRemoveActivity(e, _id)}} className='saveWorkout'>Remove Activity</button>
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
          <div className='form-control'>
            <button onClick={(e)=>handleEditWorkout(e)} className='editworkout'>Edit Workout</button>
          </div>
        </form>
    </div>
)
};

export default EditLogWorkout;
