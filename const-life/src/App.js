import './App.css';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Food from './Components/Food'
import AuthWrapper from './CustomFunctions/AuthWrapper';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router >
      <div className="App h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
          <Routes>
            <Route element={<AuthWrapper />}>
            <Route exact path="/" element={<Home />} />           
            <Route exact path="/profile" element={<Profile />} />              
            <Route exact path="/food" element={<Food />} />
            </Route>
            <Route exact path="/signup" element={<Register />} />  
            <Route exact path="/signin" element={<Login />} />   
          </Routes  >
      </div>
    </Router>
  );
}

export default App;
