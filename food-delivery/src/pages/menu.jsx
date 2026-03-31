import { useEffect, useState } from "react";
import API from "../utils/api";
import FoodCard from "../components/FoodCard.jsx";
import "./menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get("/foods");
        setFoods(res.data);
      } catch (error) {
        console.log("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu">
      <input
        type="text"
        placeholder="Search food..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default Menu;