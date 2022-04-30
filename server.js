const express     = require('express');
const mysql       = require('mysql');
const bodyParser  = require('body-parser');
const credentials = require('./config/credentials')
const totalload   = require('./config/queries')
var Iconv         = require('iconv-lite');
const fs          = require('fs')
const fastcsv     = require("fast-csv");
const app         = express();
const port        = 8000;
const languageEncoding = require("detect-file-encoding-and-language");
//initialize app as an instance of express, the framework

app.use(bodyParser.urlencoded({extended:true}));
//we import the route into the server
require('./routes')(app, {});
app.listen(port, () =>{
    console.log('We are live on port ' + port);
});

var con = mysql.createConnection(credentials);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS Actual_Total_Load", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    con.query(totalload, function(err) {
      if (err) {
      throw err;
      }
      console.log("table total load created")
      })
    });

const fileName ='2022_01_01_01_ActualTotalLoad6.1.A.csv';
const { parse } = require("csv-parse");
const csv = require('csvtojson');
csv({delimiter:'\t'})
    .fromFile(fileName)
    .then((json)=>{
      console.log(json);
      let insertStatement = 
        `INSERT INTO totalload values(?, ?, ?, ?,?)`;
        var items = [json];
        // Inserting data of current row
        // into database
        con.query(insertStatement, items, 
            (err, results, fields) => {
            if (err) {
                console.log(err);
            }
        });
    });

// fs.createReadStream("2022_01_01_01_ActualTotalLoad6.1.A.csv")
//   .pipe(parse({ delimiter: ",", from_line: 1 }))
//   .on("data", function (row) {
//     var DateTime = row.DateTime,
//     ResolutionCode = row["ResolutionCode"],
//     AreaName = row["AreaName"],
//     TotalLoadValue = row["TotalLoadValue"]
//     UpdateTime = row["UpdateTime"]
//     console.log(DateTime);
//   })
//   .on("end", function () {
//     console.log("finished");
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });
