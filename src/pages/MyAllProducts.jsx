import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from 'react'
import Products from "../components/Products";
import { Divider } from "@material-ui/core";
import { getMyProducts } from '../redux/actions/actions'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const MyAllProducts = () => {
    let myProducts
    let allProducts
    let filterProducts
    const dispatch = useDispatch()
    const myAllProducts = useSelector(state => state.myAllProducts.myProducts)
    const loading = useSelector(state => state.myAllProducts.loading)
    const items = useSelector(state => state.myAllProducts.items)
    const stableDispatch = useCallback(dispatch, []);
    const [name, setName] = React.useState("");
    useEffect(() => {
        if (!items) {
            stableDispatch(getMyProducts());
        }
    }, [items, stableDispatch])
    if (!loading) {
        myProducts = myAllProducts
    }

    if (name == '') {
        allProducts = myProducts
    }
    else {
        filterProducts = myProducts.filter(
            data => {
                return (
                    data.title.toLowerCase().includes(name.toLowerCase())
                )
            }
        );
        allProducts = filterProducts
    }
    return (
        <Grid container direction="column" sx={{ height: "100%", width: "100%" }} backgroundColor='#F2F4F4'>
            <Grid container item sx={{ height: "20%" }} justifyContent="center" justifyItems="center">
                <Typography
                    variant="h2"
                    fontSize="2rem"
                    fontWeight="90px"
                    fontFamily="Fantasy"
                    color="primary.main"
                >
                    My Products
                </Typography>
            </Grid>
            <Divider light={true} />
            <Grid container item sx={{ height: "15%", width: "100%", mt: 1, pl: 3 }} justifyContent="space-between" justifyItems="center">
                <Grid container item sx={{ width: "100%" }} justifyItem="center" alignItems="center">
                    <Typography
                        sx={{ fontFamily: "Fantast", fontSize: "20px", fontWeight: "bold", pr: 3, color: 'primary.main' }}
                    >
                        Search your Products:
                    </Typography>
                    <TextField
                        id="outlined-name"
                        label={<SearchIcon />}
                        value={name}
                        placeholder="Enter Product Name"
                        type="text"
                        inputProps={{ style: { fontSize: 15 } }}
                        onChange={e => setName(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container item sx={{ height: "65%", width: '100%' }}>
                <Products loading={loading} myProducts={allProducts} />
            </Grid>

        </Grid>
    )
}
export default MyAllProducts
