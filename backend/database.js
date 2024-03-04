import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5688667',    
    password: 'mwJimZKRwe',
    database: 'sql5688667',
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }    
    console.log('MySQL Database is Connected!!!!'); 
});

export default connection;









// Attempting to connect to the MySQL database using the configuration


// Exporting the established MySQL connection 
// module.exports = connection;