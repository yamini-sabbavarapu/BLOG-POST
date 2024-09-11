import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, Select, MenuItem } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  padding: '10px 100px 10px 60px',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}));

const Image = styled('img')({
  width: '60%',
  height: '50vh',
  objectFit: 'cover',
  margin: '0 auto', 
  display: 'block',
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  align-items:center;
  flex-direction: row;
`;

const StyledButton = styled(Button)`
  margin: 20px auto 0; 
  display: block; 
  width: fit-content;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 80%;
  border: 1px solid transparent; /* Initial border */
  border-radius: 5px;
  margin-top: 50px;
  font-size: 18px;
  padding-bottom: 10px; 
  transition: border-color 0.3s ease; /* Smooth transition for border color */

  &:hover {
    border-color: #010101; /* Border color on hover */
  }

  &:focus-visible {
    outline: none;
    border-color: #010101; /* Border color on focus */
  }
`;
const StyledInputTextField= styled(InputTextField)`
border: 1px solid transparent; /* Initial border */
  border-radius: 5px;
  transition: border-color 0.3s ease; /* Smooth transition for border color */

  &:hover {
    border-color: #010101; /* Border color on hover */
  }

  &:focus-visible {
    outline: none;
    border-color: #010101; /* Border color on focus */
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '', // Removed categories from here
  createdDate: new Date()
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useContext(DataContext);

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category

  const url = post.picture ? post.picture :  'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJsb2d8ZW58MHx8MHx8fDA%3D';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        setPost({ ...post, picture: response.data });
      }
    }
    getImage();
    setPost({ ...post, categories: location.search?.split('=')[1] || 'All' });
    setPost({ ...post, username: account.username });
  }, [file])

  const savePost = async () => {
    await API.createPost(post);
    navigate('/');
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPost({ ...post, categories: e.target.value });
  }

  const categories = ['All', 'Music', 'Movies', 'Sports', 'Tech', 'fashion']; // Replace with your actual categories

  return (
    <Container>
       
      <Image src={url} alt="post" />
      
     <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <StyledInputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
        
        {/* Dropdown for categories */}
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ minWidth: '80px' ,height: '35px'}}
        >
          {categories.map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>

        
      </StyledFormControl>

      <Textarea
        rowsMin={5}
        style={{ minHeight: '40px'}}
        placeholder="Tell your story..."
        name='description'
        onChange={(e) => handleChange(e)}
      />
      <StyledButton onClick={() => savePost()} variant="contained" color="primary">Publish</StyledButton>
    </Container>
  )
}

export default CreatePost;
