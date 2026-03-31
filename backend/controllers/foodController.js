import Food from "../models/Food.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const food = await Food.create({
      name,
      price,
      image,
      category
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};