import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Biryani", icon: "🍛" },
    { name: "Drinks", icon: "🥤" }
  ];

  const dishes = [
    {
      name: "Cheese Pizza",
      price: "₹249",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80&auto=format&fit=crop"
    },
    {
      name: "Veg Burger",
      price: "₹149",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80&auto=format&fit=crop"
    },
    {
      name: "Chicken Biryani",
      price: "₹299",
      image:
        "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&q=80&auto=format&fit=crop"
    }
  ];

  const features = [
    {
      title: "Fast Delivery",
      desc: "Get your favorite meals delivered quickly at your doorstep."
    },
    {
      title: "Fresh Food",
      desc: "Prepared with fresh ingredients and packed with care."
    },
    {
      title: "Secure Payment",
      desc: "Pay safely using online payment or cash on delivery."
    }
  ];

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-badge">🚀 Fast Delivery in 30 Minutes</span>

          <h1 className="hero-title">
            Delicious Food,
            <br />
            Delivered Fresh & Fast
          </h1>

          <p className="hero-subtitle">
            Order your favorite meals online with quick delivery, secure
            payment, and a smooth food ordering experience.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/menu")}
            >
              Explore Menu
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          </div>

          <div className="hero-highlights">
            <div className="highlight-card">
              <h3>100+</h3>
              <p>Dishes</p>
            </div>

            <div className="highlight-card">
              <h3>30 Min</h3>
              <p>Delivery</p>
            </div>

            <div className="highlight-card">
              <h3>4.8 ★</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80&auto=format&fit=crop"
              alt="Delicious food"
            />
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          {categories.map((item, index) => (
            <div key={index} className="category-card">
              <span className="category-icon">{item.icon}</span>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="dishes-section">
        <h2 className="section-title">Popular Dishes</h2>
        <div className="dishes-grid">
          {dishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <img src={dish.image} alt={dish.name} />
              <div className="dish-content">
                <h3>{dish.name}</h3>
                <p>{dish.price}</p>
                <button onClick={() => navigate("/menu")}>Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="offer-section">
        <div className="offer-card">
          <h2>Get 20% Off on Your First Order</h2>
          <p>Use code: FOODIE20 and enjoy delicious meals at great prices.</p>
          <button onClick={() => navigate("/menu")}>Claim Offer</button>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h2 className="footer-logo">Foodie</h2>
            <p>
              Delicious food delivered to your doorstep with fast service and
              secure payment options.
            </p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/menu")}>Menu</li>
              <li onClick={() => navigate("/cart")}>Cart</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <p>Email: support@foodie.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Location: Bareilly, India</p>
          </div>

          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Foodie. All rights reserved.
        </div>
      </section>
    </div>
  );
}

export default Home;