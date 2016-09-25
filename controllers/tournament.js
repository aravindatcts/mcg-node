var express = require('express'), 
router =  express.Router(); 
var mysql = require('mysql'); 
var connection = require('../db');

 
// custom library
// model


 router.get("/",function(req,res){
        var query = "SELECT * FROM ?? where tournament_open = 'O' order by tournament_date";
        var table = ["tournament"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "tournament" : rows});
            }
        });
    });
    
     router.get("/:tournament_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["tournament","tournament_id",req.params.tournament_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "tournament" : rows});
            }
        });
    });

   
router.post("/", function (req, res) {
    var query = "insert into tournament(tournament_id, tournament_date, tournament_time, tournament_name, tournament_sponsor, tournament_format, tournament_condition, tournament_open, tournament_type)" +
                " values(?,?,?,?,?,?,?,?,?)";
    var table = [req.body.tournament[0].tournament_id,req.body.tournament[0].tournament_date,
                 req.body.tournament[0].tournament_time,
                 req.body.tournament[0].tournament_name,req.body.tournament[0].tournament_sponsor,
                 req.body.tournament[0].tournament_format,
                 req.body.tournament[0].tournament_condition,
                 req.body.tournament[0].tournament_open,req.body.tournament[0].tournament_type];

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


    
router.post("/close/:tournament_id", function (req, res) {
    var query = "update tournament set tournament_open = ? where tournament_id = ?";
    var table = ["C",req.params.tournament_id];

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




    
    //    router.put("/:user_id",function(req,res){
    //     var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    //     var table = ["users","password",req.body.password, "memberID",req.body.memberID];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //         if(err) {
    //             res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //         } else {
    //             res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.memberID});
    //         }
    //     });
    // });
 
 module.exports = router; 