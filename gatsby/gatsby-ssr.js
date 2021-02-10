import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

// Gatsby Server Rendering APIs
// Wrap the site Page
export function wrapPageElement({element, props}){
return <Layout {...props}>{ element }</Layout>
}


export function wrapRootElement({element}){
    return <OrderProvider>{element}</OrderProvider>
}

/*
https://www.gatsbyjs.com/docs/ssr-apis/

Called after every page Gatsby server renders while building HTML so you can replace head components to be rendered in your html.js. This is useful if you need to reorder scripts or styles added by other plugins.

*/