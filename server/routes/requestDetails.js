var express = require('express')
var router = express.Router()
const database = require('../database')


// Create new request_details (booking details)
// This is a post request api. Front end will use this api to create new request_details (booking details).
// Once request is inserted into database it will return newly created request_details (booking details) to frontend
router.post('/add', (req, res) => {
  let data = req.body
  let requestID = data.requestID
  let serviceID = data.serviceID
  let cost = data.cost
  let handymanID = data.handymanID
  let requestStausID = data.requestStausID 
  let expectedWorkDate = data.expectedWorkDate
  let expectedWorkTime = data.expectedWorkTime
  let fixedDate = data.fixedDate   
  console.log(data)
  let query = `INSERT INTO request_detail (request_id, service_id, cost, handyman_id, request_status_id, expected_work_date, expected_work_time, fixed_date) VALUES (${requestID}, ${serviceID}, ${addressID}, ${cost}, ${handymanID}, ${requestStausID}, ${expectedWorkDate}, ${expectedWorkTime}, ${fixedDate} )`
  console.log(query)
  database.query(query)
      .then(rows => {
        database.close().then(() => {
          res.json({
            data: rows
          })
        })
      })
      .catch(err => {
        database.close().then(() => {
          res.json({
            data: err
          })
      }).catch((error) => {
            console.log(error)
            res.json({
            data: err
          })
      })
  })
})


// Edit a request_details (booking details)
// This is a Edit request api. Front end will use this api to eidt a request_details (booking details).
// Once request_details (booking details) is updated into database it will return updated a request_details (booking details) to frontend
router.put('/edit/:id', (req, res) => {
  //let data = req.body
  let data = {
    service_id : req.serviceID,
    cost : req.cost,
    handyman_id : req.handymanID,
    request_staus_id : req.requestStausID, 
    expected_work_date : req.expectedWorkDate,  
    expected_work_time : req.expectedWorkTime,
    fixed_date : req.fixedDate 

  }
  console.log(data)
  let query = 'UPDATE request_detail SET ? WHERE request_id = ' + req.params.id
  database.query(query, data)
      .then(rows => {
        database.close().then(() => {
          res.json({
            data: rows
          })
        })
      })
      .catch(err => {
        database.close().then(() => {
          res.json({
            data: err
          })
      }).catch((error) => {
            console.log(error)
            res.json({
            data: err
          })
      })
  })
})


// Delete a request_details (booking details)
// This is a delete request api. Front end will use this api to delete a request_details (booking details).
router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    let query = 'Delete From request_detail where request_id = ' + req.params.id
    console.log(query)
    database.query(query)
        .then(rows => {
          database.close().then(() => {
            res.json({
              data: rows
            })
          })
        })
        .catch(err => {
          database.close().then(() => {
            res.json({
              data: err
          })
        }).catch((error) => {
              console.log(error)
                res.json({
              data: err
            })
        })
      })
    })


// Get all request_details (booking details)
// This will api will return call request_details (booking details) from database
router.get('/', (req, res) => {
  let query = 'SELECT * FROM request_detail ORDER BY request_id, request_detail_id'
  console.log(query)
  database.query(query)
      .then(rows => {
        database.close().then(() => {
          res.json({
            data: rows
          })
        })
      })
      .catch(err => {
        database.close().then(() => {
          res.json({
            data: err
        })
      }).catch((error) => {
            console.log(error)
              res.json({
            data: err
          })
      })
    })
})

// Get a request_details (booking details)
// This will api will return call request_details (booking details) from database
router.get('/:id', (req, res) => {
console.log(req.params.id)
let query = 'SELECT * FROM request_detail where request_id = ' + req.params.id + 
              ' ORDER BY request_id, request_detail_id '
console.log(query)
database.query(query)
    .then(rows => {
      database.close().then(() => {
        res.json({
          data: rows
        })
      })
    })
    .catch(err => {
      database.close().then(() => {
        res.json({
          data: err
      })
    }).catch((error) => {
          console.log(error)
            res.json({
          data: err
        })
    })
  })
})

module.exports = router
