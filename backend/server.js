import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './database.js'; 
import session from 'express-session';

dotenv.config();

const app = express();
const port = 5000;


// sid.signature
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

//session middleware
app.use(session({
  secret: 'mysecerkey', // use a secret key for your session
  resave: false,
  saveUninitialized: false,
  cookie: { secure: !true } // set `true` if you're using HTTPS, otherwise leave it as `!true`
}));

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;
    const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;

    connection.query(query, [fullName, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'An error occurred', error: err.message });
        }
        res.json({ message: 'Registered Successfully!' });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`; // In production, use hashed passwords

  connection.query(query, [email, password], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ message: 'An error occurred', error: err.message });
      }
      if (results.length > 0) {
          // User exists
          req.session.userId = results[0].id; // Set a session variable
          res.json({ message: 'Logged in successfully', user: results[0] });
      } else {
          // User not found or password doesn't match
          res.status(401).json({ message: 'Invalid credentials' });
      }
  });
});

app.get('/profile', (req, res) => {
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


app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});
