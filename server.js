import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js"; 
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Config
const app = express();
const PORT = process.env.PORT || 4000; // Use PORT from environment variable if available

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'https://bhojan-food-del-5.onrender.com' 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,token' // Add token here
}));

app.use(express.json());

// API endpoints
app.use('/api/food', foodRouter); // Food API routes
app.use('/images', express.static('uploads')); // Serve static images
app.use('/api/user', userRouter); 
app.use('/api/cart', cartRouter); 
app.use('/api/order', orderRouter); 

// Database connection
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("API working");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
