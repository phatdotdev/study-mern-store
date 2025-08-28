import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";

// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

// Admin
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/User/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/Orders/Order.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" index={true} element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/user-orders" element={<UserOrder />} />
      </Route>

      {/* admin routes */}
      <Route path="admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categoryList" element={<CategoryList />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="allproducts" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
    <ToastContainer position="top-right" className="bg-black" />
  </Provider>
);
