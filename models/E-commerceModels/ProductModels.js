const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
}, { timestamps: true });

const ProductSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    status: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    oldPrice: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    category: { type: String },

}, { timestamps: true }) //Trace sur BD 

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;