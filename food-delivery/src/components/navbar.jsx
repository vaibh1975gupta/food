import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/Cartcontext";
import { AuthContext } from "../context/Authcontext.jsx";
import "./navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Foodie</h2>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        <Link to="/cart" onClick={closeMenu}>
          Cart ({totalItems})
        </Link>

        {user ? (
          <div className="nav-user-section">
            <span className="user-text">Hi, {user.name}</span>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" onClick={closeMenu}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;