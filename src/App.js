import React,{useEffect} from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useGlobalContext } from "./context";
import DashboardContent from "./DashboardContent";
import LoginPage from "./LoginPage";
import ResetPassword from "./ResetPassword";
import Sidebar from "./Sidebar";


function App() {

  const {userState, isUserLoggedIn} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  return (
    <div className="App">
      {!userState.isUserAuthenticated ? 
        <Router>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/reset/:id/:token">
              <ResetPassword />
            </Route>
          </Switch>
        </Router> : (
        <Router>
          <Sidebar />
          <DashboardContent />
        </Router>
      )}
    </div>
  );
}

export default App;
