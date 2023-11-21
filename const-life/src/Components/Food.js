import { useState, useEffect } from "react";
import useFetch from './useFetch';
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'
import { auth } from "../firebase";
import {
    onAuthStateChanged
} from "firebase/auth";
import Navbar from './NavBar';



function Food(url) {
    const [searchFood, setSearchFood] = useState("");
    const [food, setFood] = useState("");
    const [docs, setDocs] = useState([]);
    const [user, setUser] = useState({});



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        const checkdata = async () => {
            const foodRef = collection(db, 'FoodItems', `User: ${user.email}`, `${user.email}'s FoodCollection`);
            const docSnap = await getDocs(foodRef);
            setDocs(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id, })));
        }
        checkdata();
        unsubscribe();
    }, [user]);


    const { data, loading, error } = useFetch('https://api.api-ninjas.com/v1/nutrition?query=' + food);

    if (loading) {
        return <div className="flex items-center justify-center text-6xl w-full h-full text-zinc-200">Loading...</div>
    }
    if (error) {
        console.log(error)
    }



    const addFoodToDb = () => {
        const foodRef = doc(db, 'FoodItems', `User: ${user.email}`, `${user.email}'s FoodCollection`, `${searchFood}`);
        setDoc(foodRef, { FoodData: data }, { merge: true }).then(() =>{
            const checkdata = async () => {
                const foodRef = collection(db, 'FoodItems', `User: ${user.email}`, `${user.email}'s FoodCollection`);
                const docSnap = await getDocs(foodRef);
                setDocs(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id, })));
                console.log("Food item added successfully!");
            }
            checkdata();
        }).catch(error => {
            console.error("Error adding food item: ", error);
        });
    }

    const deleteFoodFromDb = (foodId) => {
        const foodRef = doc(db, 'FoodItems', `User: ${user.email}`, `${user.email}'s FoodCollection`, `${foodId}`);
        deleteDoc(foodRef).then(() => {
            console.log("Food item deleted successfully!");
            setDocs(docs.filter(doc => doc.id !== foodId));
        }).catch(error => {
            console.error("Error deleting food item: ", error);
        });
    };








    return (
        <div className='bg-slate-900  w-full h-full text-slate-200'>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="mt-6">

                    <input
                        className="text-input rounded-lg h-8 text-center text-gray-900 font-bold"
                        placeholder="Food Seach..."
                        type="input"
                        onChange={(event) => {
                            setSearchFood(event.target.value);
                        }}
                    />
                    <div>
                        <button onClick={() => {
                            setFood(searchFood)
                            console.log(searchFood)
                        }}>Search</button>
                    </div>
                </div>
                <div className="mt-8 flex">
                    {
                        data.map((fitem, index) =>
                            <div onClick={addFoodToDb} className="flex flex-row" key={index}>
                                <div><h1>{fitem.name}</h1><h1 className="ml-4">{fitem.calories} Calories </h1>
                                 <h1>{fitem.serving_size_g}</h1><h1 className="ml-4">{fitem.carbohydrates_total_g} </h1></div>
                            </div>
                        )
                    }
                </div>
                <div className="mt-8 flex">
                    {
                        docs.map((item, index) =>
                            <div className="flex flex-col p-6 items-center" key={index}>
                                <div><h1>{"Name : " + item.id}</h1></div>
                                <div><h1>{"Serving size : " + item.FoodData.map((obj)=>{
                                    return(obj.serving_size_g + "g")    
                                })}</h1></div>
                                <div><h1>{"Calories : " + item.FoodData.map((obj)=>{
                                    return(obj.calories)    
                                })}</h1></div>
                                <div><h1>{"Carbs : " + item.FoodData.map((obj)=>{
                                    return(obj.carbohydrates_total_g + "g")    
                                })}</h1></div>
                                <div><h1>{"Sugar : " + item.FoodData.map((obj)=>{
                                    return(obj.sugar_g + "g")    
                                })}</h1></div>
                                <button className="mt-6 text-xl" onClick={() => deleteFoodFromDb(item.id)}>Delete</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Food