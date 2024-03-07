import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './database.js'; 

import OpenAI from 'openai';

import articlesRouter from './articles.js';

dotenv.config();

const app = express();
const port = 5000;




app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies



app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT id, fullName, email, last_login FROM users'; // Removed password for security
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching users:', err);
          return res.status(500).json({ message: 'An error occurred', error: err.message });
      }
      res.json(results);
  });
});

app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;
    var query = `SELECT * FROM users WHERE email = ?`;
    if(connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'An error occurred', error: err.message });
        }
        if (results.length > 0) {
            // User exists
            res.json({ invalid: 'Email already used' });
        } else {
            // User not found
            query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;
            connection.query(query, [fullName, email, password], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ message: 'An error occurred', error: err.message });
                }
                res.json({ message: 'Registered Successfully!' });
            });
        }
    }));
});

app.post('/login', (req, res) => {
  const {  email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`; // Limit 1 is used to stop the query after finding the first match
  connection.query(query, [  email, password], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ message: 'An error occurred', error: err.message });
      }
      if (results.length > 0) {
          // User exists
          const user = results[0];
          const token = `${user.id}.${new Date()}`; // This is a simplistic token for demonstration. Use JWT or similar in production.
          const date = new Date().toJSON().slice(0, 10)
          let dateQuery = `UPDATE users SET last_login = ? WHERE id = ?`;
          connection.query(dateQuery, [date, user.id], (err, results) => {
              if (err) {
                  console.error('Error updating last login:', err);
                  return res.status(500).json({ message: 'An error occurred', error: err.message });
              }
          });
          res.json({ message: 'Logged in successfully', user: { id: user.id, fullName: user.fullName, email: user.email ,admin: user.admin_permission }, token });
      } else {
          // User not found or password doesn't match
          res.status(401).json({ message: 'Invalid credentials' });
      }
  });
});




app.get('/account', (req, res) => {
  if (!req.session.userId) {
      return res.status(403).send('You need to sign in');
  }
  const query = `SELECT * FROM users WHERE id = ?`;

  connection.query(query, [req.session.userId], (err, results) => {
      if (err) {
          console.error('Error fetching user profile:', err);
          return res.status(500).json({ message: 'An error occurred', error: err.message });
      }
      if (results.length > 0) {
          res.json({ user: results[0] });
      } else {
          res.status(404).send('Profile not found');
      }
  });
});

app.post('/delete', (req, res) => {
  const query = `DELETE FROM users WHERE id = ?`;
  connection.query(query, [req.body.id], (err, results) => {
      if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ message: 'An error occurred', error: err.message });
      }
      res.json({ message: 'User deleted successfully' });
  }
  );
});



// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// //Budgets Functionality
// var incomes = []
// var expenses = []

// //Add Income Request
// app.get('/addIncome', (req, res) => {
//   if(!req.query.incomeDescription) {
//     return res.send({error: "You must provide an income description."});
//   }
//   if(!req.query.incomeAmount) {
//     return res.send({error: "You must provide an income amount."});
//   }
//   if(isNaN(parseFloat(req.query.incomeAmount))) {
//     return res.send({error: "Income amount must be a number."});
//   }
//   let newIncome = {
//     description: req.query.incomeDescription,
//     amount: parseFloat(req.query.incomeAmount).toFixed(2),
//     id: 'income'+(incomes.length+1)
//   }
//   incomes.push(newIncome);
//   console.log('Incomes: ', incomes);
//   res.send({response: "Income added successfully."});
// });
// //Example URL: http://localhost:5000/addIncome?incomeDescription=Job&incomeAmount=2000

// //Add Expense Request
// app.get('/addExpense', (req, res) => {
//   if(!req.query.expenseDescription) {
//     return res.send({error: "You must provide an expense description."});
//   }
//   if(!req.query.expenseAmount) {
//     return res.send({error: "You must provide an expense amount."});
//   }
//   if(!req.query.expenseCategory) {
//     return res.send({error: "You must provide an expense category."});
//   }
//   if(isNaN(parseFloat(req.query.expenseAmount))) {
//     return res.send({error: "Expense amount must be a number."});
//   }
//   let newExpense = {
//     description: req.query.expenseDescription,
//     amount: parseFloat(req.query.expenseAmount).toFixed(2),
//     category: req.query.expenseCategory,
//     id: 'expense'+(expenses.length+1)
//   }
//   expenses.push(newExpense);
//   console.log('Expenses: ', expenses);
//   res.send({response: "Expense added successfully."});
// });
// //Example URL: http://localhost:5000/addExpense?expenseDescription=Rent&expenseAmount=100?expenseCategory=Housing

// //Update Income Request
// app.get('/updateIncome', (req, res) => {
//   if(!req.query.incomeId) {
//     return res.send({error: "You must provide an income id."});
//   }
//   let index = incomes.findIndex(income => income.id === req.query.incomeId);
//   if(index === -1) {
//     return res.send({error: "Income id not found."});
//   }
//   if(req.query.incomeDescription) {
//     incomes[index].description = req.query.incomeDescription;
//   }
//   if(req.query.incomeAmount) {
//     if(isNaN(parseFloat(req.query.incomeAmount))) {
//       return res.send({error: "Income amount must be a number."});
//     }
//     incomes[index].amount = parseFloat(req.query.incomeAmount).toFixed(2);
//   }
//   console.log('Incomes: ', incomes);
//   res.send({response: "Income updated successfully."});
// });
// //Example URL: http://localhost:5000/updateIncome?incomeId=income1&incomeDescription=Job&incomeAmount=2500

// //Update Expense Request
// app.get('/updateExpense', (req, res) => {
//   if(!req.query.expenseId) {
//     return res.send({error: "You must provide an expense id."});
//   }
//   let index = expenses.findIndex(expense => expense.id === req.query.expenseId);
//   if(index === -1) {
//     return res.send({error: "Expense id not found."});
//   }
//   if(req.query.expenseDescription) {
//     expenses[index].description = req.query.expenseDescription;
//   }
//   if(req.query.expenseAmount) {
//     if(isNaN(parseFloat(req.query.expenseAmount))) {
//       return res.send({error: "Expense amount must be a number."});
//     }
//     expenses[index].amount = parseFloat(req.query.expenseAmount).toFixed(2);
//   }
//   if(req.query.expenseCategory) {
//     expenses[index].category = req.query.expenseCategory;
//   }
//   console.log('Expenses: ', expenses);
//   res.send({response: "Expense updated successfully."});
// });
// //Example URL: http://localhost:5000/updateExpense?expenseId=expense1&expenseDescription=Rent&expenseAmount=200

// //Remove income request
// app.get('/removeIncome', (req, res) => {
//   if(!req.query.incomeId) {
//     return res.send({error: "You must provide an income id."});
//   }
//   let index = incomes.findIndex(income => income.id === req.query.incomeId);
//   if(index === -1) {
//     return res.send({error: "Income id not found."});
//   }
//   incomes.splice(index, 1);
//   console.log('Incomes: ', incomes);
//   res.send({response: "Income removed successfully."});
// });
// //Example URL: http://localhost:5000/removeIncome?incomeId=income1

// //Remove expense request
// app.get('/removeExpense', (req, res) => {
//   if(!req.query.expenseId) {
//     return res.send({error: "You must provide an expense id."});
//   }
//   let index = expenses.findIndex(expense => expense.id === req.query.expenseId);
//   if(index === -1) {
//     return res.send({error: "Expense id not found."});
//   }
//   expenses.splice(index, 1);
//   console.log('Expenses: ', expenses);
//   res.send({response: "Expense removed successfully."});
// });
// //Example URL: http://localhost:5000/removeExpense?expenseId=expense1

// Function to get AI chatbot response
async function getTip(incomes, expenses) {
  // Prompt for budget tip generation
  let tipPrompt = [
    { role: "system", content: "You are a helpful assistant for a budgeting website who gives tips based on users' budget info as a couple of sentences in a JSON output 'tip'." },
    { role: "system", content: "Here is the users income: "+(incomes)+". Here is the users expenses: "+(expenses)+". Please generate a financial tip for the user based on this information."},
  ]; 
  console.log(tipPrompt);
    const completion = await openai.chat.completions.create({
      messages: tipPrompt,
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    })
    let tip = completion.choices[0].message.content;
    console.log(tip);
    return tip;
  }

//Get Budget Tip Request
app.get('/getBudgetTip', async (req, res) => {
  if(!req.query.incomes) {
    return res.send({error: "You must provide an income list."});
  }
  if(!req.query.expenses) {
    return res.send({error: "You must provide an expense list."});
  }
  let budgetTip = await getTip(req.query.incomes, req.query.expenses);
  res.send(JSON.parse(budgetTip));
});
//Example URL: http://localhost:5000/getBudgetTip

//Chatbot Functionality

// Array to store chat history
// var chatLog = [
//   { role: "system", content: "You are a helpful assistant for a budgeting website who gives financial advice as a couple of sentences in a JSON output 'response'." },
//   { role: "assistant", content: "Hello! If you have any financial questions or need assistance, feel free to ask. I'm here to provide guidance and support."},
// ]; 

// Function to get AI chatbot response
async function chat(prompt) {
    const completion = await openai.chat.completions.create({
      messages: prompt,
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    })
    let response = completion.choices[0].message.content;
    console.log(prompt);
    return response;
  }

//Chatbot Request
app.get('/chat', async (req, res) => {
  let prompt = JSON.parse(req.query.prompt);
  console.log(prompt);
  let response = await chat(prompt);
  console.log(response);
  res.send(JSON.parse(response));
});
//Example URL: http://localhost:5000/chat?prompt=How%20do%20I%20apply%20for%20a%20home%20loan%3F

// articlesRouter under the '/api' 
app.use('/api', articlesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});

