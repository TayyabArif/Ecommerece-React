import React from 'react'
import { useEffect } from 'react';
import DropDown from './MyDropDown';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, categoryItems } from '../redux/actions/actions'
const AddImagesForm = () => {
  const form = useRef();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState("")
  const categories = useSelector(state => state.categoriesItem.categories)
  const [images, setImages] = useState({});
  const onImageChange = (e) => {
    setImages(e.target.files)
  }
  const handleCategoryChange = (data) => {
    setCategory_id(data);
  };
  useEffect(() => {
    dispatch(categoryItems());
  }, [images])
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()
    const imagesArray = Object.values(images).map(image => {
      return image
    })
    for (let image = 0; image < imagesArray.length; image++) {
      const element = imagesArray[image]
      formData.append("images[]", element)
    }
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("category_id", category_id)
    dispatch(addProduct(formData))
    form.current.reset();
    navigate('/')
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          boxShadow: 5,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <ControlPointIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add your Product
        </Typography>
        <Box component="form" ref={form} onSubmit={handleSubmit}>
          <Grid item >
            <label>Select your Profile Picture: </label>
            <input type="file" multiple name="file" accept="image/*" required onChange={onImageChange} />
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            required
            id="Title"
            label="Title"
            name={title}
            autoComplete="Title"
            type="text"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name={description}
            label="Description"
            type="text"
            id="description"
            autoComplete="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <DropDown data={categories} name={"Select Category"} handleChange={handleCategoryChange} />
          <TextField
            margin="normal"
            fullWidth
            required
            name={price}
            label="Price"
            type="number"
            id="price"
            autoComplete="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
export default AddImagesForm
