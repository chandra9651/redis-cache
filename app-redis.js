// with redis code

import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";

const app = express();

/* -------------------- REDIS SETUP -------------------- */
const client = createClient();

client.on("error", (err) => {
    console.log("Redis Error:", err);
});

await client.connect();

console.log("✅ Redis Connected");

/* -------------------- MONGODB SETUP -------------------- */
const MONGO_URL = "mongodb://127.0.0.1:27017/node_cache";

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`✅ MongoDB Connected: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed:", err);
    });

/* -------------------- PRODUCT MODEL -------------------- */
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    specs: Object
});

const Product = mongoose.model("Product", productSchema);

/* -------------------- API ROUTE -------------------- */
app.get("/api/products", async (req, res) => {
    try {
        const key = generateCacheKey(req);

        // 1. CHECK CACHE
        const cachedData = await client.get(key);

        if (cachedData) {
            console.log("⚡ Cache Hit");
            return res.json(JSON.parse(cachedData));
        }

        console.log("Cache Miss");

        // 2. BUILD QUERY
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        // 3. FETCH FROM DB
        const products = await Product.find(query);

        // 4. STORE IN CACHE (with expiry)
        await client.set(key, JSON.stringify(products), {
            EX: 60 // cache expires in 60 seconds
        });

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* -------------------- CACHE KEY GENERATOR -------------------- */
function generateCacheKey(req) {
    const baseUrl = req.path.replace(/^\/+|\/+$/g, "").replace(/\//g, ":");

    const params = req.query;

    const sortedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&");

    return sortedParams ? `${baseUrl}:${sortedParams}` : baseUrl;
}

/* -------------------- START SERVER -------------------- */
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});