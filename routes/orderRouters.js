import { Router } from "express"
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrderStatus } from "../controllers/orderController.js";
import { authorizeroles, isAuthentication } from "../middleware/authentication.js";


const orderRouters = Router();

orderRouters.post('/order/new', isAuthentication, newOrder)

orderRouters.get('/order/:id', isAuthentication, getSingleOrder)

orderRouters.get('/orders/me', isAuthentication, myOrders)

orderRouters.get('/admin/orders', isAuthentication, authorizeroles("admin"), getAllOrders)

orderRouters.put('/admin/order/:id', isAuthentication, authorizeroles("admin"), updateOrderStatus)

orderRouters.delete('/admin/order/:id', isAuthentication, authorizeroles("admin"), deleteOrder)

export default orderRouters;