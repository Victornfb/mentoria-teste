import express, { Request } from "express";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

// Get all users
app.get("/users", (req: Request, res) => {
  try {
    throw Error("Unexpected error");
    res.json(users);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      code: "ABC123",
      message: err.message,
    });
  }
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(400).json({
      code: "USER_NOT_FOUND",
      message: "Usuário não encontrado",
    });
  res.json(user);
});

// Create a new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  res.json(user);
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

console.log("teste");

throw new Error();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
