import React,{useState, useEffect} from 'react';
import "./Workout.css"
import { useHistory } from 'react-router-dom';

const Workouts = () => {

  const [categories, setCategories] = useState([])

  const history = useHistory()

  useEffect(()=>{
    fetch("https://fitness-logger-node-app.herokuapp.com/workouts/getAllCategories")
    .then((data)=> data.json())
    .then((item)=> setCategories(item.data))
  },[])

  console.log(categories)

  return <div className='workoutCat-wrapper'>
      <h2>Select category</h2>
      <div className='category-div'>
        {categories.map((item)=>{
          const {_id, name} = item
          return (
            <div key={_id} className='single-category' onClick={()=>history.push(`/activitytype/${_id}`)}>
              <h3>{name}</h3>
            </div>
          )
        })}
      </div>
  </div>;
};

export default Workouts;
