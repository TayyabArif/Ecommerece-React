import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import { defaultPicture } from "../data";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: all 0.5s ease;
  cursor: pointer; 
`
const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
max-width: 350px;
height: 300px;
display: flex;
flex-direction: column;
flex-wrap: no-wrap;
align-items: center;
justify-content: center;
margin-right: 40px;
border-radius: 20px;
background-color: #85C1E9;
position: relative;
&:hover ${Info}{
  opacity: 2;
}
`
const Image = styled.img`
    border-radius: 15px;
    width: 100%;
    height: 100%;
    z-index: 2;
`
function Product({ item }) {
  const navigate = useNavigate()
  return (
    <Container>
      <Grid container sx={{ height: "100%" }}>
        <Grid container item sx={{ height: "80%" }}>
          {item.images[0] ?
            <Image src={item.images[0]} /> :
            <Image src={defaultPicture.img} />}
          <Info>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              Show
            </Button>
          </Info>
        </Grid>
        <Grid container item sx={{ height: "20%", m: 1, color: "white" }} alignItems="center" justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight="bold"
            fontFamily="Fantasy"
          >{item.title}</Typography>
          <Typography
          >$ {item.price}</Typography>
        </Grid>
      </Grid>
    </Container>


  )
}
export default Product
