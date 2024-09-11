import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100vw;
    height: 100vh;
    background: url(https://images.unsplash.com/photo-1530789253388-582c481c54b0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D) center/cover no-repeat #000;
    
    padding-top:30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    color: #FFFFFF; /* Ensure this is visible on the image */
`;

const Banner = () => {
    return (
        <Image>
            <Heading>Tell your Tale</Heading>
            <SubHeading>Blog Here...</SubHeading>
        </Image>
    );
}

export default Banner;
