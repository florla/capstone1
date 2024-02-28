import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Successful response.');
});

//Budgets Functionality

var incomes = []
var expenses = []

//Add Income Request
app.get('/addIncome', (req, res) => {
  if(!req.query.incomeDescription) {
    return res.send({error: "You must provide an income description."});
  }
  if(!req.query.incomeAmount) {
    return res.send({error: "You must provide an income amount."});
  }
  if(isNaN(parseFloat(req.query.incomeAmount))) {
    return res.send({error: "Income amount must be a number."});
  }
  let newIncome = {
    description: req.query.incomeDescription,
    amount: parseFloat(req.query.incomeAmount).toFixed(2),
    id: 'income'+(incomes.length+1)
  }
  incomes.push(newIncome);
  console.log('Incomes: ', incomes);
  res.send({response: "Income added successfully."});
});
//Example URL: http://localhost:5000/addIncome?incomeDescription=Job&incomeAmount=200

//Add Expense Request
app.get('/addExpense', (req, res) => {
  if(!req.query.expenseDescription) {
    return res.send({error: "You must provide an expense description."});
  }
  if(!req.query.expenseAmount) {
    return res.send({error: "You must provide an expense amount."});
  }
  if(isNaN(parseFloat(req.query.expenseAmount))) {
    return res.send({error: "Expense amount must be a number."});
  }
  let newExpense = {
    description: req.query.expenseDescription,
    amount: parseFloat(req.query.expenseAmount).toFixed(2),
    id: 'expense'+(expenses.length+1)
  }
  expenses.push(newExpense);
  console.log('Expenses: ', expenses);
  res.send({response: "Expense added successfully."});
});
//Example URL: http://localhost:5000/addExpense?expenseDescription=Rent&expenseAmount=100

//Remove income request
app.get('/removeIncome', (req, res) => {
  if(!req.query.incomeId) {
    return res.send({error: "You must provide an income id."});
  }
  let index = incomes.findIndex(income => income.id === req.query.incomeId);
  if(index === -1) {
    return res.send({error: "Income id not found."});
  }
  incomes.splice(index, 1);
  console.log('Incomes: ', incomes);
  res.send({response: "Income removed successfully."});
});
//Example URL: http://localhost:5000/removeIncome?incomeId=income1

//Remove expense request
app.get('/removeExpense', (req, res) => {
  if(!req.query.expenseId) {
    return res.send({error: "You must provide an expense id."});
  }
  let index = expenses.findIndex(expense => expense.id === req.query.expenseId);
  if(index === -1) {
    return res.send({error: "Expense id not found."});
  }
  expenses.splice(index, 1);
  console.log('Expenses: ', expenses);
  res.send({response: "Expense removed successfully."});
});
//Example URL: http://localhost:5000/removeExpense?expenseId=expense1

app.listen(port, () => console.log('Example app is listening on port 5000.'));