var express = require('express'), 
router =  express.Router(); 
var mysql = require('mysql'); 
var connection = require('../db');


 router.get("/",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["gotypoints"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
    
   
    
 module.exports = router; 