import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';
import websiteRoutes from './src/routes/website.routes';
import pageRoutes from './src/routes/page.routes';
import sectionRoutes from './src/routes/section.routes';
import newsRoutes from './src/routes/news.routes';
import lang from './src/middleware/lang.middleware';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(lang);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/news', newsRoutes);

app.use('/api/uploads', express.static('uploads'));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
