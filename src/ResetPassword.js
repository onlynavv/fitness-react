import React,{useState} from 'react';
import "./LoginPage.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const history = useHistory()
    const {id, token} = useParams()

    const [handlePassword,setHandlePassword] = useState({password:''})
    const [handleError, setHandleError] = useState("")
    const [handleSucess, setHandleSucess] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setHandlePassword({...handlePassword, [name]:value})
    }

    console.log(JSON.stringify(handlePassword))


    const handleLogin = async() => {
        const url = `https://fitness-logger-node-app.herokuapp.com/workouts/user/reset-password/${id}/${token}`
        
        try{
            const resp = await fetch(url, {
            method:'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(handlePassword)
                })

        const data = await resp.json()
        

        if(resp.ok){
            setHandleSucess(data.msg)
            setTimeout(()=>{
                history.push("/")
            },5000)
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            
            setHandleError(error.toString())
        }
        
    }

  return (
    <div className='login'>
        <div className='login-background'>
            <div className='login-gradient'></div>
        </div>
        <div className='signup'>
            <div>
                <h1>Reset Password</h1>
                    <form className="form-wrapper">
                        <div className="form-control">
                            <label>Enter Password</label>
                            <TextField className="userInput" label='Password' placeholder='Enter Password' value={handlePassword.password} onChange={handleChange} id="password" name="password" multiline variant="standard" />
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
        </div>
    </div>
)
};

export default ResetPassword;
