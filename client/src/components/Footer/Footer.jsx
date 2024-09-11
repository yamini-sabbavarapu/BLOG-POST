import React from 'react';
import { styled } from '@mui/material';

const FooterContainer = styled('div')`
    background: #f1f1f1;
    padding: 20px;
    text-align: center;
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height:
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </FooterContainer>
    );
}

export default Footer;
