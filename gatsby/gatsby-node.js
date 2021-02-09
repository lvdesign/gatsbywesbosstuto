import path,{ resolve } from 'path';
import fetch from 'isomorphic-fetch';



// PIZZA page
async function turnPizzasIntoPages({ graphql, actions}){
    // get a template for 
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    //query all pizzas
    const { data } = await graphql(`
    query{
        pizzas: allSanityPizza{
            nodes {
                name
                slug{
                    current
                }
            }
        }
    }
    `);
    // console.log(data);
    // loop over
    data.pizzas.nodes.forEach( pizza => {
        console.log('creating page for ', pizza.name);
        actions.createPage({
            // url
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        }
        )
    })
}

// Topping page
async function turnToppingsIntoPages({ graphql, actions}){
// template mais page de pizza.js
const toppingTemplate = path.resolve('./src/pages/pizzas.js');
// query all Topping


const { data } = await graphql(`
    query{
        toppings: allSanityTopping {
            nodes {
              name
              id
            }
          }
    }
    `);

// loop over
data.toppings.nodes.forEach( topping => {
    console.log('creating page for Topping : ', topping.name);

    actions.createPage({
        // url
        path: `topping/${topping.name}`,
        component: toppingTemplate,
        context: {
            topping:topping.name,
            toppingRegex: `/${topping.name}/i`, // regex for find the name of topping
        },

    });
});
//
}



// slicemasters PAGE
async function turnSlicemastersIntoPages({ graphql, actions }){
// 1 query slicemasters
const { data } = await graphql(`
 query{
     slicemasters: allSanityPerson{
         totalCount
         nodes{
             name
             id
             slug{
                current
             }
         }
     }
 }
`);

// 2 to page slice to Slicematers
data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });


// 3 figure how many pages/ number
const pageSize = 4; //process.env.GATSBY_PAGE_SIZE);
const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
console.log(`There always are ${data.slicemasters.totalCount} total people and we have ${pageCount} pages with ${pageSize} per page.`);

// 4 loop from 1 to n pages over
Array.from({ length: pageCount}).forEach((_, i) => {
console.log(`Creating page ${i}`);

actions.createPage({
    path:`/slicemasters/${i + 1}`,
    component: path.resolve('./src/pages/slicemasters.js'),
    // data pass to the template
    context: { 
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
        },
    });
});
}

// BEER
/*
query MyQuery {
  allBeer {
    nodes {
      name
      rating {
        reviews
        average
      }
    }
  }
}
*/
async function fetchBeersAndTurnIntoNodes({
    actions, 
    createNodeId,
    createContentDigest,
}){
    console.log('Turn Beers into NODES');
    // 1-fetch beers https://sampleapis.com/beers
    const res = await fetch('https://api.sampleapis.com/beers/ale');
    const beers = await res.json();
    // ok console.log('Turn Beers into BEERS', beers);
    // loop 
    //2-beers.forEach
    for(const beer of beers){
        // node create for each beer
        //const nodeContent = JSON.stringify(beer);
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
              type: 'Beer',
              mediaType: 'application/json',
              contentDigest: createContentDigest(beer),
            },
          };
    // 3. Create a node for that beer
    actions.createNode({
        ...beer,
        ...nodeMeta,
    });
    }
}
export async function sourceNodes(params){
// fetch list of beers res
    await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

//
export async function createPages(params){

    // creat page dynami
    // pizzas, Toppings
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params),
    ]);
}
