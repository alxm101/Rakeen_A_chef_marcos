const express = require("express");
const app = express();

const menu = [
  { id: 1, dish: "Baked Shrimp Scampi", price: 20 },
  { id: 2, dish: "Chicken Parmigiana", price: 14 },
  { id: 3, dish: "Margherita Pizza", price: 17 },
  { id: 4, dish: "Penne with Vodka Sauce", price: 18 }
];

// Home
app.get("/", (req, res) => {
  res.send("Welcome to Chef Marco's Italian Bistro!");
});

// All menu items
app.get("/menu", (req, res) => {
  res.json(menu);
});

// Single menu item by ID
app.get("/menu/:menuItem", (req, res) => {
  const id = parseInt(req.params.menuItem);
  const item = menu.find(dish => dish.id === id);
  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }
  res.json(item);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
