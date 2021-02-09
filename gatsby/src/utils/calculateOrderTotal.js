import calculatePizzaPrice from "./calculatePizzaPrice";

export default function calculateOrderTotal( order, pizzas){

    // 1 loop each order

    return order.reduce((runningTotal, singleOrder) => {

        const pizza = pizzas.find( singlePizza => singlePizza.id === singleOrder.id );

        return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size)

    }, 0)
    // 2 total
    //return total;
    // 3 add to total
 
}