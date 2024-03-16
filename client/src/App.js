import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Orders from "./pages/orders";
import EditOrderPage from "./pages/editorder";
import  NewOrderPage from './pages/neworder'
import { BrowserRouter } from 'react-router-dom';
import { Routes , Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>    
      <Route path="signup" element={<SignUpPage/>}/> 
      <Route path="orders" element={<Orders/>}/>
      <Route path="editorder" element={<EditOrderPage/>}/> 
      <Route path="neworder" element={<NewOrderPage/>}/> 
      <Route path ="*" element ={<div>No Page found</div>}/>
    </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
