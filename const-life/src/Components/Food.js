import { useState, useEffect } from "react";
import useFetch from './useFetch';
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { auth } from "../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";



function Food(url) {
    const [searchFood, setSearchFood] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    useEffect(() => {

        const checkdata = async () => {
            const foodRef = doc(db, 'FoodItems', `User: ${user.displayName}`, `${user.displayName}'s FoodCollection`, `banana`);
            const docSnap = await getDoc(foodRef);
            const results = docSnap.docs.map((doc) => ({ ...doc.data(), id:doc.id,}));
            console.log(results)
        }
        checkdata(user.displayName)
    }, []);

    const { data, loading, error } = useFetch('https://api.api-ninjas.com/v1/nutrition?query=' + searchFood);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.log(error)
    }



    const addFoodToDb = () => {
        const foodRef = doc(db, 'FoodItems', `User: ${user.displayName}`, `${user.displayName}'s FoodCollection`, `banana`);
        setDoc(foodRef, { FoodData: data }, { merge: true });
        console.log(data)

    }





    return (
        <div className='bg-slate-900  w-full h-full text-slate-200'>
            <div className="flex flex-col items-center">
                <div className="mt-6">
                    <form action="/food">
                        <input
                            className="text-input rounded-lg h-8 text-center text-gray-900 font-bold"
                            placeholder="Food Seach..."
                            type="input"
                            onChange={(event) => {
                                setSearchFood(event.target.value);
                            }}
                        />
                    </form>
                </div>
                <div className="mt-8">
                    {
                        data.map((fitem, index) =>
                            <div onClick={addFoodToDb} className="flex flex-row" key={index}>
                                <div><h1>{fitem.name + " :"}</h1><h1 className="ml-4">{fitem.calories} Calories </h1></div>
                                <div> <h1>{fitem.serving_size_g}</h1><h1 className="ml-4">{fitem.carbohydrates_total_g} </h1></div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Food