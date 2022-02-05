import React,{useState, useEffect} from 'react';
import "./LoginPage.css"
import RegisterPage from './RegisterPage';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';
import ForgotPassword from './ForgotPassword';

const LoginPage = () => {

  const [showLoginForm, setShowLoginForm] = useState(true)

  const [singleUser,setSingleUser] = useState({username:'',password:''})
  const [handleError, setHandleError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const {userState, userDispatch, isUserLoggedIn} = useGlobalContext()

  const history = useHistory()

  const handleForgotPassword = () => {
      setShowLoginForm(false)
      setShowForgotPassword(true)
  }

  const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

  const setUser = (token, userFromDB) => {
    userDispatch({type:"SET_USER", payload:{token, userFromDB}})
  }
  
  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const handleLogin = async() => {
        try{
            const resp = await fetch('https://fitness-logger-node-app.herokuapp.com/workouts/user/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleUser)
                })

        const data = await resp.json()
        
        setSingleUser(data.userFromDB.username)

        if(resp.ok){
            const {token, userFromDB} = data
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(data.userFromDB))
            setUser(token, userFromDB)
            history.push("/")
            setSingleUser({username:'',password:''})

        }else{
            throw new Error(data.msg)
        }
        }

        catch(error){
            setHandleError(error.toString())
            console.warn(error.toString())
        }
    }

  return (
    <div className='login'>
        <div className='login-background'>
            <div className='login-gradient'></div>
        </div>
        <div className='signup'>
            {showLoginForm ? (
                <div>
                    <h1>Login In</h1>
                        <form className='form-wrapper'>
                            <div className='form-control'>
                            <label>Enter Username</label>
                            <input type="email" placeholder="enter your email address" value={singleUser.username} onChange={handleChange} id="username" name="username"></input>
                            </div>
                            <div className="form-control">
                            <label>Enter Password</label>
                            <input type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
                            </div>
                            <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
                        </form>
                        <h4>
                            <span className='signup-link' onClick={handleForgotPassword}>Forgot Password ?</span>
                        </h4>
                        <h4>
                            <span className='signup-gray'>New to Fitness Logger?</span>
                            <span className='signup-link' onClick={()=>setShowLoginForm(!showLoginForm)}> Sign Up!!</span>
                        </h4>
                </div>
            ) : (
                showForgotPassword ? <ForgotPassword /> : <RegisterPage setShowLoginForm={setShowLoginForm} showLoginForm={showLoginForm} /> 
            )}
        </div>
    </div>
)
};

export default LoginPage;
