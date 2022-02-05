import React,{useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import "./Activities.css"
import { useGlobalContext } from './context';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import AddIcon from '@mui/icons-material/Add';

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

    const handleSetActivity = (e, _id) => {

        if(e.target.checked){
            setSingleActivityId(_id)
        }else{
            const newValue = selectedActivities.filter((item)=> {return item.activityName !== e.target.value})
            setSelectedActivities(newValue)
        }
    }

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


    const handleAddActivities = (e) => {
        e.preventDefault()
        logWorkoutDispatcher({type:"ADD_EXERCISES", payload: selectedActivities})
        history.push("/logworkout")
    }

  return (
        <div className='activities-wrapper'>
            <div className='activities-header'>
                <h1>select activities to start workout</h1>
                <button onClick={()=>history.goBack()} className='backBtn'><ArrowBackOutlinedIcon /> Go Back</button>
            </div>
            <div className='activities-div'>
                <form>
                    <div className="form-control">
                       {activities.map((item)=>{
                            const {_id, activityName} = item
                            return(
                                <div key={_id} className='checkbox-wrapper'>
                                    <input type="checkbox" name={activityName} value={activityName} id={_id} onChange={(e)=>{handleSetActivity(e,_id)}}></input>
                                    <label className='single-activity' htmlFor={_id}>{activityName}</label>
                                </div>
                            )
                        })} 
                    </div>
                    <div className='addBtn-wrapper'>
                        <button className='addActivities' onClick={handleAddActivities}>Add Activities <AddIcon /> </button>
                    </div>
                </form>
            </div>
        </div>
  )
};

export default Activities;
