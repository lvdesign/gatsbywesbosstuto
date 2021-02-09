import React from 'react';
import MenuItemsStyles from '../styles/MenuItemsStyles';
import Img from 'gatsby-image';

import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

// key={`${singleOrder.id}-${index}`} pour eviter id doublon grace a index pour size
export default function PizzaOrder( {
    order,
    pizzas, 
    removeFromOrder
    }) {
        return (
        <> 
        {order.map( (singleOrder, index) => {
            const pizza = pizzas.find( pizza=>pizza.id === singleOrder.id);
            return (
            <MenuItemsStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} ></Img>
                <h2>{singleOrder.id}</h2>
                <p>
                    {formatMoney( calculatePizzaPrice(pizza.price, singleOrder.size))}
                </p>
                <button 
                type="button"                 
                className="remove" 
                title={`Remove ${singleOrder.size} ${pizza.name} from order. `}
                onClick={ () => removeFromOrder(index )}                
                >
                    &times;
                </button>
            </MenuItemsStyles>  
            );
        } )}
        </>
        );
    }