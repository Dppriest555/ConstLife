import { useState } from "react";
import useFetch from './useFetch'

function Food(url) {
    const [searchFood, setSearchFood] = useState("");


    const { data, loading, error } = useFetch('https://api.api-ninjas.com/v1/nutrition?query=' + searchFood);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.log(error)
    }

    return (
        <div className='bg-slate-900  w-4/5 h-4/5 rounded-xl text-slate-200'>
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
                        <div className="flex" key={index}>
                           <h1>{fitem.name + " :"}</h1><h1 className="ml-6">{fitem.calories} Calories </h1>
                        </div>
                    )
                }
            </div>
            </div>
        </div>
    );
}

export default Food