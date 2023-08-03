import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// importing pages
import ProductListing from "./pages/product/ProuductListing";
import PageError from "./pages/404/PageError";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Productdetails from "./pages/product/ProductDetails";
import AddProduct from "./pages/product/AddProduct";
import UpdateProduct from "./pages/product/UpdateProduct";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<ProductListing />} />
          <Route path="/product-details/:id" element={<Productdetails />} />
          {/* AUTHENTICATION ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* PROTECTED ROUTES */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      {/* USING THE TOASTIFY CONTAINER */}
      <ToastContainer />
    </div>
  );
}

export default App;
