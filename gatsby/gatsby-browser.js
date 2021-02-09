import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/orderContext';

// Wrap the site Page
export function wrapPageElement({element, props}){
    return <Layout {...props}>{ element }</Layout>
}

export function wrapRootElement({element}){
    return <OrderProvider>{element}</OrderProvider>
}

