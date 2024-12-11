"use client";
import React, { useState } from 'react';

function Page() {
   const oneUproPrice = 0.0122001 
    // const planDurations = [90, 180, 365, 730, 1825];
    const planDurations = [{
        duration:90,
        percentage:1,
        amount:50
    },{
        duration:180,
        percentage:1.5,
        amount:100
    },{
        duration:365,
        percentage:2,
        amount:150
    },{
        duration:730,
        percentage:2.5,
        amount:200
    },{
        duration:1825,
        percentage:3,
        amount:250
    }
];


    const [selectedPlan, setSelectedPlan] = useState(planDurations[0].duration);
    const [typedValue, setTypedValue] = useState('');


    // Convert days to either months or years
    const formatDuration = (days) => {
        if (days >= 365) {
            const years = days / 365;
            return `${years} Year${years > 1 ? 's' : ''}`;
        } else {
            const months = Math.round(days / 30);
            return `${months} Month${months > 1 ? 's' : ''}`;
        }
    };

    const handlePlanChange = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div>
            <div>
                {/* Display tabs */}
                {planDurations.map((data, index) => (
                    <button
                        key={index}
                        onClick={() => handlePlanChange(data.duration)}
                        style={{
                            margin: '5px',
                            padding: '10px',
                            border: selectedPlan === data.duration ? '2px solid blue' : '1px solid gray'
                        }}
                    >
                        {formatDuration(data.duration)}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <label htmlFor="planDuration">Plan Duration (days):</label>
                <input
                    id="planDuration"
                    type="number"
                    value={typedValue}
                    onChange={(e)=>setTypedValue(e.target.value)}
         
                />
            </div>
        </div>
    );
}

export default Page;
