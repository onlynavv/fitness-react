import React,{useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import "./Activities.css"
import { useGlobalContext } from './context';

const Activities = () => {
    const {id} = useParams()

    const history = useHistory()

    const {logWorkoutDispatcher} = useGlobalContext()

    const [activities, setActivities] = useState([])
    const [singleActivtyId, setSingleActivityId] = useState([])
    const [selectedActivities, setSelectedActivities] = useState([])

    useEffect(()=>{
        fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/getActivitiesForType/${id}`)
    .then((data)=> data.json())
    .then((item)=> setActivities(item))
    },[id])

    console.log(activities)

    function getActivities (){
        fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/getActivity/${singleActivtyId}`)
    .then((data)=> data.json())
    .then((item)=> setSelectedActivities([...selectedActivities, item]))
    }

    useEffect(()=>{
        if(singleActivtyId.length > 0){
            getActivities()
        }
    },[singleActivtyId])

    console.log(selectedActivities)

    const handleAddActivities = (e) => {
        e.preventDefault()
        logWorkoutDispatcher({type:"ADD_EXERCISES", payload: selectedActivities})
        history.push("/logworkout")
    }

  return (
        <div>
            <h1>select activities to start workout</h1>
            <div className='activities-div'>
                <form>
                    <div className="form-control">
                       {activities.map((item)=>{
                            const {_id, activityName} = item
                            return(
                                <div key={_id} className='single-activity'>
                                    <input type="checkbox" name={activityName} value={activityName} id={_id} onChange={()=>{setSingleActivityId(_id)}}></input>
                                    <label htmlFor={_id} className='form-check-label'>{activityName}</label>
                                </div>
                            )
                        })} 
                    </div>
                    <div>
                        <button onClick={handleAddActivities}>Add Activities</button>
                    </div>
                </form>
            </div>
        </div>
  )
};

export default Activities;
