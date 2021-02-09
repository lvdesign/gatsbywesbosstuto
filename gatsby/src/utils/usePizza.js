// Hook 
import { useState, useContext } from "react";
import OrderContext from "../components/orderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas,  values}){ // inputs values
// 1 create some state to hold our order
// move to Up to provider too Gatsby-browser
// Now we access both our state and our updater function 

//const [order, setOrder] = useState([]);
// pour acceder en root et persister
const [order, setOrder] = useContext(OrderContext);
const [error, setError]= useState(false);
const [loading, setLoading]= useState(false);
const [message, setMessage]= useState('');


// 2  function add
function addToOrder(orderedPizza){
    setOrder([ ...order, orderedPizza]);
}
// 3 remove things
function removeFromOrder(index){
    setOrder([ 
        ...order.slice(0, index),
        ...order.slice(index + 1 )

    ]);
}

// 3 - When someone submit ORDER
async function submitOrder(e){
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null); //  setError(null);
    //setMessage('gooooooooood  ');

//return;
    // gather all data
    const body = {
        order: attachNamesAndPrices(order, pizzas),
        total: formatMoney(calculateOrderTotal(order,pizzas)),
        name: values.name,
        email: values.email,
        mapleSyrup: values.mapleSyrup,
    };
    console.log( body);

    // 4 - send this data fro checkOUT to serveless
    

    //const res = await fetch(`/.netlify/functions/placeOrder`, 
   // 4. Send this data the a serevrless function when they check out
   //`http://localhost:8000/.netlify/functions/placeOrder`,
   const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body),
    });
    //.then(res => console.log(res));

  const text = JSON.parse(await res.text());
  //const text = await res.text();
  console.log(text);

  // check if everything worked
  if (res.status >= 400 && res.status < 600) {
    setLoading(false); // turn off loading
    setError(text.message);
  } else {
    // it worked!
    setLoading(false);
    setMessage('Success! Come on down for your pizza!');
  }


} //END submit

return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    }
}