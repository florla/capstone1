import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(port, () => console.log('Example app is listening on port 5000.'));