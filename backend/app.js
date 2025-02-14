// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js"; 
import bodyParser from "body-parser";
import ErrorHandler from "./utils/errorHandler.js";  

const app = express();

dotenv.config();  

// Middleware
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("Request received at:", req.originalUrl);
    next();
});

// Routes
app.use('/api/user', userRoutes);

app.get("/test-error", (req, res, next) => {
    next(new ErrorHandler("Test Error", 500)); 
});

app.use(errorMiddleware);

export default app;
