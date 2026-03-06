import express from "express";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const router = express.Router();

// GET /api/products/seed
router.get("/seed", async (req, res) => {
  try {
    // 1. Create (or reuse) a default category
    let category = await Category.findOne({ name: "Default Category" });

    if (!category) {
      category = await Category.create({
        name: "Default Category",
        slug: "default-category",
      });
    }

    // 2. Optional: clear old products in dev
    await Product.deleteMany({});

    // 3. Insert sample products
    const products = await Product.insertMany([
      {
        name: "Sample Product 1",
        image: "/images/sample1.jpg", // you can change later
        brand: "Sample Brand",
        quantity: 10,
        category: category._id,
        description: "Sample product 1 description",
        price: 999,
        countInStock: 20,
      },
      {
        name: "Sample Product 2",
        image: "/images/sample2.jpg",
        brand: "Sample Brand",
        quantity: 5,
        category: category._id,
        description: "Sample product 2 description",
        price: 1499,
        countInStock: 15,
      },
    ]);

    res.json({
      message: "Seeded products successfully",
      category,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});

export default router;
