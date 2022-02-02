import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ForgotPassword = () => {
  const [userName,setUserName] = useState({username:''})
  
  const [handleError, setHandleError] = useState("")
  const [handleSucess, setHandleSucess] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserName({...userName, [name]:value})
    }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/workouts/user/forgot-password', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userName)
                })

        const data = await resp.json()
        

        if(resp.ok){
            setHandleSucess(data.msg)
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            
            setHandleError(error.toString())
        }
        
    }

  return (
    <div>
        <h1>Forgot Password</h1>
            <form className="form-wrapper">
                <div className="form-control">
                    <label>Enter Username</label>
                    <TextField className="userInput" label='User Name' placeholder='Enter User Name' id="username" name="username" value={userName.username} onChange={handleChange} multiline variant="standard" />
                </div>
                <div className='form-control status-div'>
                    <p className='error-clr'>{handleError}</p>
                    <p className='success-clr'>{handleSucess}</p>
                </div>
                <div className='btn-div'>
                    <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>Submit</Button>
                </div>
            </form>
    </div>
)
};

export default ForgotPassword;
