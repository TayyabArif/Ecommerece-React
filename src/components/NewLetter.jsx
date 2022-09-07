import React from 'react'
import styled from 'styled-components'
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useRef } from 'react';
import { Grid } from '@mui/material'
import emailjs from "@emailjs/browser";

const Container = styled.div`
  height: 100vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`
function Newletter() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_lgzv4dc",
        "template_i7ueqt5",
        form.current,
        "2wdIrcE7gk92ACzHz"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    form.current.reset();
  };
  return (
    <Grid container direction="column" sx={{ height: "100%", width: "100%", backgroundColor: "#fcf5f5" }} alignItems="center">
      <Title>Newsletter</Title>
      <Desc>Give us your reviews Timely! About our Products</Desc>
      <Box component="form" marginTop="6vh" onSubmit={sendEmail} ref={form}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="user_name"
          label="name"
          type="name"
          id="name"
          autoComplete="Full Name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          fullWidth
          multiline
          required
          name="message"
          aria-label="minimum height"
          minRows={3}
          placeholder="Message"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </Grid>
  )
}
export default Newletter
