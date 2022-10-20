import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginView } from "./routes/loginView/LoginView";
import { Navbar } from "./components/navbar/Navbar";
import { HomeView } from "./routes/homeView/HomeView";
import { ProductsView } from "./routes/productsView/ProductsView";
import { UserView } from "./routes/userView/UserView";
import { ErrorView } from "./routes/error/ErrorView";
import { CreatePictureView } from "./routes/createPictureView/CreatePictureView";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/products" element={<Navigate to="/products/all" />} />
      <Route path="/products/:products_id" element={<ProductsView />} />
      <Route path="/create-picture" element={<CreatePictureView />} />
      <Route path="/user" element={<UserView />} />
      <Route path="*" element={<ErrorView />} />
    </Routes>
  </BrowserRouter>
);
