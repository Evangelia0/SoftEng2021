const express     = require('express');
const mysql       = require('mysql');
const bodyParser  = require('body-parser');
const fs          = require('fs')
const fastcsv     = require("fast-csv");
const app         = express();
const credentials = require('./config/credentials')
const connection     = require('./config/connect')
const totalload   = require('./config/queries')
const port        = 8000;
//initialize app as an instance of express, the framework

app.use(bodyParser.urlencoded({extended:true}));
//we import the route into the server
require('./routes')(app, {});
app.listen(port, () =>{
    console.log('We are live on port ' + port);
});

//establish a connection
var con = mysql.createConnection(credentials);
connection(con);

const fileName ='2022_01_01_01_ActualTotalLoad6.1.A.csv';
const { parse } = require("csv-parse");

fs.createReadStream(fileName)
  .pipe(parse({ delimiter: "\t", from_line: 2 }))
  .on("data", function (row) {
    let name = row[5].replace("-","_");
    //console.log(row[5].replace("-","_"));
    con.query(totalload(name), function(err) {
      if (err) {
      throw err;
      }
      console.log(`table ${row[5]} created`)
      });
    if(row[3] === 'CTY'){
      console.log(row[3])
      let insertStatement = 
          `INSERT INTO ${name} values(?,?,?,?,?)`;
          var items = [row[0],row[1],row[5],row[6],row[7]];
          /*Inserting data of current row
          into database*/
          con.query(insertStatement, items, 
              (err, results, fields) => {
              if (err.code === 'ER_DUP_ENTRY' || err.erno == 1062) {
                  if(row[7])
              }
          });
        }
    })
  
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
