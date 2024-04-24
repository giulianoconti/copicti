import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { AccessIfLogged, AccessIfYouAreAdmin, Navbar, Footer } from "src/components";
import { ScrollToTop } from "./utils/ScrollToTop";
import "./index.css";

const HomeView = lazy(() => import("./routes/Home"));
const LoginView = lazy(() => import("./routes/Login"));
const ProductsView = lazy(() => import("./routes/Products"));
const ProductView = lazy(() => import("./routes/Product"));
const CreatePicture = lazy(() => import("./routes/CreatePicture"));
const Contact = lazy(() => import("./routes/Contact"));
const MyCart = lazy(() => import("./routes/MyCart"));
const AdminProducts = lazy(() => import("./routes/AdminProducts"));
const AdminUsers = lazy(() => import("./routes/AdminUsers"));

export const Navigation = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div className="main"></div>}>
          <div className="main">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/products" element={<ProductsView />} />
              <Route path="/products?categories=:categoriesIds" element={<ProductsView />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/create-picture" element={<CreatePicture />} />
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
                  <AccessIfYouAreAdmin>
                    <AdminProducts />
                  </AccessIfYouAreAdmin>
                }
              />
              <Route
                path="/admin/products/:distributionId"
                element={
                  <AccessIfYouAreAdmin>
                    <AdminProducts />
                  </AccessIfYouAreAdmin>
                }
              />
              <Route
                path="/admin/products/:distributionId/:sizeId"
                element={
                  <AccessIfYouAreAdmin>
                    <AdminProducts />
                  </AccessIfYouAreAdmin>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AccessIfYouAreAdmin>
                    <AdminUsers />
                  </AccessIfYouAreAdmin>
                }
              />
              <Route
                path="/admin/users/:userEmail"
                element={
                  <AccessIfYouAreAdmin>
                    <AdminUsers />
                  </AccessIfYouAreAdmin>
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
          </div>
        </Suspense>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};
