/* global process */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const paintingSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    description: String,
    price: Number,
    date: Date,
    image: String,
    categories: [String],
  },
  { versionKey: false }
);

const Painting = mongoose.model("Painting", paintingSchema, "paintings");

app.use(cors());
app.use(express.json());

app.get("/paintings", async (req, res) => {
  const { categories, page = 1, limit = 18 } = req.query;
  let query = {};

  if (categories) {
    query.categories = { $in: categories.split(",") };
  }

  const paintings = await Painting.find(query)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const count = await Painting.countDocuments(query);

  res.json({
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    paintings,
  });
});

app.get("/paintings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const painting = await Painting.findOne({ _id: id });

    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    res.json(painting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
