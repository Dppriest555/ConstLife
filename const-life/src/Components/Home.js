import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';

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

  return (

    <div className='text-slate-200 h-full flex flex-col justify-between items-center'>
      <Navbar />
      <main className='h-3/5 flex flex-col justify-around items-center'>
        <h1 className='text-center text-3xl'>Welcome to our website {user?.displayName}!</h1>
        <div className="log-out flex flex-col text-xs text-slate-900">
          <h4> User Logged In: {user?.email}</h4>
          <div className="uPhoto">
            <img className="rounded-xl" src={user.photoURL} alt="Profile" width="200" height="200" />
          </div>
          <button className="btn mt-2 text-sm text-gray-300" onClick={logout}>Sign Out</button>
        </div>
      </main>
      <footer>
        <p className='mb-6 text-sm opacity-80'>Copyright ©2023 VankoTheBeast</p>
      </footer>
    </div>
  );
}
