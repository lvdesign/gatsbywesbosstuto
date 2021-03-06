import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';



// Style
const PizzaGrid = styled.div` 
display:grid;
grid-gap: 2rem;
grid-template-columns: repeat(auto-fill, minmax(400px,1fr));
`;

// Page
export default function SinglePizzaPage({ data:{pizza}}){
    
return (
    <>
    <SEO title={ pizza.name } />
    <PizzaGrid>    
            <Img fluid={pizza.image.asset.fluid} />
            <div>
                <h2 className="mark"> {pizza.name}</h2>
                <ul>
                {pizza.toppings.map( (topping) => (
                    <li key={topping.id}>{topping.name}</li>
                    ))}
                </ul>
            </div>
    </PizzaGrid>
    </>
);
}

// Query
// template pour dynamic
// from gatsby-node.js et le context
export const query = graphql`

    query($slug: String!) {
        pizza: sanityPizza(slug:{current: { eq: $slug } }){
            name
            id
            image {
                asset{
                    fluid(maxWidth:800){
                        ...GatsbySanityImageFluid
                    }
                }
            }
            toppings {
                name
                id
                vegetarian
            }
        }        
    }
`;