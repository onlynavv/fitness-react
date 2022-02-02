import React,{useEffect, useState} from 'react';
import { useGlobalContext } from './context';
import "./TabataTimer.css"

const Timer = () => {

  const {timerState} = useGlobalContext()
  console.log(timerState)

  const [initialTimerState, setInitialTimerState] = useState(timerState)
  const [currTimer, setCurrTimer] = useState(initialTimerState)
  const [showPlayBtn, setShowPlayBtn] = useState(true)
  const [showSecsData, setShowSecData] = useState(true)

  const startTimer = () => {
      setCurrTimer({...currTimer, isStarted: true})
      setShowPlayBtn(false)
  }

  const stopTimer = () => {
      setCurrTimer(timerState)
      setShowPlayBtn(true)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInitialTimerState({...initialTimerState, [name]:value})
    setCurrTimer({...currTimer, [name]:value})
  }

  useEffect(()=>{
    let timeInterval
    const {workoutSecs, restSecs, rounds, isStarted, isCompleted} = currTimer
    if(isStarted && !isCompleted){
        if(workoutSecs > 0){
            setShowSecData(true)
            timeInterval = setInterval(() => {
                setCurrTimer({...currTimer, workoutSecs: workoutSecs - 1})
            }, 1000);
        }

        if(workoutSecs === 0){
            setShowSecData(false)
            timeInterval = setInterval(() => {
                setCurrTimer({...currTimer, restSecs: restSecs - 1})
            }, 1000);
        }

        if(workoutSecs === 0 && restSecs === 0){
            setCurrTimer({...currTimer, rounds: rounds - 1, workoutSecs: initialTimerState.workoutSecs, restSecs: initialTimerState.restSecs})
        }

        if(rounds === 1 && workoutSecs === 0 && restSecs === 0){
            setCurrTimer({...currTimer, isCompleted: true})
        }

    }else{
        clearTimeout(timeInterval)
    }

    if(isCompleted){
        setInitialTimerState(initialTimerState)
        setCurrTimer(initialTimerState)
        setShowSecData(true)
        setShowPlayBtn(true)
    }
    return () => clearTimeout(timeInterval)
  })

  return (
      <>
        
        {showPlayBtn ? (
            <div className='timerForm-div'>
                <h1>Timer</h1>
                <form>
                    <div className='form-control'>
                        <label>workout seconds</label>
                        <input type="number" name="workoutSecs" value={currTimer.workoutSecs} onChange={handleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Rest Time</label>
                        <input type="number" name="restSecs" value={currTimer.restSecs} onChange={handleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Total Reps</label>
                        <input type="number" name="rounds" value={currTimer.rounds} onChange={handleChange}></input>
                    </div>
                </form>
            </div>
        ) : (
            <div className='timer'>
                <div className='rounds'>
                    <h4>Rounds</h4>
                    <h2>{currTimer.rounds}</h2>
                </div>
                {showSecsData ? (
                    <div className='timer-display'>
                        <h2>{currTimer.workoutSecs}</h2>
                        <h5>Work</h5>
                    </div>
                ) : (
                    <div className='timer-display'>
                        <h2>{currTimer.restSecs}</h2>
                        <h5>Rest</h5>
                    </div>
                )}
            </div>
        )}
        <div className='playBtn-div'>
            {showPlayBtn ? <button className='playBtn' onClick={()=>startTimer()}>Play</button> : <button className='pauseBtn' onClick={()=>stopTimer()}>Stop</button>}
        </div>
    </>
  )
};

export default Timer;
