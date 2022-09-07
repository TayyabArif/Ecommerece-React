import React from "react";
import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Footer from "../pages/Footer";
import { Divider } from "@material-ui/core";
import Announcement from "../components/Announcement";

const Main = ({ children }) => {
  return (
    <Grid container direction="column" spacing={1} >
      <Grid item flex={2} sx={{ height: "20%" }}>
        <Header />
      </Grid>
      <Grid item flex={2} sx={{ height: "10%" }}>
        <Announcement />
      </Grid>
      <Grid item flex={8} sx={{ height: "50%", width: "100%" }}>
        {children}
      </Grid>
      <Grid item flex={1} sx={{ height: '20%' }}>
        <Divider light={true} />
        <Footer />
      </Grid>
    </Grid>
  );
};
export default Main;