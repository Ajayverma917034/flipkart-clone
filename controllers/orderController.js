import Order from "../models/OrderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import tryCatch from "./utils/tryCatch.js";
import Product from "../models/ProductData.js"
// create new order
export const newOrder = tryCatch(async (req, res, next) => {
    const { shippingInfor, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, discount } = req.body;

    const order = await Order.create({
        shippingInfor, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, discount, paidAt: Date.now(), user: req.user._id,
    })
    res.status(201).json({ success: true, order });
})

// get single order
export const getSingleOrder = tryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({ success: true, order })
})

// get logged in user order
export const myOrders = tryCatch(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({ success: true, orders })
})

// get all order for admin -- admin
export const getAllOrders = tryCatch(async (req, res, next) => {
    const orders = await Order.find()
    let tatalAmount = 0;
    orders.forEach(order => {
        tatalAmount += order.totalPrice
    })

    res.status(200).json({ success: true, tatalAmount, orders })
})


// update order status -- admin
export const updateOrderStatus = tryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    // if (req.body.status === "Shipped") {
    //     order.orderItems.forEach(async (o) => {
    //         await updateStock(o.product, o.quantity);
    //     });
    // }
    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    });
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete order for admin -- admin
export const deleteOrder = tryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    await Order.deleteOne(order);
    res.status(200).json({ success: true })
})



