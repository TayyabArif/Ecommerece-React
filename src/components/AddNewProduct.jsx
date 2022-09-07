import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import AddImagesForm from './AddImagesForm';
import CancelIcon from '@mui/icons-material/Cancel';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} sx={{
        color: "#5AAEF9", border: "solid 1px #00524e",
        borderRadius: "50px"
      }}>Add A new Product</Button>
      <Grid sx={{ mt: 1 }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} style={{ width: "40%", height: "100%" }} overflow="auto">
              <CancelIcon
                type="submit"
                variant="contained"
                sx={{ ml: 50, alignItems: "flex-end", color: 'primary.main' }}
                onClick={handleClose}
              >
              </CancelIcon>
              <AddImagesForm />
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </div>
  );
}
