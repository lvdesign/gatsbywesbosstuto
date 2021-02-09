import { useState } from 'react';

// Hook custum
export default function useForm(defaults){
    const[values, setValues] = useState(defaults);

    function updateValue(e){
        // check if number and convert
        let value = e.target.value;
        if(e.target.type === 'number'){
            value = parseInt(e.target.value);
        }

     
        setValues({
            // copy existing value
            ...values,
            // Updates
            [e.target.name]: value,
        })
    }
    return { values, updateValue}
}