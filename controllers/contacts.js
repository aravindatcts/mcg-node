

var fs = require('fs');
var express = require('express'),
    router = express.Router();
var mysql = require('mysql');
var connection = require('../db');




var S3FS = require('s3fs');

var s3fsImpl = new S3FS('profilepicofusers', {
    accessKeyId: 'AKIAISSJVRXHRHT6X6LQ',
    secretAccessKey: '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'
});

s3fsImpl.create();


//   var multiparty = require('connect-multiparty'),
//         multipartymiddleware = multiparty();
//  router.use(multipartymiddleware);

// custom library
// model



router.get("/", function (req, res) {
    var query = "SELECT * FROM ??";
    var table = ["contacts"];
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
    var table = ["contacts", "memberID", req.params.user_id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
        }
    });
});



router.post("/profilepic/:user_id",function (req, res) {
 
 console.log(req);
   var file = req.files.file; 
   var stream = fs.createReadStream(file.path); 
 
 console.log(req.params.user_id);

   return s3fsImpl.writeFile(req.params.user_id ,stream).then(function(){
       fs.unlink(file.path,function(err) {
           if(err){
              res.json({ "Error": true, "Message": "File load fail " + req.params.user_id });
           } 
              res.json({ "Error": false, "Message": "File loaded successfully " + req.params.user_id  });
       });
   });

  // console.log(s);



    // var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    // var table = ["contacts",
    //     "email", s
    //         ];
    // query = mysql.format(query, table);
    // connection.query(query, function (err, rows) {
    //     if (err) {
    //         res.json({ "Error": true, "Message": "Error executing MySQL query" });
    //     } else {
    //         res.json({ "Error": false, "Message": "Updated the password for email " + req.body.memberID });
    //     }
    // });

});



router.post("/:user_id", function (req, res) { 


    console.log(req.body);   
    var query = "UPDATE ?? SET ?? = ?, ??=?, ??=?, ??=? WHERE ?? = ?";
    var table = ["contacts",
        "primary_mobile_number", req.body.Users[0].primary_mobile_number,
        "secondary_mobile_number", req.body.Users[0].secondary_mobile_number,
        "land_line_number", req.body.Users[0].land_line_number,
        "email", req.body.Users[0].email,
        "memberID", req.params.user_id];

    
    query = mysql.format(query, table);

    console.log(query) ;
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" + err});
        } else {
            res.json({ "Error": false, "Message": "Updated the information " + err });
        }
    });
});


module.exports = router; 