import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRoutes);
app.use(errorHandler);

export default app;
