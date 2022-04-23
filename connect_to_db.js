const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// const csvtojson = require('csvtojson');
const credentials = require('./credentials')
const totalload = require('./queries')
const change = require('./queries')
var Iconv = require('iconv-lite');
const fs = require('fs')
const languageEncoding = require("detect-file-encoding-and-language");


var con = mysql.createConnection({
  host: credentials.host,
  port: credentials.port,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});

//instance of express, the framework
const app = express()


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
    });
  // con.query(change, function(err) {
  //   if (err) {
  //   throw err;
  //     }
  //   })
});

app.listen('3000',err => {
  if (err) throw err;
  console.log('Server running on port 3000!')
}
)

const fileName = "C:/Users/Evangelia/OneDrive/Έγγραφα/SAAS_2022/._2022_01_01_00_ActualTotalLoad6.1.A.csv";
languageEncoding(fileName).then((fileInfo) => console.log(fileInfo));
// const fileName = "countries_data.csv";


fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err);
  }
});
 
// var iconv = new Iconv(encoding, 'UTF-8');
// var buffer = iconv.convert(content);
// console.log(buffer.toString('utf-8'))
// });

// csvtojson().fromFile(fileName).then(source => {
  
//     // Fetching the data from each row 
//     // and inserting to the table "sample"
//     for (var i = 0; i < source.length; i++) {
//         var DateTime = source[i]["DateTime"],
//             ResolutionCode = source[i]["ResolutionCode"],
//             AreaName = source[i]["AreaName"],
//             TotalLoadValue = source[i]["TotalLoadValue"]
//             UpdateTime = source[i]["UpdateTime"]
            //console.log(iconv.decode(DateTime,'utf-8'));
            // console.log(typeof(DateTime))
    //     var insertStatement = 
    //     `INSERT INTO totalload values(?, ?, ?, ?,?)`;
    //     var items = [DateTime, ResolutionCode, AreaName, TotalLoadValue,UpdateTime];
    //     // Inserting data of current row
    //     // into database
    //     con.query(insertStatement, items, 
    //         (err, results, fields) => {
    //         if (err) {
    //             console.log(
    // "Unable to insert item at row ", i + 1);
    //             return console.log(err);
    //         }
    //     });
  //   }
  // });

