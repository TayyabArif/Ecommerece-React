import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from 'react'
import Dropdown from "../components/Dropdown";
import Products from "../components/Products";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider } from "@material-ui/core";
import { categoryItems, getAllProducts } from '../redux/actions/actions'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

const Prdoucts = () => {
    let myProducts
    let allProducts
    let filterProducts
    let category_id
    let count
    const PER_PAGE = 8;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [click, setClick] = useState(0);
    const [price, setPrice] = useState('');
    const items = useSelector(state => state.getAllProducts.items)
    const loading = useSelector(state => state.getAllProducts.loading)
    const allProductsItems = useSelector(state => state.getAllProducts.allProduct)

    const stableDispatch = useCallback(dispatch, []);
    const paramsData = useParams()
    if (paramsData.category == "AUTO MOBILE") {
        category_id = 18
    }
    else if (paramsData.category == "ELECTRONICS") {
        category_id = 19
    }
    else if (paramsData.category == "KITCHEN ITEMS") {
        category_id = 20
    }
    else {
        category_id = 25
    }
    const handleChange = (event) => {
        const myPrice = event.target.value
        setPrice(event.target.value)
    };
    const handlePaginate = (e, p) => {
        setClick(p)
        setPage(p);
    };
    useEffect(() => {
        stableDispatch(getAllProducts(category_id, page));
    }, [items, stableDispatch, category_id, click])
    if (!loading) {
        if (allProductsItems[0]) {
            count = allProductsItems[0].pages
            myProducts = allProductsItems
        }
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
                    fontSize="2.5rem"
                    fontWeight="90px"
                    fontFamily="Fantasy"
                    color="primary.main"
                >
                    {paramsData.category} Products
                </Typography>
            </Grid>
            <Divider light={true} />
            <Grid container item sx={{ height: "15%", width: "100%", mt: 1 }} justifyContent="space-between" justifyItems="center">
                <Grid container item sx={{ width: "30%" }} justifyContent="space-between" justifyItem="center" alignItems="center">
                    <Typography
                        sx={{ fontFamily: "Fantast", fontSize: "20px", fontWeight: "bold" }}
                    >
                        Filter Products:
                    </Typography>
                    <FormControl sx={{ minWidth: 120, mr: 2 }}>
                        <InputLabel id="demo-simple-select-label">Price</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={price}
                            label="Price"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Low Price Products</MenuItem>
                            <MenuItem value={20}>Medium Price Product</MenuItem>
                            <MenuItem value={30}>High Price Product</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item sx={{ width: "35%", pr: 1 }} justifyContent="space-evenly" justifyItem="center" alignItems="center">
                    <Typography
                        sx={{ fontFamily: "Fantast", fontSize: "20px", fontWeight: "bold" }}
                    >
                        Search Products:
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
            <Grid container item sx={{ height: "65%" }}>
                {allProducts &&
                    <Products loading={loading} myProducts={allProducts} />}
            </Grid>
            <Grid container item sx={{ mt: 2, mb: 1 }} justifyContent="center" alignItems='center'>
                <Pagination
                    count={count}
                    page={page}
                    size="large"
                    color="primary"
                    onChange={handlePaginate}
                />
            </Grid>
        </Grid>
    )
}
export default Prdoucts
