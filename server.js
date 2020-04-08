var lm = require('./logicManagement/logicManagement')

var express = require('express')
var http = require('http')
var app = express()


app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

/**
 * get data filter by values
 * filter: number of words in title
 * max: "true" indicates that the number of words in title must be greater than filter, otherwise words in title must be smaller than filter 
 * sort: indicates the field by which it will be ordered
 * orientation: sort in asc/desc order
 */
app.get('/data/:filter/:max/:sort/:orientation', (req, res) => {
    lm.getData(parseInt(req.params.filter), req.params.max, req.params.sort, req.params.orientation, false).then(data => {
        res.status(200).send({ message: 'OK', data: data });
    })
  })

  /**
 * get all data
 */
  app.get('/data', (req, res) => {
    lm.getData(0, '', '', '', true).then(data => {
        res.status(200).send({ message: 'OK', data: data });
    })
  })
  

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});