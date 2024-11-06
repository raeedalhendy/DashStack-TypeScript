import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login.tsx';
import SignUp from './components/auth/SignUp.tsx';
import Home from './Page/HomePage/Home.tsx';
import Products from './Page/HomePage/Products/products.tsx';
import Favorites from './Page/HomePage/Products/Favorites.tsx';
import OrderList from './Page/HomePage/Products/OrderList.tsx';
import { ToastContainer } from 'react-toastify';
import CreateProduct from './Page/HomePage/Products/CreateProduct.tsx';
import EditProduct from './Page/HomePage/Products/EditProduct.tsx';
import { ThemeProvider } from './components/auth/ThemeContext.tsx';
import { SearchProvider } from './components/SearchContext.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: "/Home",
    element: <Home />,
    children : [
    {
      path : "Products",
      element : <Products/>
    },
    {
      path : "Favorites",
      element : <Favorites/>
    },
    {
      path : "OrderLists",
      element : <OrderList/>
    },
    {
      path : "CreateProduct",
      element : <CreateProduct/>
    },
    {
      path : "EditProduct/:id",
      element : <EditProduct/>
    }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer /> 
    <ThemeProvider> 
      <SearchProvider> 
        <RouterProvider router={router} /> \
      </SearchProvider>
    </ThemeProvider>
  </StrictMode>
);
