import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { AuthContext } from "../context/Authcontext.jsx";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{display:"flex",gap:"20px",padding:"20px",background:"#222",color:"#fff",alignItems:"center"}}>
      <h2>Foodie</h2>

      <Link to="/" style={{color:"white"}}>Home</Link>
      <Link to="/menu" style={{color:"white"}}>Menu</Link>
      <Link to="/cart" style={{color:"white"}}>
        Cart ({totalItems})
      </Link>

      {user ? (
        <>
          <span style={{marginLeft:"auto"}}>Hi, {user.name}</span>
          <button
            onClick={logout}
            style={{
              padding:"8px 12px",
              border:"none",
              background:"#ff4d4d",
              color:"white",
              borderRadius:"5px",
              cursor:"pointer"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div style={{display:"flex",gap:"15px",marginLeft:"auto"}}>
          <Link to="/login" style={{color:"white"}}>Login</Link>
          <Link to="/register" style={{color:"white"}}>Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;