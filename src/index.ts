import express from 'express'
// import authRoutes from './modules/auth/auth.routes.js'
// import guestsRouter from './modules/guest/guest.routes.js';
import cors from "cors";
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

// app.use("/eventory/auth",authRoutes);
// app.use("/eventory/guests", guestsRouter);

export default app



// http://localhost:5173