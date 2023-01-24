import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase"; 

function UseAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) =>
        setCurrentUser(user));
        return unsub;
      }, []);

  return {currentUser}
}

export default UseAuth