import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AddProduct from './Component/addProduct';
import UpdateProduct from './Component/updateProduct';
import Login from './Component/login';
import Register from './Component/register';
import Protected from './Component/Protected';
import ProductList from './Component/ProductList';
import SearchComponent from './Component/SearchComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/addproduct' element={<Protected cmp={AddProduct} />} />
        <Route path='/update/:id' element={<Protected cmp={UpdateProduct} />} />
        <Route path='/search' element={<Protected cmp={SearchComponent} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Protected cmp={ProductList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;