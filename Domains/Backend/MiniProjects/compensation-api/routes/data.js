var express = require('express');
var router = express.Router();
const fs = require("fs");
const { parse } = require("csv-parse");

router.get('/', function(req, res, next) {

  let query_params = req.query;
  
  let resultset = [];

  // Get the raw data & format it
  fs.createReadStream("./salary_survey-2.csv")
  .pipe(parse(
    {
      delimiter: ",",
      from_line: 1,
      skip_records_with_empty_values: true,
      columns: (header) => header.map((column) => {
        trimmed_column = column.replaceAll(" ", "_");
        alphanumeric_column = trimmed_column.replace(/\W/g, '');
        return alphanumeric_column.toLowerCase();
      }),
    }
  ))

  .on("data", function (row) {
    // console.log(row);
    resultset.push(row);
  })
  .on("end", function () {
    let fields = []
    let sort_by = '';
    if(query_params.fields != undefined){
      fields = query_params.fields.split(",");
      delete query_params.fields
    }
    if(query_params.sort != undefined){
      sort_by = query_params.sort;
      delete query_params.sort
    }
    // console.log("query_params: ", query_params);
    let query_params_keys= Object.keys(query_params);
    // console.log("query_params_keys: ", query_params_keys);
    let final_result = []

    // filter_where engine
    if(query_params_keys.length > 0) {
      resultset = resultset.filter(
        (resultrow) => {
          for(let x=0;x<query_params_keys.length;x++){
            // console.log(
            //   query_params[query_params_keys[x]], 
            //   resultrow[query_params_keys[x]], 
            //   query_params[query_params_keys[x]] == resultrow[query_params_keys[x]]
            // )
            if (query_params[query_params_keys[x]] != resultrow[query_params_keys[x]]) return false;
          }
          return true;
        }
      );
    }

    // filter_select_field engine
    if(fields.length > 0 ) {
      
      console.log('fields: ', fields);
      let rs = []
      for(let x=0;x<resultset.length;x++){
        let temp = {}
        for(let y=0;y<fields.length;y++){
          temp[fields[y]]=resultset[x][fields[y]]
        }        
        rs.push(temp)
      }
      // console.log(rs)
      resultset = rs
    }

    // Sorting engine
    if(sort_by!=''){
      resultset.sort((a, b) => {
        if (a[sort_by] < b[sort_by]) return -1;
        if (a[sort_by] > b[sort_by]) return 1;
        return 0;
      });      
    }

    final_result = resultset;    
    res.status(200).json(final_result);
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
});

module.exports = router;
