import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import products from "../data/products.js";   // shared seed data

export const ensureSeedData = async () => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      // 1. Create or reuse default category
      let category = await Category.findOne({ name: "Default Category" });

      if (!category) {
        category = await Category.create({
          name: "Default Category",
          slug: "default-category",
        });
      }

      // 2. Attach category id to each product
      const productsWithCategory = products.map((p) => ({
        ...p,
        category: category._id,
      }));
      
      // 3. Insert
      await Product.insertMany(productsWithCategory);
      console.log("Auto-seeded default products");
    } else {
      console.log(`Products already present: ${count}, skipping auto-seed`);
    }
  } catch (err) {
    console.error("Error in ensureSeedData:", err.message);
  }
};
