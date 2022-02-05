import React,{useState} from 'react';
import { useGlobalContext } from './context';

const TimerForm = () => {
    const {workoutSecs, restSecs, rounds, timerDispatch} = useGlobalContext()

  return (
    <div className='timerForm-div'>
        <form>
            <div className='form-control'>
                <label>workout minutes</label>
                <input type="number" value={workoutSecs}></input>
            </div>
            <div className='form-control'>
                <label>Rest Time</label>
                <input type="number" value={restSecs}></input>
            </div>
            <div className='form-control'>
                <label>Total Reps</label>
                <input type="number" value={rounds}></input>
            </div>
        </form>
    </div>
  )
};

export default TimerForm;
