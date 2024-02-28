let express = require('express');


let app = express();
const port = 5000;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/', (req, res) => {
  res.send('Successful response.');
});


app.listen(port, () => console.log('Example app is listening on port 5000.'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});