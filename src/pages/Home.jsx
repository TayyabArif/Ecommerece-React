import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Newletter from '../components/NewLetter'
import TransitionsModal from "../components/AddNewProduct";
import Alert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
const Home = () => {
    const token = localStorage.getItem('token')
    const [alert, setAlert] = useState(false)
    const handleClose = () => {
        setAlert(true)
    }
    return (
        <Grid container sx={{ height: "100%", width: "100%" }}>
            {token &&
                <Grid container item direction='column' sx={{ width: "100%", height: "15%", bgcolor: '#f5fafd' }} justifyContent='space-around'>
                    {!alert &&
                        <Grid container item sx={{ width: "100%", height: "20%", bgcolor: '#f5fafd' }} justifyContent='center'>
                            <Grid container item alignItems="center" justifyContent='center'>
                                <Alert severity="success">You are LoggIn in now</Alert>
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

                    <Grid container item sx={{ width: "100%", height: "80%", bgcolor: '#f5fafd' }} justifyContent='space-around'>
                        <Grid>
                            <Typography
                                variant="h2"
                                fontSize="2rem"
                                fontWeight="50px"
                                fontFamily="Fantasy"
                                color="Black"
                            >
                                Add Your Product
                            </Typography>
                        </Grid>
                        <Grid>
                            <TransitionsModal />
                        </Grid>
                    </Grid>
                </Grid>
            }
            <Grid item sx={{ width: "100%", height: "40%" }}>
                <Slider />
            </Grid>
            <Grid item sx={{ width: "100%", height: "20%" }}>
                <Categories />
            </Grid>
            <Grid item sx={{ width: "100%", height: "25%" }}>
                <Newletter />
            </Grid>

        </Grid>
    )
}

export default Home
