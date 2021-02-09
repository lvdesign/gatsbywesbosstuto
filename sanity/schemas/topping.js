import { FaPepperHot as icon } from 'react-icons/fa'


export default {
    //Computer name
    name: 'topping',
    // visible title
    title: 'Toppings',
    type: 'document',
    icon: icon ,
    fields:[
        {
        name:'name',
        title:'Topping name',
        type:'string',
        description: 'What is the name of the topping?'
        },
        {
            name:'vegetarian',
            title:'Vegetarian',
            type:'boolean',
            options:{
                layout:'checkbox',
            }
        },
    ],
    preview:{
        select:{
            name: 'name',
            vegetarian: 'vegetarian'
        },
        prepare: ({name,vegetarian}) => ({
            title: `${name} ${vegetarian ? '🌱'  : ''}`,
        }) 
    }


};