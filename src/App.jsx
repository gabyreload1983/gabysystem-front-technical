import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import MyOrders from "./pages/Orders/MyOrders";
import Pending from "./pages/Orders/Pending";
import InProcess from "./pages/Orders/inProcess";
import OrdersLayout from "./components/OrdersLayout";
import Layout from "./components/Layout";
import UserContextProvider from "./context/userContext";
import OrderDetail from "./pages/Orders/OrderDetail";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />

            <Route path="orders" element={<OrdersLayout />}>
              <Route path="pending/:sector" element={<Pending />} />
              <Route path="in-process" element={<InProcess />} />
              <Route path="technical/:codeTechnical" element={<MyOrders />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
