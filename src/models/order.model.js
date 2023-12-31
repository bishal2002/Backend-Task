const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    productDescription:{
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);
