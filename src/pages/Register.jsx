import { Box, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import LoginHeader from "../components/LoginHeader";
import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const LinkC = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Containerm = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: rgba(255,255,255, 0.5);
    border-radius: 50px;
    border: 3px solid;
    border-color: #9CA3DB;
    `
const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Aggrement = styled.p`
    font-size: 12px;
    margin: 20px 0px;
`
function Register() {
    const dispatch = useDispatch();
    const form = useRef();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userData = useSelector(state => state.registerUserReducer.users);
    const [avatar, setAvatar] = useState();
    const [myAlert, setMyAlert] = useState(false);
    const isLoading = useSelector(state => state.registerUserReducer.loading)
    const isSignup = useSelector(state => state.registerUserReducer.signup)
    const tokenData = localStorage.getItem('register')

    const onImageChange = (e) => {
        setAvatar(e.target.files[0]);
    }
    useEffect(() => {
        if (!isLoading) {
            if (tokenData) {
                navigate('/confirmation')
            }
            else {
                navigate('/register')
                setMyAlert(true)
                console.log("Enter complete information")
            }
        }
    }, [userData]);
    const handleChange = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("user[name]", name)
        formData.append("user[surname]", surname)
        formData.append("user[email]", email)
        formData.append("user[password]", password)
        formData.append("user[avatar]", avatar)
        dispatch(signup(formData))
        form.current.reset();
    }
    return (
        <div>
            {!isSignup && !isLoading ?
                <Box sx={{ display: 'flex', height: '100vh' }} justifyContent='center' alignItems="center">
                    <CircularProgress />
                </Box>
                :
                <Containerm>
                    <Wrapper>
                        <LoginHeader name="Register" />
                        <Form ref={form} onSubmit={handleChange}>
                            <Grid container direction='column' sx={{ height: "100%", width: "100%" }}>
                                <Grid container item sx={{ height: "25%" }} justifyContent=" space-between">
                                    <TextField
                                        margin="normal"
                                        required
                                        id="fname"
                                        label="First name"
                                        name={name}
                                        autoComplete="fname"
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        id="lname"
                                        label="Last name"
                                        name={surname}
                                        autoComplete="lname"
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                </Grid>
                                <Grid container item sx={{ height: "25%" }} >
                                    <TextField
                                        margin="normal"
                                        required
                                        id="email"
                                        label="email"
                                        name={email}
                                        autoComplete="email"
                                        type="email"
                                        autoFocus
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid container item sx={{ height: "25%" }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        id="password"
                                        label="password"
                                        name={password}
                                        autoComplete="password"
                                        type="password"
                                        autoFocus
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{ height: "25%" }}>
                                    <label>Select your Profile Picture: </label>
                                    <input type="file" name="file" accept="image/*" onChange={onImageChange} required />
                                </Grid>
                            </Grid>
                            <Aggrement>
                                By creating an account, I consent to the processing of my personal
                                data in accordance with the <b>PRIVACY POLICY</b>
                            </Aggrement>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                        </Form>
                        {!isSignup &&
                            <Alert severity="error">Signup for Free to Get Amazing features</Alert>
                        }
                        <LinkC href="/login">Already Have Account?</LinkC>
                    </Wrapper>
                </Containerm>
            }
        </div>
    )
}

export default Register
