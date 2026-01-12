import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import labelRoutes from './routes/label.routes';
import employeeRoutes from './routes/employee.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/labels', labelRoutes);
app.use('/api/employees', employeeRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sales_dashboard';

// const MONGO_URI ="mongodb+srv://vuppulavinaykumar1997:Vinay@123@cluster0.mc8cqbm.mongodb.net/?appName=Cluster0"
const MONGO_URI = "mongodb+srv://vuppulavinaykumar1997_db_user:F5C9Nwj5bL3aqOcQ@studentcluster.kixyn5n.mongodb.net/?appName=studentCluster"
// Attempt connection but don't crash if it fails
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.warn('MongoDB connection failed. Using in-memory fallback for this session.');
        console.error('Error detail:', err.message);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
