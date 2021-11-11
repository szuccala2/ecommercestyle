import * as React from 'react';
import styled from 'styled-components';

const BoxDiv = styled.div`
    background-color: darkgray;
    text-align: right;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 25px;
    box-sizing: border-box;
`;

const Link = styled.a`
    color: blue;
    text-decoration: none;
    margin: 0;
    padding: 0;
`;
  
const Footer: React.FC = () => {
    return (
        <BoxDiv>
            <Link href='https://static.wikia.nocookie.net/5ef5d627-c162-4309-ab47-e09f6b411883'>
                TWITTER</Link> | 
            <Link href='https://i.pinimg.com/originals/d8/90/92/d890923215813484bdc0f9544aeca1a9.gif'>
                FACEBOOK</Link>
        </BoxDiv>
    );
}

export default Footer;