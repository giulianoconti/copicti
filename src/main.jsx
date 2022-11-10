import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { HomeView } from "./routes/homeView/HomeView";
import { ProductsView } from "./routes/productsView/ProductsView";
import { CreatePictureView } from "./routes/createPictureView/CreatePictureView";
import { Contact } from "./routes/contact/Contact";
import { MyCart } from "./routes/myCart/MyCart";
import { LoginView } from "./routes/loginView/LoginView";
import { AuthProvider } from "./context/authContext";
import { AdminProducts } from "./routes/admin/AdminProducts";
import { AccessIfLogged } from "./components/protectedRoutes/AccessIfLogged";
import "./index.css";
import { AccessIfYouAreAdmin } from "./components/protectedRoutes/AccessIfYouAreAdmin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/products" element={<Navigate to="/products/all" />} />
        <Route path="/products/:products_id" element={<ProductsView />} />
        <Route path="/create-picture" element={<CreatePictureView />} />
        <Route path="/create-picture/:distributionId" element={<CreatePictureView />} />
        <Route path="/create-picture/:distributionId/:sizeId" element={<CreatePictureView />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/my-cart"
          element={
            <AccessIfLogged>
              <MyCart />
            </AccessIfLogged>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AccessIfLogged>
              <AccessIfYouAreAdmin>
                <AdminProducts />
              </AccessIfYouAreAdmin>
            </AccessIfLogged>
          }
        />
        <Route
          path="*"
          element={
            <AccessIfLogged>
              <Navigate to="/" />
            </AccessIfLogged>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
