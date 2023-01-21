import './App.css';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Profile from './Components/Profile'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router >
      <div className="App">
        <div className="container">
          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Register />} />  
            <Route exact path="/signin" element={<Login />} />              
            <Route exact path="/profile" element={<Profile />} />              

          </Routes  >
        </div>
      </div>
    </Router>
  );
}

export default App;
