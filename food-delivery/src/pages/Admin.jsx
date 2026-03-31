import { useState } from "react";
import API from "../utils/api";
import "./admin.css";

function Admin() {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/foods", formData);

      alert("Food added successfully");

      setFormData({
        name: "",
        price: "",
        image: "",
        category: ""
      });

    } catch (error) {

      alert("Error adding food");

    }
  };

  return (

    <div className="admin-container">

      <h1>Add New Food</h1>

      <form onSubmit={handleSubmit} className="admin-form">

        <input
          type="text"
          name="name"
          placeholder="Food name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <button type="submit">
          Add Food
        </button>

      </form>

    </div>
  );
}

export default Admin;