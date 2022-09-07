import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dropdown = () => {
    const [price, setPrice] = React.useState('');

    const handleChange = (event) => {
      setPrice(event.target.value);
    };
    return (
        <FormControl sx={{minWidth: 120, mr: 2}}>
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
    )
}

export default Dropdown
