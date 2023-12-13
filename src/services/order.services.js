require("dotenv").config();
const express = require("express");
const app = express();

//models
const OrderModel = require('../models/order.model')

app.use(express.json());

const { successHandler, errorHandler } = require("../helper/status");
const mongoose = require('mongoose')


//api for get orderById
exports.getOrderById = async (id) => {

    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    const fetchOrder = await OrderModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryName'
            }
        }, { $unwind: '$categoryName' },
        {
            $project: {
                product_name: 1,
                quantity: 1,
                Price: 1,
                createdAt: 1,
                productDescription:1,
                'categoryName.name': 1
            }
        }
    ]);

    if (!fetchOrder || fetchOrder.length === 0 ) {
        return { status: 400, message: "Error feching the order!" };
    }
    return { status: 200, message: "Data fetched successfully", resp: fetchOrder };
};

//api for getall 0rders
exports.getOrder = async () => {
    const fetchOrder = await OrderModel.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryName'
            }
        }, { $unwind: '$categoryName' },
        {
            $project: {
                product_name: 1,
                quantity: 1,
                Price: 1,
                createdAt: 1,
                productDescription: 1,
                'categoryName.name': 1
            }
        }
    ]);
    console.log(fetchOrder)
    if (!fetchOrder) {
        return { status: 400, message: "Error feching the order!" };
    }
    return { status: 200, message: errorHandler.datafetched, resp: fetchOrder };
};

//api for order-creation
exports.addOrder = async (body) => {
    const { product_name, quantity, Price, category , productDescription } = body;

    if (!product_name || !quantity || !Price || !category) {
        return { status: 400, message: errorHandler.missing };
    }

    const orderCreation = await OrderModel.create({
        product_name: product_name,
        quantity: quantity,
        Price: Price,
        productDescription : productDescription,
        category: category
    })

    if (orderCreation) {
        return { status: 201, message: successHandler.orderCreated };
    }
    else {
        return { status: 400, message: errorHandler.errorOrderCreation };
    }
};


//api for delete=order
exports.deleteOrder = async (id) => {
    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    const OrderDeletion = await OrderModel.findByIdAndDelete({ _id: id });

    if (!OrderDeletion) {
        return { status: 400, message: "Error deleting the order!" };
    }
    return { status: 200, message: "Order deleted sucessfully!" };
};

//api for update-order
exports.updateOrder = async (id, body) => {
    const { product_name, quantity, Price, category , productDescription } = body;

    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    const Orderupdation = await OrderModel.updateOne(
        { _id: id },
        { $set: { product_name, quantity, Price, category , productDescription } },
        { new: true }
    )

    if (!Orderupdation) {
        return { status: 400, message: "Error updating the order!" };
    }

    return { status: 200, message: "Order updated sucessfully!", resp: Orderupdation };
};


