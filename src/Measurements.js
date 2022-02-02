import React,{useState} from 'react';
import "./Measurements.css"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';

const Measurements = () => {

  const {userState} = useGlobalContext()
  const history = useHistory()

  const [showWeightForm, setShowWeightForm] = useState(false)
  const [weightValue, setWeightValue] = useState({weight:""})
  const [dateValue, setDateValue] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleWeightChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setWeightValue({...weightValue, [name]:value})
    }
  
  const handleDateChange = (e) => {
        setDateValue(e)
        setShowDatePicker(!showDatePicker)
  }

  const handleWeightSubmit = async(e) => {
    e.preventDefault()
    const weightData = {...weightValue, onDate: moment(dateValue).unix()}
    console.log(weightData)
    try{
        const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/measurements/addUserWeights', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify(weightData)
                })
         if(resp.ok){
           console.log("success")
           history.push("/")
         }       
        
    }catch(error){
      console.warn(error.toString())
    }
  }

  console.log(weightValue)
  console.log(moment(dateValue).unix())

  return (
    <div className='measurements-wrapper'>
      <h2>Measurements</h2>
      <div className='weight-wrapper'>
        <div className='weight-info'>
          <div className='weight-infoBtns'>
            <button onClick={()=>setShowWeightForm(!showWeightForm)}>Add Weight +</button>
          </div>

          {showWeightForm && (
            <form className='form-wrapper'>
              <div className='form-control'>
                <label>Enter Weight: </label>
                <input type="number" placeholder="enter weight" value={weightValue.weight} onChange={handleWeightChange} id="weight" name="weight"></input>
              </div>
              <div className='form-control'>
                <label>Date: {moment(dateValue).format('MMMM Do YYYY')}</label>
                <p onClick={()=>setShowDatePicker(!showDatePicker)}>Change Date</p>
                {showDatePicker && <Calendar value={dateValue} name="date" onChange={handleDateChange} />}
              </div>
              <button onClick={handleWeightSubmit}>Submit Weight</button>
            </form>
          )}
          

        </div>
      </div>
    </div>
)
};

export default Measurements;
