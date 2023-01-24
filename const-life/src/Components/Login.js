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
    <div className="bg-white bg-opacity-75 justify-end w-full h-full flex flex-col items-center">
      <div className="login-container flex flex-col">
        <div>
        <h2>Welcome back. <br /> You have been missed!</h2>
        <br />
        <p>Let's sign you in.</p>
        <br />
        </div>
        <div className="flex flex-col">
        <input
          className="text-input"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className="text-input"
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
