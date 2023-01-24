import { Link } from 'react-router-dom';
import pic from '../Images/blovks.svg';
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const logout = async () => {
    await signOut(auth);
    navigate("/signin")
  };





  const divStyle = {
    backgroundColor: '#00cba9',
  };


  return (
    <div className='bg-white bg-opacity-75 w-full h-full flex flex-col justify-between items-center'>
      <nav style={divStyle} className='flex flex-col w-full h-10 rounded-xl'>
        <ul className='flex justify-evenly w-full z-10 items-center text-cyan-900 font-bold'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/profile">Edit Profile</Link>
          </li>
        </ul>
        <img className='' src={pic} alt="mock" />
      </nav>
      <main className='h-3/5 flex flex-col justify-between'>
        <h1 className='text-center'>Welcome to our website! <br /> {user?.displayName}</h1>
        <div className="log-out flex flex-col text-xs text-slate-900">
          <h4> User Logged In: {user?.email}</h4>
          <div className="uPhoto">

            <img className="rounded-xl" src={user.photoURL} alt="Profile" width="200" height="200" />
          </div>
          <button className="btn mt-2 text-sm" onClick={logout}>Sign Out</button>
        </div>
      </main>
      <footer>
        <p className='mb-6'>Copyright ©2022 MyWebsite</p>
      </footer>
    </div>
  );
}
