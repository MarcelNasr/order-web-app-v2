import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function OrderNavBar() {
    const navigate = useNavigate()

  return (
    <Stack spacing={2} direction="row" sx={{ mt: 3, mb:3  }}>
      <Button variant="contained" onClick={() => navigate('/neworder')} >New Order</Button>
    </Stack>
  );
}