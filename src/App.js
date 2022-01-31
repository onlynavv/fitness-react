import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardContent from "./DashboardContent";


import Sidebar from "./Sidebar";


function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <DashboardContent />
      </Router>
    </div>
  );
}

export default App;
