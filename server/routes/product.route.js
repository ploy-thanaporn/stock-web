import express from "express";
import Product from "../model/Product.js";

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    // find all database = Product Schema
    const products = await Product.find();
    console.log(products);
    res.json(products);
  } catch (error) {
    next(error); //เมื่อมีข้อผิดพลาด ส่งต่อข้อผิดพลาดไปยัง middleware หรือ error handler ถัดไป
    console.error(error);
    res.status(500).send(`Warning: ${error.message}`);
  }
});

router.route("/create-product").post(async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res
      .status(201)
      .json({ data: newProduct, message: "Product created successfully" });
  } catch (error) {
    next(error);

    res.status(500).send(`Warning: ${error.message}`);
  }
});

router.route("/update-product/:id").put(async (req, res, next) => {
  try {
    // อัปเดตข้อมูลสินค้าตาม ID ที่ส่งมาใน URL โดยใช้ข้อมูลที่ส่งมาใน request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // คืนค่าข้อมูลสินค้าที่ถูกอัปเดตแล้ว
    );

    res
      .status(200)
      .json({ data: updatedProduct, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send(`Warning: ${error.message}`);
    next(error);
  }
});

router.route("/delete-product/:id").delete(async (req, res) => {
  try {
    // ลบข้อมูลสินค้าจากฐานข้อมูลโดยใช้ ID ที่ส่งมาใน URL
    const result = await Product.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ data: result, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
