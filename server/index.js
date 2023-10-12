require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./ConnectDB");
const Notes = require("./Models/Notes");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

//GET All Notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An Error has occured while fetching notes!");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error has occured" });
  }
});

//GET Note by Id
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("An Error has occured while fetching note!");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error has occured" });
  }
});

//POST  create Note 
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An Error has occured while creating note!");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error has occured" });
  }
});

//PUT  update Note 
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteId, {title, description});
    if (!data) {
      throw new Error("An Error has occured while updating note!");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error has occured" });
  }
});


//DELETE  delete Note 
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    
    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("An Error has occured while deleting note!");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error has occured" });
  }
});



app.get("/", (req, res) => {
  res.json("Hello world");
});



app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
