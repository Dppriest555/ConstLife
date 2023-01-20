import { useState } from "react";
import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";





const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">

            <div className="image image-login"></div>

            <div className="login-container container">
                <h2>Get Started</h2>
                <br />
                <p>Create profile and continue</p>
                <br />
                <input
                    className="text-input"
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />

                <input
                    className="text-input"
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
    );
}

export default Register