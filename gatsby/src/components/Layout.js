import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import styled from 'styled-components';

// css 
import 'normalize.css'; // reset
import GlobalStyles from '../styles/GlobalStyles'; //global
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const SiteBorderStyles = styled.div`
    max-width:1000px;
    margin:12rem auto 4rem auto;
    margin-top: clamp(2rem,10vw,12rem);
    background: white url(${stripes});
    background-size:1500px;
    padding: 5px;
    padding:clamp(5px,1vw,25px); /* min, ep, max*/
    box-shadow: 0 0 5px 3px rgba(0,0,0,0.044);
    border:5px solid white;
    @media(max-width:1100px){
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }
`;

const ContentStyles = styled.div`

background: white;
padding: 2rem;

`;

// props => props.children === children
// destructured object
export default function Layout({ children }){
    console.log(children);
    return (
        <>
            <GlobalStyles />
            <Typography />
            <SiteBorderStyles>
                <ContentStyles>

                <Nav />
                
                { children }
                
                <Footer />
                </ContentStyles>
            </SiteBorderStyles>
        </>
    )
}