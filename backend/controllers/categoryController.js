import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    const category = await new Category({ name }).save();
    return res.status(201).json(category);

    console.log(name);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export const updateCategoryById = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
    }
    category.name = name;
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export const removeCategoryById = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
    }
    await Category.deleteOne({ _id: categoryId });
    return res.status(200).json({ message: "Category removed." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});
