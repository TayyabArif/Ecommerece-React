import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function DropDown({ data, name, handleChange }) {
  const [childData, setChildData] = React.useState('');
  const handleChangeDrop = (event) => {
    setChildData(event.target.value)
    handleChange(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          margin="normal"
          value={childData}
          label="Age"
          onChange={handleChangeDrop}
        >
          {data.map((dropdata) => (
            <MenuItem value={dropdata.id}>
              {dropdata.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );


}


