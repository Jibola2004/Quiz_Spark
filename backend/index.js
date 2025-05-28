import express from 'express';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/quiz', quizRoutes);

// Static access to JSON if needed
app.use('/QuestionData', express.static(path.join('QuestionData')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
