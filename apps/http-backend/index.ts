import express from "express";
import { prismaClient } from "@repo/db/client"; // Importing the db client

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the HTTP backend!");
});

app.get("/users", async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.json(users);
});

app.get("/todos", async (req, res) => {
  const users = await prismaClient.todo.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await prismaClient.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(201).json(newUser);
});

app.listen(8080, () => {
  console.log("HTTP server is running on port 8080");
});
