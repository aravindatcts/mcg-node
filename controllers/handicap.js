var express = require('express'), 
router =  express.Router(); 
var mysql = require('mysql'); 
var connection = require('../db');

 
// custom library
// model


 router.get("/",function(req,res){
        var query = "SELECT * FROM ?? hand inner join contacts con on con.memberid = hand.memberid ";
        var table = ["handicap"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "handicap" : rows});
            }
        });
    });
    
 



    router.get("/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["handicap","memberID",req.params.user_id,"handicap_type","B"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Handicap" : rows});
            }
        });
    });
    
    
      router.get("/cut/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["handicap","memberID",req.params.user_id,"handicap_type","C"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Handicap" : rows});
            }
        });
    });


    router.post("/", function (req, res) {
          var query = "INSERT INTO  ??(??,??,??,??,??,??) VALUES(?,?,?,?,?,?,?) ";
          console.log(req.body);
         var table = ["handicap", "memberid", "effective_date", "end_date", "handicap_type", "handicap_index", "handicap_score",
                   req.body.handicap[0].memberid, req.body.handicap[0].effective_date,
                   req.body.handicap[0].end_date, req.body.handicap[0].handicap_type,
                   req.body.handicap[0].handicap_index, req.body.handicap[0].handicap_score];
         query = mysql.format(query, table);

           connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Handicap" : rows});
            }
        });

      

      });

router.put("/:memberid", function (req, res) {
    var query = "UPDATE ?? SET effective_date = ?, end_date = ?,handicap_type = ?, handicap_index = ?," 
     + "handicap_score = ? WHERE memberid=? ";

    var table = ["handicap", req.body.handicap[i].effective_date,
        req.body.handicap[0].end_date,req.body.handicap[0].handicap_type,
        req.body.handicap[0].handicap_index,req.body.handicap[0].handicap_score,req.body.handicap[0].memberid,];
  
    query = mysql.format(query, table);
    console.log(query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" + err });
        } else {
            res.json({ "Error": false, "Message": "Insert values is successfully " + req.body.registration[0].tournamentid });
        }
    });
});

    
 module.exports = router; 