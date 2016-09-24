var express = require('express'), 
router =  express.Router(); 
var mysql = require('mysql'); 
var connection = require('../db');

 
// custom library
// model


 router.get("/",function(req,res){
        var query = "SELECT * FROM ?? where  race_date >= date(sysdate())";
        var table = ["raceday"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

     router.get("/next/",function(req,res){

        var query = "SELECT * FROM ?? where  race_date >= date(sysdate()) LIMIT 1";
        var table = ["raceday"];

        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Race" : rows});
            }
        });
    });
    
    
    
 module.exports = router; 