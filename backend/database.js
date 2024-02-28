const mysql = require('mysql2');


const connection = mysql.createConnection({
  
    host: '127.0.0.1',
    // The MySQL user 
    user: 'root',    
    // The password for the specified user
    password: 'password',
    // The name of the MySQL database to connect to
    database: 'login',
});

// Attempting to connect to the MySQL database using the configuration
connection.connect(function (err) {
    // If an error occurs during connection, throw an error
    if (err) throw err;    
    // Log a success message if connected without errors
    console.log('MySQL Database is Connected!!!!'); 
});

// Exporting the established MySQL connection 
module.exports = connection;