import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'
import { auth } from "../firebase";
import {
    onAuthStateChanged
} from "firebase/auth";
import 'react-calendar/dist/Calendar.css';
import Navbar from './NavBar';

const DailyTasks = () => {
    const [value, setValue] = useState(new Date());
    const [task, setTask] = useState('');
    const [docs, setDocs] = useState([]);
    const [user, setUser] = useState({});

    function onChange(nextValue) {
        setValue(nextValue);
    }

    const currentDay = value.toLocaleDateString();
    const currentDayFixed = currentDay.replaceAll(`/`, ",")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        const checkdata = async () => {
            const taskRef = collection(db, 'D.Tasks', `User: ${user.email}`, `${currentDayFixed}`);
            const docSnap = await getDocs(taskRef);
            setDocs(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id, })));
        }
        checkdata();
        unsubscribe();
    }, [user, value, currentDayFixed]);



    const addTaskToDb = () => {
        const taskRef = doc(db, 'D.Tasks', `User: ${user.email}`, `${currentDayFixed}`, `${task}`);
        setDoc(taskRef, { Task: task }, { merge: true }).then(() => {
            const checkdata = async () => {
                const taskRef = collection(db, 'D.Tasks', `User: ${user.email}`, `${currentDayFixed}`);
                const docSnap = await getDocs(taskRef);
                setDocs(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id, })));
            }
            checkdata();
        }).catch(error => {
            console.error("Error deleting food item: ", error);
        });
    }

    const deleteTaskFromDb = (TaskId) => {
        const taskRef = doc(db, 'D.Tasks', `User: ${user.email}`, `${currentDayFixed}`, `${TaskId}`);
        deleteDoc(taskRef).then(() => {
            console.log("Task is deleted successfully!");
            setDocs(docs.filter(doc => doc.id !== TaskId));
        }).catch(error => {
            console.error("Error deleting food item: ", error);
        });
    };

    const toggleDiv = () => {
        const div = document.getElementById("addTask");
        if (div.className === "hidden") {
            div.className = "block";
        } else {
            div.className = "hidden";
        }
    };


    return (
        <div className='text-slate-200 h-full flex flex-col justify-between items-center'>
            <Navbar />
            <div>
                <Calendar
                    className="text-slate-900 rounded-xl"
                    onChange={onChange}
                    onClickDay={(value) => console.log(value)}
                    value={value}
                />
            </div>
            <div>
                <button className="btn bg-green-400 w-32 h-10 rounded-lg font-bold text-slate-900 mb-6" onClick={toggleDiv}>Add Daily Tasks</button>
                <div id='addTask' className='hidden'>
                    <input
                        className="placeholder:italic mb-6 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder={"Clean the house..."}
                        onChange={(event) => {
                            setTask(event.target.value);
                        }}
                    />
                    <button onClick={addTaskToDb}>Add Task</button>
                </div>
            </div>
            <div className="mb-8 w-2/5">
                {
                    docs.map((item, index) =>
                        <div className="flex flex-row justify-between" key={index}>
                            <div><h1>{item.Task}</h1></div>
                            <button onClick={() => deleteTaskFromDb(item.Task)}>Delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default DailyTasks