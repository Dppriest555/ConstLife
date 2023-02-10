import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'
import { auth } from "../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import 'react-calendar/dist/Calendar.css';

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
    }, [user, value]);

    

    const addTaskToDb = () => {
        const taskRef = doc(db, 'D.Tasks', `User: ${user.email}`, `${currentDayFixed}`, `${task}`);
        setDoc(taskRef, { Task: task }, { merge: true }).then(()=>{
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
        <div>
            <div>
                <Calendar
                    onChange={onChange}
                    onClickDay={(value) => console.log(value)}
                    value={value}
                />
            </div>
            <div>
                <button className='bg-white' onClick={toggleDiv}>Add Daily Tasks</button>
                <div id='addTask' className='hidden'>
                    <input onChange={(event) => {
                            setTask(event.target.value);
                        }}></input>
                    <button onClick={addTaskToDb}>Add Task</button>
                </div>
            </div>
            <div className="mt-8">
                    {
                        docs.map((item, index) =>
                            <div className="flex flex-row" key={index}>
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