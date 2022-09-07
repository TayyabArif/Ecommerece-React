import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, MenuItem, TextField, Grid, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myItems } from '../redux/actions/actions';
import styled from 'styled-components'
import { Typography } from '@mui/material';

const Image = styled.img`
    width: 30%;
    height: 10vh;
    z-index: 2;
    border-radius: 10px;
    box-shadow: 4px 4px 4px #888888;
    &:hover{
      opacity: 0.8;
      border-radius: 20px;
    }
`
export default function ShoppingCart() {
  const dispatch = useDispatch()
  const orderItems = useSelector(state => state.myItem.item)
  const myLoading = useSelector(state => state.myItem.loading)
  useEffect(() => {
    dispatch(myItems())
  }, [])
  return (
    <div>
      {myLoading ?
        <Box sx={{ display: 'flex', height: '100vh' }} justifyContent='center' alignItems="center">
          <CircularProgress />
        </Box> :
        <Box display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          alignContent="center"
          backgroundColor='#F2F4F4'
          sx={{ height: "100%" }}>
          <Grid container item sx={{ height: '30%' }} justifyContent="center" justifyItems="center">
            <Typography
              variant="h2"
              fontSize="2rem"
              fontWeight="100px"
              fontFamily="Fantasy"
              color="primary.main"
              align="center"
              gutterBottom
              justifySelf="center"
              width="100%"
            >
              Your Shopping Cart
            </Typography>
          </Grid>
          <Card sx={{ maxWidth: "70%", minWidth: "70%", height: '60%', borderRadius: "50px", border: "3px solid #FF5D73", background: '#F8F9F9' }}>
            <Box sx={{ margin: "20px" }}>
              <CardContent>
                {orderItems ?
                  orderItems.map((item, index) => (
                    <Grid>
                      <Grid container direction="row" sx={{ p: 1, width: "100%" }} justifyContent="space-between" alignItems="center">
                        <Grid container item sx={{ width: "100%", }} justifyContent="space-between" alignItems="center">
                          <Grid container item sx={{ width: "35%", height: '10vh' }}>
                            <Image src={item.product.images[0]} alt='no image' />
                          </Grid >
                          <Grid container item sx={{ width: "35%" }}>
                            {item.quantity == 1 ?
                              <Grid container item alignItems='center'>
                                <Typography sx={{ mr: 1 }}
                                  variant="h2"
                                  fontSize="1.5rem"
                                  fontWeight="90px"
                                  fontFamily="Fantasy"
                                  color="primary.light"
                                >{item.quantity}</Typography>
                                <Typography
                                  variant="h2"
                                  fontSize="1.8rem"
                                  fontWeight="4px"
                                  fontFamily="Fantasy"
                                  fontStyle='italic'
                                  color="#FF5D73"
                                >{item.product.title}</Typography>
                              </Grid>
                              :
                              <Grid container item alignItems='center'>
                                <Typography sx={{ mr: 1 }}
                                  variant="h2"
                                  fontSize="1.5rem"
                                  fontWeight="90px"
                                  fontFamily="Fantasy"
                                  color="primary.light"
                                >{item.quantity}</Typography>
                                <Typography
                                  variant="h2"
                                  fontSize="1.8rem"
                                  fontWeight="40px"
                                  fontStyle='italic'
                                  fontFamily="Fantasy"
                                  color="#FF5D73"  >{item.product.title}s</Typography>
                              </Grid>
                            }
                          </Grid>

                          <Grid item sx={{ width: "20%", }}>
                            <Typography
                              variant="h2"
                              fontSize="1.5rem"
                              fontWeight="90px"
                              fontFamily="Fantasy"
                              fontStyle="italic"
                              color="primary.light">Price: ${item.line_total}</Typography>
                          </Grid>

                        </Grid>
                      </Grid>
                      <Divider light={true} />
                    </Grid>
                  ))
                  : ''}
                <Grid container item sx={{ mt: 2 }} justifyContent='center' alignItems='center'>
                  {orderItems &&
                    <Typography
                      variant="h2"
                      fontSize="2rem"
                      fontWeight="700"
                      fontFamily="Fantasy"
                      color="primary.light"
                    >Total price: ${orderItems[0].order.total}</Typography>}
                </Grid>
              </CardContent>
            </Box>
          </Card>
        </Box>
      }
    </div>
  );
}

