import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { Grid } from "@mui/material";
import Comments from "../components/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { lineItem, order, product } from "../redux/actions/actions";
import Carousel from 'better-react-carousel'
import { useState, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { defaultPicture } from "../data";
import Alert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';

const Wrapper = styled.div`
    padding: 50px;
    height: 50%
    display: flex;
`
const ImgContainer = styled.div`
    flex: 1;
    width: 50vw;
    height: 50vh;
`
const Image = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    height: 50%
    padding: 0px ;
`
const Title = styled.h1`
font-weight: 70px;
font-size: 40px;
font-family: Serif;
margin: 0px;
`
const Desc = styled.p`
    margin: 10px 0px;
    font-size: 20px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
    font-family: Serif;

`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    margin: 20px 0px;
    align-items: center;
    justify-content: space-between;
`
const AmmounContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
`
const Ammount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Buttons = styled.button`
    padding: 15px;
    border: 2px solid teal;
    border-radius: 10px;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 900;
    font-size: 15px;
    &:hover{
        background-color: #82E0AA;
    }
`
function Product() {
    const navigate = useNavigate();
    const productId = useParams()
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(false);
    const token = localStorage.getItem('token');
    const [quantity, setQuantity] = useState(0);
    const userName = localStorage.getItem('user');
    const myProduct = useSelector(state => state.products.product)
    const userOrder = useSelector(state => state.myOrder.order)
    const orderLoaded = useSelector(state => state.myOrder.orderLoaded)
    const loading = useSelector(state => state.products.loading)
    const addSuccess = useSelector(state => state.myItem.addSuccess)
    useEffect(() => {
        if (productId && productId !== "") dispatch(product(productId));
        if (!loading) {

        }
    }, [productId])
    const handleClose = () => {
        setAlert(false)
    }
    const handleClick = () => {
        if (token) {
            const product_id = myProduct.id
            if (!orderLoaded) {
                const address = "This is my address"
                const data1 = JSON.stringify({ order: { address } })
                dispatch(order(data1))
            }
            if (orderLoaded) {
                const data2 = JSON.stringify({ line_item: { quantity, product_id } })
                dispatch(lineItem(data2))
            }
        }
        else {
            navigate('/login')
        }
    }
    const addClick = (e) => {
        setQuantity(quantity + 1)
        setAlert(true)
    }
    const removeClick = (e) => {
        setQuantity(quantity - 1)
        setAlert(true)
    }
    return (
        <Grid container>
            {loading ?
                <Box sx={{ display: 'flex', height: '100vh', width: '100%', }} justifyContent='center' alignItems="center">
                    <CircularProgress />
                </Box> :
                <Grid container item direction="column" sx={{ height: "100%", width: "100%" }}>
                    <Grid container item sx={{ height: "50%", width: "100%", p: '50px' }} justifyContent='space-between' alignItems='center'>
                        {alert &&
                            <Grid container item sx={{ width: "100%", height: "20%", bgcolor: '#f5fafd' }} justifyContent='center'>
                                <Grid container item alignItems="center" justifyContent='center'>
                                    <Alert severity="success">Your cart is Updated successfully</Alert>
                                    <CancelIcon
                                        type="submit"
                                        variant="contained"
                                        sx={{ alignItems: "flex-end", color: 'danger.main' }}
                                        onClick={handleClose}
                                    >
                                    </CancelIcon>
                                </Grid>
                            </Grid>
                        }
                        {myProduct ?
                            <Grid container item sx={{ height: "50%", width: "50%" }}>
                                {myProduct.images[0] ?
                                    <Carousel cols={1} rows={1} gap={10} isActive loop>
                                        <Carousel.Item>
                                            <img width="100%" height="100%" src={myProduct.images[0]} />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img width="100%" height="100%" src={myProduct.images[1]} />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img width="100%" height="100%" src={myProduct.images[2]} />
                                        </Carousel.Item>
                                    </Carousel>
                                    :
                                    <Carousel cols={1} rows={1} gap={10} isActive loop>
                                        <Carousel.Item>
                                            <img width="100%" height="100%" src={defaultPicture.img} />
                                        </Carousel.Item>
                                    </Carousel>
                                }
                            </Grid>
                            : 'no image'}
                        <Grid container item direction="column" sx={{ height: "100%", width: "40%" }}>
                            <div>Title: <Title>{myProduct.title}</Title></div>
                            <Desc>
                                {myProduct.description}
                            </Desc>
                            <Price>Price:  ${myProduct.price}</Price>
                            {!(myProduct.user.name == userName) &&
                                <AddContainer>
                                    <AmmounContainer>
                                        <Add onClick={addClick} />
                                        <Ammount>{quantity}</Ammount>
                                        {quantity > 0 &&
                                            <Remove onClick={removeClick} />}
                                    </AmmounContainer>
                                    {quantity > 0 ?
                                        <Buttons onClick={handleClick}>Add to Cart</Buttons> :
                                        <Button variant="contained" disabled>Add to Cart</Button>
                                    }

                                </AddContainer>
                            }
                        </Grid>
                    </Grid>
                    <Grid container item sx={{ height: "50%", width: "100%" }}>
                        <Comments />
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

export default Product
