import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Container= styled.div`
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-arround;
`
function Products({loading, myProducts}) {
    return (
        <div>
        {loading ? 
         <Box sx={{ display: 'flex', height: '100vh' , width: '100%', ml: 50}} justifyContent='center' alignItems="center">
         <CircularProgress />
        </Box>
        :
        <Container>
            {myProducts.map((item)=>
                <Product item={item} key={item.id}/>
            )}
        </Container>
         }
        </div>
    )
}
export default Products
