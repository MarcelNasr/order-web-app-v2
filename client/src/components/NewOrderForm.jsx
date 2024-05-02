import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function NewOrderForm() {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const order = {
      orderName: data.get("orderName"),
      orderId: data.get("orderId"),
      description: data.get("description"),
      payment: data.get("payment")==="Payed"?1:0
    };
    try {
      const result = await api.post("/order/addorder",order);
      console.log(result)
      navigate('/orders')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Order
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="given-name"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  disabled
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="order-name"
                  label="Order_Name"
                  name="orderName"
                  autoComplete="order-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  fullWidth
                  id="order-id"
                  label="Order_ID"
                  name="orderId"
                  autoComplete="order-id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="description"
                />
              </Grid>
              
              <Grid item xs={12}>
              <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="payment"
            >
                <FormControlLabel value="Payed" control={<Radio />} label="Payed" />
                <FormControlLabel value="Not Payed" control={<Radio />} label="Not Payed" />
            </RadioGroup>
    </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Order
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}