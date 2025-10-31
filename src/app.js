import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../src/routes/user.routes.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);

export default app;
