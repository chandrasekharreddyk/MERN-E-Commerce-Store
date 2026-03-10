import express from "express";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import products from "../data/products.js";   // shared seed data

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

    // 3. Insert sample products, attaching the category id
    /*const productsWithCategory = products.map((p) => ({
      ...p,
      category: category._id,
    }));

    const created = await Product.insertMany(productsWithCategory);*/

    res.json({
      message: "Seeded products successfully",
      category,
      products: created,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});

/*router.get("/seed", async (req, res) => {
  await Product.deleteMany({});
  const created = await Product.insertMany(products);
  res.json({ message: "Seeded products successfully", products: created });
});*/

export default router;
