import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(import.meta.env.VITE_MONGODB_URL, {
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
}
