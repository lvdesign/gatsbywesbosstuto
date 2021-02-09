import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemsStyles from '../styles/MenuItemsStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';


export default function OrderPage({ data }) {
    // data
    const pizzas = data.pizzas.nodes;
    //const [name, setName] = useState('');    
    const { values, updateValue} = useForm({
        name: '',
        email: '',
        mapleSyrup: '' ,       
    });

    // hook Order pizza
    // from usePizza.js 
    const { 
      order, 
      addToOrder, 
      removeFromOrder, 
      error, 
      loading, 
      message, 
      submitOrder,
    } = usePizza({pizzas, values: values});

    console.log(values, updateValue);
    
if(message){
  return <p>{message}</p>;
}
    return (
    <>
        <SEO title="Order Pizza! " />
        
        <OrderStyles onSubmit={submitOrder}>
        
            <fieldset disabled={loading}>
                <legend>Your Info</legend>
                <label htmlFor="name">
                  Name
                <input type="text" name="name" id="name"  
                value={values.name} 
                onChange={ updateValue}                 
                />
                </label>

                <label htmlFor="email">Email
                <input type="email" name="email" id="email" 
                value={values.email} 
                onChange={ updateValue}
                />
                </label>

                
                <input type="mapleSyrup" name="mapleSyrup" id="mapleSyrup" 
                value={values.mapleSyrup} 
                onChange={ updateValue}
                className="mapleSyrup"
                />
                
            </fieldset>



            <fieldset disabled={loading} className="menu">
                <legend>Menu</legend>
                { pizzas.map( (pizza) => (
                    <MenuItemsStyles key={pizza.id}>

                        <Img width="50" height="50"
                        fluid={pizza.image.asset.fluid} alt={pizza.name} 
                        />
                        <div>
                            <h2>{pizza.name}</h2>
                        </div>
                        <div>
                            {['S', 'M', 'L'].map(size => (
                                <button type="button" key={size} 
                                onClick={() => addToOrder({
                                  id: pizza.id,
                                  size, 
                                })}
                                >
                                    {size} { formatMoney(calculatePizzaPrice(pizza.price, size)) } 
                                </button>
                            ))}
                        </div>

                    </MenuItemsStyles>
                ) )}
            </fieldset>

            <fieldset disabled={loading} className="order">
                <legend>Order</legend>
                <PizzaOrder 
                  order={order} 
                  removeFromOrder={ removeFromOrder } 
                  pizzas= {pizzas}
                />
            </fieldset>

            <fieldset disabled={loading}>
                <h3>Your total is { formatMoney(calculateOrderTotal(order, pizzas))} </h3>
                <div>{error ? <p>Error: {error} </p> : ''}
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Order Ahead'}
                </button>
            </fieldset>

            </OrderStyles>
    </>
    )
}

// filter pour Topping with regex
export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

