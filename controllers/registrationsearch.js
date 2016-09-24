var express = require('express'),
    router = express.Router();
var mysql = require('mysql');
var connection = require('../db');


// custom library
// model



router.get("/", function (req, res) {
    var query = "select memberid,member_first_name,member_last_name from ?? where memberid " +
                  "not in (select member_id from ??) ";
               
    var table = ["contacts", "registration"];

    query = mysql.format(query, table);
    console.log(query);   
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" + err});
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
});


module.exports = router; 