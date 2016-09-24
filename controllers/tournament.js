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