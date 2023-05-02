import { Router } from "express"

import { isAuthentication, authorizeroles } from "../middleware/authentication.js";
import { createProduct, createProductReview, deleteProduct, deleteProductReviews, getAdminProduct, getAllProducts, getAllProductsPaginated, getProductReviews, productDetails, updateProduct } from "../controllers/productController.js";

const productRouters = Router();
// to create a product
productRouters.post('/admin/product/new', isAuthentication, authorizeroles("admin"), createProduct);

// to get all the products
productRouters.get('/products', getAllProducts);

productRouters.get('/productspaginated', getAllProductsPaginated);

// to update product
productRouters.put('/admin/product/:id', isAuthentication, authorizeroles("admin"), updateProduct)

//to delete product
productRouters.delete('/admin/product/:id', isAuthentication, authorizeroles("admin"), deleteProduct)

//to get detils of a product
productRouters.get('/product/:id', productDetails)

productRouters.put('/review', isAuthentication, createProductReview)

productRouters.get('/review', getProductReviews)

productRouters.get('/admin/products', isAuthentication, authorizeroles("admin"), getAdminProduct)

productRouters.delete('/review', isAuthentication, deleteProductReviews)


export default productRouters 