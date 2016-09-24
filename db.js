var mysql = require('mysql');


var connection = mysql.createConnection({
host: 'mgcgolf.ccceci8zni54.us-east-1.rds.amazonaws.com',
    user:'mgcgolf',
    password:'mgcgolfdb',
    port:3306,
    database:'dbMGCGolf' 
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ...");    
} else {
    console.log("Error connecting database .." + err );    
}
});


module.exports =  connection; 
