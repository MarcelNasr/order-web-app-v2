import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import OrdersData from '../components/orderDummydata.json'
import { useNavigate } from 'react-router-dom';



export default function OrdersForm() {
  const navigate = useNavigate()

  const handleDelete = (orderId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`);
    if (isConfirmed) {
      console.log(`Order ${orderId} deleted`);
      // Perform delete action here with orderId
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {OrdersData.map((OrdersData) => (
            <TableRow
              key={OrdersData.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {OrdersData.id}
              </TableCell>
              <TableCell align="center">{OrdersData.order_name}</TableCell>
              <TableCell align="center">{OrdersData.order_id}</TableCell>
              <TableCell align="center">{OrdersData.description}</TableCell>
              <TableCell align="center">{OrdersData.payment?"Paid":"Not Paid"}</TableCell>
              <TableCell align="center">
                <Button  variant="contained" color="primary" onClick={() => navigate('/editorder')}>
                  Edit
                </Button>
                </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary"  onClick={() => handleDelete(OrdersData.id)}>
                  Delete
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}