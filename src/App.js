import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import Cart from "./components/Cart";

function App() {
  const [cartCount, setCartCount] = React.useState(0);
  React.useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCartCount(updatedCart.length);
  }, []);
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <>
              <Home cartCount={cartCount} setCartCount={setCartCount}  />
              <Cart cartCount={cartCount} setCartCount={setCartCount}  />
            </>
          }
        />
        
        <Route
          path="/product/:productId"
          element={
            <>
              <ProductPage cartCount={cartCount} setCartCount={setCartCount} />
              <Cart cartCount={cartCount} setCartCount={setCartCount}  />
            </>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
