var express = require('express'),
    router = express.Router();
var mysql = require('mysql');
var connection = require('../db');


// custom library
// model


router.get("/", function (req, res) {
    var query = "SELECT * FROM ??";
    var table = ["users"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
        }
    });
});

router.get("/:user_id", function (req, res) {
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["users", "memberID", req.params.user_id];
    query = mysql.format(query, table);

    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
        if (rows.length > 0) {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
         } else {
             res.json({ "Error": false, "Message": "No records found", "Users": req.params.user_id });
           }

        }
    });
});


router.post("/:user_id", function (req, res) {
    console.log(req.body);

    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["users", "password", req.body.Users[0].password, "memberID", req.body.Users[0].memberID];
    query = mysql.format(query, table);

    console.log(query);

    connection.query(query, function (err, rows) {
         if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            if (rows.count > 0) {
                res.json({ "Error": false, "Message": "Success", "Users": rows });
            } else {
                res.json({ "Error": false, "Message": "No records found", "Users": req.params.user_id });
            }

        }
    });
});

module.exports = router; 