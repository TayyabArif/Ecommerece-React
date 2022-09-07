import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import LoginHeader from "../components/LoginHeader";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

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
    background-color: rgba(255,255,255, 0.6);
    border-radius: 50px;
    border: 3px solid;
    border-color: #9CA3DB;
    `
const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
function SignupConfirmation() {
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault()
        navigate('/login')
    }
    return (
        <div>
            <Containerm>
                <Wrapper>
                    <LoginHeader name="Confirmation" />
                    <Form onSubmit={handleChange}>
                        <Grid container direction='column' sx={{ height: "50vh", width: "100%" }} justifyContent='center' justifyItems='center'>
                            <Grid container item sx={{ height: "25%" }} justifyContent=" space-between">
                                <Typography>
                                    <Alert severity="info">Please check your email And confirm before Proceed to the login! You are unable to login if you don't confirm your email</Alert>
                                </Typography>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, ml: 20, width: '30vh' }}
                            >
                                Ok
                            </Button>
                        </Grid>
                    </Form>
                </Wrapper>
            </Containerm>
        </div>
    )
}
export default SignupConfirmation
