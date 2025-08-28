import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });
      case !description:
        return res.json({ error: "Description is required." });
      case !price:
        return res.json({ error: "Price is required." });
      case !category:
        return res.json({ error: "Category is required." });
      case !quantity:
        return res.json({ error: "Quantity is required." });
      case !brand:
        return res.json({ error: "Brand is required." });
      case !image:
        return res.json({ error: "Image is required." });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export const updateProductDetails = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required." });
      case !description:
        return res.json({ error: "Description is required." });
      case !price:
        return res.json({ error: "Price is required." });
      case !category:
        return res.json({ error: "Category is required." });
      case !quantity:
        return res.json({ error: "Quantity is required." });
      case !brand:
        return res.json({ error: "Brand is required." });
      case !image:
        return res.json({ error: "Image is required." });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

export const removeProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

export const fetchProducts = asyncHandler(async (req, res, next) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword }, $option: "i" }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

export const fetchProductById = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found." });
  }
});

export const fetchAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error." });
  }
});

export const addProductReview = asyncHandler(async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReview = product.reviews.find(
        (rw) => rw.user.toString() === req.user._id.toString()
      );
      if (alreadyReview) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

export const fetchTopProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export const fetchNewProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createAt: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export const filterProducts = asyncHandler(async (req, res, next) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
