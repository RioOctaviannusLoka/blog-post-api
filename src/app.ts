import express from 'express';
import cors from 'cors';
import postRoutes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', postRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
});

export default app;