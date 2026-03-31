import axios from "axios";

const API = axios.create({
  baseURL: "https://food-mbma.onrender.com/api"
});

export default API;