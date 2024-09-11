import React, { useState, useEffect } from 'react';
import { styled, Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Container = styled(Box)`
    position: relative;
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    &:hover {
        transform: scale(1.05);
        z-index: 1;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
});

const TextOverlay = styled(Box)`
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Text = styled(Typography)`
    font-size: 14px;
`;

const LikeButton = styled(IconButton)`
    position: absolute;
    top: 200px;
    left: 110px;
    z-index: 2;
    cursor: pointer;
`;

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Load the liked state from local storage
        const storedLiked = localStorage.getItem(`liked-${post._id}`);
        if (storedLiked !== null) {
            setLiked(JSON.parse(storedLiked));
        }
    }, [post._id]);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJsb2d8ZW58MHx8MHx8fDA%3D';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

    const handleLikeClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const newLikedState = !liked;
        setLiked(newLikedState);
        localStorage.setItem(`liked-${post._id}`, JSON.stringify(newLikedState));
    }

    return (
        <Container>
            <Image src={url} alt="post" />
            <TextOverlay>
                <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
                {/* <Text>{new Date(post.createdDate).toDateString()}</Text> */}
            </TextOverlay>
            <LikeButton onClick={handleLikeClick}>
                <FavoriteIcon style={{ color: liked ? 'red' : '#f2f2f2' }} />
            </LikeButton>
        </Container>
    );
}

export default Post;
