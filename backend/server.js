import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import articlesRouter from './articles.js';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Successful response.');
});

// articlesRouter under the '/api' 
app.use('/api', articlesRouter);

app.listen(port, () => console.log('Example app is listening on port 5000.'));