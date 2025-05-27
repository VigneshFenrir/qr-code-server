import mongoose from "mongoose";
import ProductModel from "../model/product.model.js";

const controller = {};
controller.createProduct = async (req, res) => {
  const { productName, color, price } = req.body;

  if (!productName || !color || !price) {
    return res.status(400).json({ error: "please fill all the inputs" });
  }

  const newProduct = new ProductModel({ productName, price, color });
  await newProduct.save();

  return res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Product created successfully",
    qrData: newProduct.id,
  });
};
controller.getProduct = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id not found" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Qr" });
  }
  const product = await ProductModel.findById(id).select("-v ");
  if (!product) {
    return res.status(400).json({ error: "Invalid Qr" });
  }

  return res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Product Data Collected successfully",
    qrData: product,
  });
};
controller.getProducts = async (req, res) => {
  const product = await ProductModel.find().select("-v ");

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Product Data Collected successfully",
    productData: product,
  });
};
controller.deleteProduct = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Id not found" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID NOT FOUND" });
  }
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      error: "failed to delete",
    });
  }
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Product Deleted successfully",
    productData: product,
  });
};

export default controller;
