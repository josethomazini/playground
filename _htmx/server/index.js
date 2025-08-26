import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/get", (req, res) => {
  res.send("GET result!");
});

app.post("/post", (req, res) => {
  res.send("POST result!");
});

app.put("/put", (req, res) => {
  res.send("PUT result!");
});

app.delete("/delete", (req, res) => {
  res.send("DELETE result!");
});

app.patch("/patch", (req, res) => {
  res.send("PATCH result!");
});

app.get("/trigger", (req, res) => {
  res.send(`You've typed: ${req.query.q}`);
});

app.get("/once", (req, res) => {
  const date = new Date();
  res.send(date.toISOString());
});

app.get("/random_name", (req, res) => {
  const names = ["John", "Paul", "Ringo", "George"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  res.send(randomName);
});

app.get("/random_color", (req, res) => {
  const colors = ["Red", "Green", "Blue"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  res.send(randomColor);
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
