import './App.css';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router >
      <div className="App">
        <div className="container">
          <Routes>

            <Route exact path="/home" element={<Home />} />
            <Route exact path="/signup" element={<Register />} />  
            <Route exact path="/signin" element={<Login />} />              


          </Routes  >
        </div>
      </div>
    </Router>
  );
}

export default App;
