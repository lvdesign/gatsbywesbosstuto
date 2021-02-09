import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInputs';


export default {
    //Computer name
    name: 'pizza',
    // visible title
    title: 'Pizzas',
    type: 'document',
    icon: icon ,
    fields:[
        {
        name:'name',
        title:'Pizza name',
        type:'string',
        description: 'Name of pizzaaaaaa'
        },
        {
            name:'slug',
            slug:'Pizza name',
            type:'slug',
            options:{
                source:'name',
                maxLength: 100
            }            
        },
        {
            name:'image',
            slug:'Image',
            type:'image',
            options:{
                hotspot:true,
            }            
        },
        {
            name:'price',
            title:'Price',
            type:'number',
            
            description: 'Price of pizza in cents',
            validation: Rule => Rule.min(1000).max(50000), 
            // todo custopm componenet 
            inputComponent: PriceInput,       
        },
        {
            name:'toppings',
            title:'Toppings',
            type: 'array',
            of: [{ type: 'reference', to:[{type: 'topping'}] }],
             
        },
    ],
    preview:{
        select:{
            title: 'name',
            media: 'image',
            topping0:'toppings.0.name', 
            topping1:'toppings.1.name',
            topping2:'toppings.2.name',
            topping3:'toppings.3.name',
        },
        prepare: ({title, media, ...toppings}) => {
            //console.log(title, media, ...toppings);
            // filter undefined topping
            const tops = Object.values(toppings).filter(Boolean);
            // preview
            //title: `${title} ${media} ${toppings}`,
            return {
                title,
                media,
                subtitle: tops.join(', '),
                };
            },
        }
};