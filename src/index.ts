import express from 'express'
import cors from "cors";
import authRoutes from './modules/auth/auth.routes.js';
import ordersRouter from './modules/orders/orders.routes.js';
import productRouter from './modules/products/products.routes.js';
import uploadRouter from './modules/upload/upload.routes.js';
const app = express()
// Aquí agregas middleware **antes** de las rutas

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://eventory-flame.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello Express!')
})

app.use("/glem/auth", authRoutes);
app.use("/glem/orders", ordersRouter);
app.use("/glem/products", productRouter);
app.use("/glem/upload", uploadRouter);

export default app



// http://localhost:5173