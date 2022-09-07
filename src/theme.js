import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light', 
    primary: {
      main: '#26547C',
    },
    secondary: {
      main: '#9CA3DB',
    },
    danger: {
        main: '#FF5D73',
      },
    success: {
        main: '#0CCE6B'
    },
    divider: '#512e33',
  },
});

export default theme;