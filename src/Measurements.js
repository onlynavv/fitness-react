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
    
    try{
        const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/measurements/addUserWeights', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify(weightData)
                })
         if(resp.ok){
           
           history.push("/")
         }       
        
    }catch(error){
      console.warn(error.toString())
    }
  }

  return (
    <div className='measurements-wrapper'>
      <h2>Measurements</h2>
      <div className='weight-wrapper'>
        <div className='weight-info'>
          <div className='weight-infoBtns'>
            <button onClick={()=>setShowWeightForm(!showWeightForm)}>Add Weight +</button>
          </div>

          {showWeightForm && (
            <form className='form-wrapper weightForm-wrapper'>
              <div className='form-control'>
                <label>Enter Weight: </label>
                <input type="number" placeholder="enter weight" min={0} value={weightValue.weight} onChange={handleWeightChange} id="weight" name="weight"></input>
              </div>
              <div className='form-control'>
                <label>Date: {moment(dateValue).format('MMMM Do YYYY')}</label>
                <div>
                  <p onClick={()=>setShowDatePicker(!showDatePicker)} className='changeDate'>Change Date</p>
                  {showDatePicker && <Calendar value={dateValue} name="date" onChange={handleDateChange} />}
                </div>
              </div>
              <div className='form-control'>
                <button onClick={handleWeightSubmit} className='submitWeight'>Submit Weight</button>
              </div>
            </form>
          )}
          

        </div>
      </div>
    </div>
)
};

export default Measurements;
