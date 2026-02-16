import { category as Category } from "../model/Category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
      });
    }

    const newCategory = await Category.create({ name, description, image });
    return res.status(201).json({
      message: "Category created successfully",
      success: true,
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      message: "Categories fetched successfully",
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { categoryid } = req.params;
    const foundCategory = await Category.findById(categoryid);
    if (!foundCategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      success: true,
      data: foundCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryid } = req.params;
    const { name, description, image } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryid,
      { name, description, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryid } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryid);
    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
