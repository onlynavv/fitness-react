import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./ActivityType.css"
import { useHistory } from 'react-router-dom';

const ActivityType = () => {
    const {id} = useParams()
    console.log(id)

    const [activityType, setActivityType] = useState([])

    const history = useHistory()

    useEffect(()=>{
    fetch(`https://fitness-logger-node-app.herokuapp.com/workouts/getActivityTypeForCat/${id}`)
    .then((data)=> data.json())
    .then((item)=> setActivityType(item))
  },[id])

  console.log(activityType)

  return (
        <div>
            <h1>Select Activity Type</h1>
            <div className='activityType-div'>
                {activityType.map((item)=>{
                    const {_id, name} = item
                    return(
                        <div key={_id} className='single-activityType' onClick={()=>history.push(`/activities/${_id}`)}>
                            <h4>{name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
  )
};

export default ActivityType;
