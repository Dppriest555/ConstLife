import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DailyTasks = () => {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }


    return (
        <div>
            <Calendar
                onChange={onChange}
                onClickDay={(value) => console.log(value)}
                value={value}
            />
        </div>
    );
}

export default DailyTasks