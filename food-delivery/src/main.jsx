import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CartProvider from "./context/Cartcontext";
import AuthProvider from "./context/Authcontext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);