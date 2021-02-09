import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.developement' });

export default {
    siteMetadata:{
        title: `slicks-slices-lv`,
        siteUrl: 'https://gatsby.pizza',
        description: 'slicks-slices-lv…',
        twitter: '@toto'
        
    },
    
    plugins:[        
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',        
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'br1ozvkl',
                dataset:'production',
                watchMode: true, 
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
}


/*
Bien mettre a jour Sanity avec la shema

This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
// npm install gatsby-plugin-styled-components
 // this name project ID de slicks-slices-lv
            // production (public)
*/