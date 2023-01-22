import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";
const router = express.Router();

/*
@desc:      Fetch all products
@route:     GET /api/products
@access:    Public
*/
router.route("/").get(getProducts);

/*
@desc:      Fetch a single product by id
@route:     GET /api/products/:id
@access:    Public
*/
router.route("/:id").get(getProductById);

/* 
For difference between router.get('url', func) and router.route visit:
https://forum.freecodecamp.org/t/what-is-the-difference-between-app-get-and-app-route-get-route/418962
*/

export default router;
