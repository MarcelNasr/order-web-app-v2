import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import OrdersData from '../components/orderDummydata.json'
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { useState, useEffect} from 'react';



export default function OrdersForm() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const getOrders = async () => {
    try {
        const  response = await api.get("/order/getorders");
        const  ordersData= response;
        setData(ordersData.data.data);
        console.log(response)
    } catch (error) {
        // Handle errors
        console.log(error)
    }
};

// Use useEffect to call getJuries when the component is first mounted
useEffect(() => {
    getOrders();
}, []); // The empty dependency array makes this run once on component mount

  const handleDelete = async(orderId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`);
    if (isConfirmed) {
      // console.log(`Order ${orderId} deleted`);
      // Perform delete action here with orderId
      try {
        const response = await api.delete(`/order/deleteorder/${orderId}`)
        
          console.log(response.data.message)
          window.location.reload();
      
      } catch (error) {
        
      }
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key={1}>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Order_Name</TableCell>
            <TableCell align="center">Order_ID</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {(data &&  data.map((element) => (
            <TableRow
              key={element.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {element.id}
              </TableCell>
              <TableCell align="center">{element.order_name}</TableCell>
              <TableCell align="center">{element.order_id}</TableCell>
              <TableCell align="center">{element.description}</TableCell>
              <TableCell align="center">{element.payment?"Payed":"Not Payed"}</TableCell>
              <TableCell align="center">
                <Button  variant="contained" color="primary" onClick={() => navigate(`/editorder/${element.id}`)}>
                  Edit
                </Button>
                </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary"  onClick={() => handleDelete(element.id)}>
                  Delete
                </Button>
                </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}