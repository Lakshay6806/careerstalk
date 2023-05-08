import { Routes, Route } from "react-router-dom"
import { BrowserRouter as Router, Navigate } from 'react-router-dom'

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  
  const { user } = useContext(AuthContext);
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home/>: <Register/>}/>
        <Route path="/login" element={user ? <Navigate to ="/"/> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to ="/"/> : <Register/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/messenger" element={
          // user ? <Navigate to ="/"/> : 
          <Messenger/>}/>  
      </Routes>
    </div>
    </Router>
  )

}

export default App;