import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validateRequest from "./src/middleware/validation.middleware.js";

const server = express();

// parse form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/delete-product/:id", productController.deleteProduct);
server.post("/", validateRequest, productController.addNewProduct);
server.post("/update-product", productController.postUpdateRequestProduct);

server.use(express.static("src/views"));
server.use(express.static("public"));

server.listen(3400, () => {
  console.log("Server listening on port 3400");
});
