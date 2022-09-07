import { ThemeProvider } from '@mui/system';
import theme from './theme'
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import Register from './pages/Register';
import LogIn from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Prdoucts'
import Product from './pages/Product';
import ShoppingCart from './pages/ShoopingCart';
import { useState } from 'react';
import SignupConfirmation from './pages/SignupConfirmation';
import MyAllProducts from './pages/MyAllProducts';
import Oauthtest from './components/Oauth';
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='register' element={<Register />} />
          <Route path="login" element={<LogIn />} />
          <Route path="confirmation" element={<SignupConfirmation />} />
          <Route path='/' element={<Main>
            <Home />
          </Main>} />
          <Route path='products/:category' element={<Main>
            <Products />
          </Main>} />
          <Route path='product/:id' element={<Main>
            <Product />
          </Main>} />
          <Route path='shoppingcart' element={<Main>
            <ShoppingCart />
          </Main>} />
          <Route path='myproducts' element={<Main>
            <MyAllProducts />
          </Main>} />
          <Route path='otuhtest' element={
            <Oauthtest />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
export default App;
