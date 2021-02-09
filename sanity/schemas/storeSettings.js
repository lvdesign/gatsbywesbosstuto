import { MdStore as icon } from 'react-icons/md';


export default {
    //Computer name
    name: 'storeSettings',
    // visible title
    title: 'Settings',
    type: 'document',
    icon,
    fields:[
        {
            name:'name',
            title:'Store name',
            type:'string',
            description: 'Name of Store pizza'
        },
       {
           name: 'slicemaster',
           title:'Slicemasters Currently Slicing',
           type: 'array',
           of: [ 
               {type: 'reference', to:[{type:'person'}] }
            ],
       },
       {
        name: 'hotSlices',
        title:'Hot Slices Available in the case',
        type: 'array',
        of: [ 
            {type: 'reference', to:[{type:'pizza'}] }
        ],
        },
    ],
   
};