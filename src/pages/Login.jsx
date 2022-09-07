import styled from "styled-components";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoginHeader from "../components/LoginHeader";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { login } from "../redux/actions/actions";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: rgba(255,255,255, 0.5);
    border-radius: 50px;
    border: 3px solid;
    border-color: #9CA3DB;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const LinkC = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
function LogIn() {
    const form = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userToken = localStorage.getItem('token')
    const userData = useSelector(state => state.userReducer.user)
    const isLogin = useSelector(state => state.userReducer.isLogin)
    const isLoading = useSelector(state => state.userReducer.loading)
    const getLogin = useSelector(state => state.userReducer.getLogin)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify({ user: { email, password } })
        dispatch(login(data));
        form.current.reset();
    };
    useEffect(() => {
        if (!isLoading) {
            if (userToken) navigate('/')
            else {
                navigate('/login')
            }
        }
    }, [userData]);

    return (
        <div>
            {(isLogin && isLoading) ?
                <Box sx={{ display: 'flex', height: '100vh' }} justifyContent='center' alignItems="center">
                    <CircularProgress />
                </Box>
                :
                <Container>
                    <Wrapper>
                        <LoginHeader name="Sign In" />
                        <Form ref={form} onSubmit={handleSubmit}>
                            <Grid container direction='column' sx={{ height: "100%", width: "100%" }}>
                                <Grid item sx={{ height: "50%" }} >
                                    {(!isLogin && isLoading && !getLogin) &&
                                        <Alert severity="error">Your Email or Password is wrong</Alert>}
                                    <TextField
                                        margin="normal"
                                        required
                                        id="email"
                                        label="email"
                                        name={email}
                                        autoComplete="email"
                                        type="email"
                                        variant="outlined"
                                        autoFocus
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{ height: "50%" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        sx={{ width: "100%" }}
                                        id="password"
                                        label="password"
                                        name={password}
                                        autoComplete="password"
                                        type="password"
                                        autoFocus
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <LinkC href=''>FORGET PASSWORD?</LinkC>
                            <Grid container justifyContent='space-between'>
                                <Grid>
                                    <LinkC href="/register">CREATE A NEW ACCOUNT</LinkC>
                                </Grid>
                                <Grid>
                                    <LinkC href="/">Go Back to Home</LinkC>
                                </Grid>
                            </Grid>
                        </Form>
                    </Wrapper>
                </Container>
            }
        </div>
    )
}
export default LogIn
