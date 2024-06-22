import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import sequelize from './config/database.js';
// Import and use routes
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.static('public'))
app.use(express.json());


// import productRoutes from './routes/productRoutes';
app.use('/api/v1/users', authRoutes);
// app.use('/api/products', productRoutes);

const PORT = config?.server?.port;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error synchronizing the database:', err);
});

