// Without redis code 


import express, { json } from 'express';
import mongoose from 'mongoose';

const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/node_cache";

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error(" MongoDB Connection Failed:", err);
    });


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    specs: Object
})


const Product = mongoose.model('Product', productSchema);


app.get('/api/products', async (req, res) => {

    const query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }

    const product = await Product.find(query);

    res.json(product);

})

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
})