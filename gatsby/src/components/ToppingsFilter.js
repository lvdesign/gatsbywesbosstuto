import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

// STATIC QUERY
// get list all toppings
// get list all pizza
// count how many Pizzas are in each Topping
// loop over the list of Toppings and display it and the count of pizzas in taht Topping
// link
const ToppingsStyles = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1rem;
margin-bottom: 4rem;
a{
    display:grid;
    grid-template-columns: auto 1fr;
    grip-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count{
        background: white;
        padding:2px 5px;
    }
    &.active,
    &[aria-current='page']{
        background: var(--yellow);
    }
}
`;

function countPizzasInToppings(pizzas){
    console.log(pizzas);
    const counts =  pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce( ( accumulateur, topping) => {
        // if exist topping
        //if ok +1
        // or create a new  entry in accumulateur and set to 1
        const existingTopping = accumulateur[topping.id];
        if( existingTopping ){
            existingTopping.count += 1;
        }
        else{
        accumulateur[topping.id] = {
            id: topping.id,
            name: topping.name,
            count: 1,
        };
    }
        return accumulateur;
    }, {});
    // sort them based on their count
    // counts.sort() TypeError: counts.sort is not a function
    const sortedToppings = Object.values(counts)
    .sort((a,b) => b.count - a.count);
    return sortedToppings;
}


// className activeTopping 
export default function ToppingsFilter({ activeTopping }){

const {toppings, pizzas} = useStaticQuery(graphql`
    query {
        toppings:allSanityTopping {
            nodes {
              name
              id
              vegetarian
            }
          }
        pizzas:allSanityPizza {
            nodes {
              toppings {
                name
                id
              }
            }
        }
    }
`);
// name with {toppings:toppings, pizzas:pizzas}
// className -> activeTopping
console.clear();
console.log({toppings, pizzas});
const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
console.log(toppingsWithCounts);

    return (
        <ToppingsStyles>
        <Link to="/pizzas">
            <span className="name">All</span> 
            <span className="count">{pizzas.nodes.length}</span>
        </Link>
        
            { toppingsWithCounts.map( (topping) => (
            
            <Link 
            to={`/topping/${topping.name}`} 
            key={topping.id} 
            className={topping.name === activeTopping ? 'active' : '' }
            >
                <span className="name">{topping.name}</span>
                <span className="count">{topping.count}</span>
            </ Link>           
            ))}
        </ToppingsStyles>       
    );
}