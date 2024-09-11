// import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
// import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';


// const Component = styled(AppBar)`
//     background: #FFFFFF;
//     color: black;
// `;

// const Container = styled(Toolbar)`
//     justify-content: center;
//     & > a {
//         padding: 20px;
//         color: #000;
//         text-decoration: none;
//     }
// `

// const Header = () => {

//     const navigate = useNavigate();

//     const logout = async () => navigate('/account');
        
//     return (
//         <Component>
//             <Container>
//                 <Link to='/'>HOME</Link>
//                 <Link to='/about'>ABOUT</Link>
//                 <Link to='/contact'>CONTACT</Link>
//                 <Link to='/account'>LOGOUT</Link>
//             </Container>
//         </Component>
//     )
// }

// export default Header;
import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button, Menu, MenuItem } from '@mui/material'; 
import { Link, useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #000;
    color: black;
`;
const StyledButton=styled(Button)`
font-size: 16px;
`;
const Container = styled(Toolbar)`
    justify-content: center;
    & > a, & > div > button {
        padding: 20px;
        color: #FFFFFF;
        text-decoration: none;
    }
    & > div {
        padding: 5px 10px 5px 20px;
        color: #000;
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (path) => {
        navigate(path);
        handleClose();
    };

    const logout = async () => navigate('/account');

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <div>
                    <StyledButton 
                        aria-controls="categories-menu" 
                        aria-haspopup="true" 
                        onClick={handleClick}
                    >
                        CATEGORIES
                    </StyledButton>
                    <Menu
                        id="categories-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                       
                        <MenuItem onClick={() => handleMenuClick('/?category=Music')}>Music</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/?category=Tech')}>Tech</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/?category=Sports')}>Sports</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/?category=Movies')}>Movies</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/?category=Fashion')}>Fashion</MenuItem>
                    </Menu>
                </div>
                <Link to='/account' onClick={logout}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;
