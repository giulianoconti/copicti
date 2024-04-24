/* global process */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const painting = await Painting.findOne({ _id: id });

    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    res.json(painting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
