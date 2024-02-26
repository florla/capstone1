// import OpenAI from "openai";
// import dotenv from 'dotenv';
// import express, { json } from 'express';
// import cors from 'cors';
// import e from "express";
const OpenAI = require('openai');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 5000;

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());

// Function to generate open-ended quiz/test questions
async function getQuestions(topic, expertise, numQuestions, style) {
  // Prompt for OpenAI questions
  let prompt =
    `Please generate ${numQuestions} ${expertise} level ${topic} open-ended quiz/test questions and make sure you do not answer any of the questions.
    Please word the questions as if you were ${style}, make sure to integrate this in each question but keep the questions based on ${topic}.
    Please make sure the mention ${topic} in each question.
    Make sure to format your response as an array with each question being a string value in the array.
    Please do not number the questions.
    Please do not include any other text in the response.`;

  // Call OpenAI's completion API
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  try {
    // Parse the response and return questions
    return JSON.parse(`{"Questions": ${completion.choices[0].message.content}}`);
  } catch (error) {
    // Handle invalid response from GPT
    console.log({
      error: "Invalid response from GPT. Please try again."
    });
    return {
      error: "Invalid response from GPT. Please try again."
    }
  }
}

// getQuestions('javascript', 'novice', 5, 'Captain Jack Sparrow');

// Function to evaluate submissions against questions
async function getEvaluation(question, submission) {
  // Prompt for OpenAI evaluation
  let prompt = `You will be given a question and a submission, your role is to strictly evaluate if the submission correctly answers and provides what the question is specifically asking for, please provide an explanation and grade the submission of out 3 points based on the accuracy of the submission.
    This is the question: '${question}' and this is the submission: '${submission}'.
    Make sure your explanation provides the correct answer to the question.
    If the submission is partially correct, grade the submission as '1/3' and set the evaluation to 'partially correct'.
    If the submission is incorrect or partially correct, make sure to provide the correct answer in your explanation.
    Evaluate oversimplified submissions such as 'Yes' or 'idk' as incorrect.
    Make sure you do not use quotation marks in your evaluation or explanation.
    Make sure to format the response as a JSON object with only three values: 'evalutaion', 'explanation', and 'grade'.
    Make sure the evaluation value is either 'correct', 'incorrect', or 'partially correct'.
    Make sure the grade is formatted as 'grade/3'.
    Please do not use any line breaks in your response.`;

  // Call OpenAI's completion API
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  try {
    // Parse the response and return evaluation
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    // Handle invalid response from GPT
    console.log({
      error: "Invalid response from GPT. Please try again."
    });
    return {
      error: "Invalid response from GPT. Please try again."
    }
  }
}

// getEvaluation('Ahoy there! What be the symbol for strict equality in JavaScript?', 'The symbol is ===');

// Middleware to parse JSON bodies of requests
app.use(express.json());

// Route to handle root endpoint
app.get('/', (_req, res) => {
  res.send('Hello LRNR!');
});

// Route to generate questions based on parameters
app.get('/questions', async (req, res) => {
  const topic = req.query.topic;
  const expertise = req.query.expertise;
  const numQuestions = req.query.numQuestions;
  const style = req.query.style;
  const questions = await getQuestions(topic, expertise, numQuestions, style);
  res.json(questions);
});

// Route to evaluate submissions against questions
app.get('/evaluation', async (req, res) => {
  const question = req.query.question;
  const submission = req.query.submission;
  const evaluation = await getEvaluation(question, submission);
  res.json(evaluation);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



// Export the app for testing
module.exports = { getQuestions, getEvaluation, app };
