import { useState, useEffect } from "react";
import useFetch from './useFetch';
import { doc, setDoc, getDocs, collection, } from "firebase/firestore";
import { db } from '../firebase'
import { auth } from "../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";



function Food(url) {
    const [searchFood, setSearchFood] = useState("");
    const [food, setFood] = useState("");
    const [docs, setDocs] = useState([]);
    const [user, setUser] = useState({});


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
        const checkdata = async () => {
            const foodRef = collection(db, 'FoodItems', `User: ${user.displayName}`, `${user.displayName}'s FoodCollection`);
            const docSnap = await getDocs(foodRef);
            setDocs(docSnap.docs.map((doc) => ({ ...doc.data(), id:doc.id,})));
            console.log(docs)
        }
        checkdata();
        unsubscribe();
    }, [user]);


    const { data, loading, error } = useFetch('https://api.api-ninjas.com/v1/nutrition?query=' + food);
    
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.log(error)
    }



    const addFoodToDb = () => {
        const foodRef = doc(db, 'FoodItems', `User: ${user.displayName}`, `${user.displayName}'s FoodCollection`, `${searchFood}`);
        setDoc(foodRef, { FoodData: data }, { merge: true });
        console.log(data)

    }

    





    return (
        <div className='bg-slate-900  w-full h-full text-slate-200'>
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
                <div className="mt-8">
                    {
                        docs.map((item, index) =>
                            <div className="flex flex-row" key={index}>
                                <div><h1>{item.id + " :"}</h1></div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Food