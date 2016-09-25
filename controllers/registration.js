var express = require('express'),
    router = express.Router();
var mysql = require('mysql');
var async = require('async'); 

var connection = require('../db');


// custom library
// model


router.get("/", function (req, res) {
    var query = "SELECT * FROM ??";
    var table = ["registration"];
    query = mysql.format(query, table);

     console.log(query);

    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
});


router.get("/:user_id", function (req, res) {
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["registration", "member_id", req.params.user_id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
});


router.get("/:tournament_id/:user_id", function (req, res) {
    var query = "select * from registration register inner join contacts on register.member_id = contacts.memberid where reg_member_id in  " +
        " (select reg_member_id from registration where member_id =  ? and tournament_id = ? )  and register.tournament_id = ?";
    var table = [req.params.user_id, req.params.tournament_id,req.params.tournament_id];

    query = mysql.format(query, table);

    console.log(query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" + err });
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
});




router.get("/all/", function (req, res) {
    var query = "select memberid,member_first_name,member_last_name from ?? where memberid " +
                  "not in (select member_id from ??) ";
               
    var table = ["contacts", "registration"];

    query = mysql.format(query, table);
    console.log(query);   
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
});



router.post("/", function (req, res) {
    var insert_query = "INSERT INTO  ??(??,??,??,??) VALUES(?,?,?,sysdate()) ";

    var table = ["registration", "member_id", "tournament_id", "reg_member_id", "registration_date",
    req.body.registration[0].member_id, req.body.registration[0].tournament_id,
        req.body.registration[0].reg_member_id];
   
    query = mysql.format(insert_query, table);
    console.log(query);
     connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" + err });
        } else {
            res.json({ "Error": false, "Message": "Success", "registration": rows });
        }
    });
  


});


module.exports = router; 