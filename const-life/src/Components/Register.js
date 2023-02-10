import { useState } from "react";
import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';






const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const navigate = useNavigate();

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            );
            navigate("/profile");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="text-slate-200 h-full flex flex-col justify-between items-center">

            <div className="login-container flex flex-col">

            <div className="login-container container">
                <div>
                <h2>Get Started</h2>
                <br />
                <p>Create profile and continue</p>
                <br />
                </div>
                <div className="flex flex-col">
                <input
                    className="text-input text-slate-900"
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />

                <input
                    className="text-input text-slate-900"
                    placeholder="Password..."
                    type="password"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <button className="btn btn-green" onClick={register}>Register</button>
                <br />
                <span>
                    Already have an account?
                </span>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Register
