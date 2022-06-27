const express = require('express');
const Product = require('../../models/E-commerceModels/ProductModels');

const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE PRODUCT
productRouter.post("/addProduct", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCT
productRouter.delete("/deleteProduct/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json("Product deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT
productRouter.put("/updateProduct/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BY ID
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all products (search)
// productRouter.get("/", asyncHandler(
//     async (req, res) => {
//         const keyword = req.query.keyword
//             ? {
//                 name: {
//                     $regex: req.query.keyword,
//                     $options: "i",
//                 },
//             }
//             : {};
//         const products = await Product.find({ ...keyword });
//         res.json(products);
//     }
// ));

// //GET product by id
// productRouter.get("/:id", asyncHandler(
//     async (req, res) => {
//         const product = await Product.findById(req.params.id);
//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404);
//             throw new Error("Product not found");
//         }

//     }
// ));

// //PRODUCT REVIEW
// productRouter.post("/:id/review", protect, asyncHandler(
//     async (req, res) => {
//         const { rating, comment } = req.body;
//         const product = await Product.findById(req.params.id);
//         if (product) {
//             const alreadyReviewed = product.reviews.find(
//                 (r) => r.user.toString() === req.user._id.toString()
//             );
//             if (alreadyReviewed) {
//                 res.status(400);
//                 throw new Error("Product already Reviewed");
//             }
//             const review = {
//                 name: req.user.name,
//                 rating: Number(rating),
//                 comment,
//                 user: req.user._id,
//             };
//             product.reviews.push(review);
//             product.numReviews = product.reviews.length;
//             product.rating =
//                 product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//                 product.reviews.length;

//             await product.save();
//             res.status(201).json({ message: "Reviewed Added" });
//         } else {
//             res.status(404);
//             throw new Error("Product not found");
//         }

//     }
// ));


module.exports = productRouter;