import { useState } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';






function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/profile");
    }
    catch (error) {
      console.log(error.message);
    }
  };




  return (
    <div className="text-slate-200 h-full flex flex-col justify-between items-center">
      <div className="login-container flex flex-col">
        <div>
        <h2>Welcome back. <br /> You have been missed!</h2>
        <br />
        <p>Let's sign you in.</p>
        <br />
        </div>
        <div className="flex flex-col">
        <input
          className="text-input text-slate-900"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className="text-input text-slate-900"
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button className="btn" onClick={login}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login
