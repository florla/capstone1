let express = require('express');

app.use(bodyParser.json());

let app = express();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/', (req, res) => {
  res.send('Successful response.');
});

const connection = require('./database.js'); // Import your database connection

app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;
    const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;
    
    connection.query(query, [fullName, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).send('An error occurred');
        }
        res.send('Registered Successfully!');
    });
});


app.listen(3000, () => console.log('Example app is listening on port 3000.'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});