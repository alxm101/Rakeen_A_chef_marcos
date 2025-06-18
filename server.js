const express = require("express");
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Global menu data
const menu = [
  { id: 1, dish: "Baked Shrimp Scampi", price: 20 },
  { id: 2, dish: "Chicken Parmigiana", price: 14 },
  { id: 3, dish: "Margherita Pizza", price: 17 },
  { id: 4, dish: "Penne with Vodka Sauce", price: 18 }
];

// Middleware
function requireChefRole(req, res, next) {
  const role = req.headers.role;

  if (role !== "chef") {
    return res.status(401).send("Only chefs can access this!");
  }

  next(); // User is allowed
}

app.get("/", (req, res) => {
  res.send("Welcome to Chef Marco's Italian Bistro!");
});

// Menu
app.get("/menu", (req, res) => {
  const maxPrice = parseFloat(req.query.maxPrice);

  if (!maxPrice) {
    return res.json(menu);
  }

  const filteredMenu = menu.filter(item => item.price <= maxPrice);

  if (filteredMenu.length === 0) {
    return res.status(404).json({ error: "No menu items found at or below that price." });
  }

  res.json(filteredMenu);
});

// Single menu item
app.get("/menu/:menuItem", (req, res) => {
  const id = parseInt(req.params.menuItem);
  const item = menu.find(dish => dish.id === id);

  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  res.json(item);
});

// POST route
app.post("/reservations", (req, res) => {
  const { name, date, time } = req.body;

  if (!name || !date || !time) {
    return res.status(400).send("Missing name, date, or time");
  }

  res
    .status(201)
    .send(`${name}, thank you for reserving at Chef Marco’s Restaurant on ${date} at ${time}! Your reservation is confirmed`);
});

// Protected secret recipe route
app.get("/chef/secret-recipe", requireChefRole, (req, res) => {
  res.json({
    secretRecipe: "Secret Sauce: Butter, garlic, parmesan!"
  });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
