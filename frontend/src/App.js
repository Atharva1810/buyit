import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        {/* Added two router after id to make id optional in the cart route below */}
        {/* Need to do this because the optional router '?' is not supported in react-router-dom v6 */}
        <Route path="/cart/" element={<CartScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        {/* List all products */}
        <Route path="/" element={<HomeScreen />} />

        {/* <main className="py-3"> */}
        {/* <HomeScreen /> */}
        {/* </main> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
