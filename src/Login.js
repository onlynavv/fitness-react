import React,{useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';

const Login = () => {

  const [singleUser,setSingleUser] = useState({username:'',password:''})
  const [handleError, setHandleError] = useState("")

  const {userState, userDispatch, isUserLoggedIn} = useGlobalContext()

  const history = useHistory()

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
        console.log(singleUser)
        console.log(data)

        if(resp.ok){
            const {token, userFromDB} = data
            console.log(token, userFromDB)
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
    <div>
      <Card className="form-card">
        <CardContent className="form-cardContent">
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
        </CardContent>
      </Card>
    </div>
  )
};

export default Login;
