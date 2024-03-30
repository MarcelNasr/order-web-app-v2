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
import { useParams} from 'react-router-dom';
import api from '../axios/api';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function EditCurrentOrder() {
  const navigate = useNavigate()

  const {id}=useParams("")
  const [data, setData] = useState([]);
  
  const getOrder = async () =>{
   let response;
    try {
      response = await api.get(`/order/getorder/${id}`)
      const orderData = response.data.data;
      setData(orderData)
 
   } catch (error) {
      console.log( error);
   }
    
  };

  useEffect(() => {
    getOrder();
}, []); 


const handleUpdate = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const updatedOrder = {
    order_name: formData.get('order_name'),
    order_id: formData.get('order_id'),
    description: formData.get('description'),
    payment: formData.get('payment') === 'Payed' ? 1 : 0
  };
  try {
    const response = await api.put(`/order/updateorder/${id}`, updatedOrder);
    console.log(response)
      navigate('/orders')
  } catch (error) {
    console.error(error);
  }
};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" key={1} >
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
            Edit Order
          </Typography>
          {(data && data.map((element)=>(
            <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}key={1} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="given-name"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  disabled
                  defaultValue={element.id}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id="order-name"
                  label="Order_Name"
                  name="order_name"
                  autoComplete="order-name"
                  autoFocus
                  defaultValue={element.order_name}

                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="order-id"
                  label="Order_ID"
                  name="order_id"
                  autoComplete="order-id"
                  defaultValue={element.order_id}
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
                  defaultValue={element.description}
                />
              </Grid>
              
              <Grid item xs={12}>
              <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={element.payment === 1?"Payed":"Not Payed"}
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
              Save
            </Button>
          </Box>
          )))}
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}