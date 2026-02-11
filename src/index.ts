import ordersRouter from './modules/orders/orders.routes.js';
import productRouter from './modules/products/products.routes.js';
import uploadRouter from './modules/upload/upload.routes.js';
import express from 'express'
import cors from "cors";
import authRoutes from './modules/auth/auth.routes.js';
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

app.use("/eventory/auth", authRoutes);
app.use("/eventory/orders", ordersRouter);
app.use("/eventory/products", productRouter);
app.use("/eventory/upload", uploadRouter);

export default app



// http://localhost:5173