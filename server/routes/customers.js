var express = require('express')
var router = express.Router()
const database = require('../database')


// Create new customer (HomeOwner)
// This is a post request api. Front end will use this api to create new homeowner.
// Once user is inserted into database it will return newly created customer to frontend
router.post('/add', (req, res) => {
  let data = req.body
  let userID = data.userID
  let firstName = data.firstName
  let lastName = data.lastName
  let phoneNum = data.phoneNum
  console.log(data)
  let query = `INSERT INTO customer (user_id, first_name, last_name, phone_num) VALUES ('${userID}', '${firstName}', '${lastName}', ${phoneNum})`
  console.log(query, data)
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


// Edit a customer (HomeOwner)
// This is a Edit request api. Front end will use this api to eidt a homeowner.
// Once homeowner is updated into database it will return updated homeowner to frontend
router.put('/edit/:id', (req, res) => {
  //let data = req.body
  let data = {
    first_name : req.body.firstName,
    last_name : req.body.lastName,
    phone_num : req.body.phoneNum
  }
  console.log(data)
  let query = 'UPDATE customer SET ? WHERE customer_id = ' + req.params.id
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


// Get all customers
// This will api will return call customer from database
router.get('/', (req, res) => {
  let query = 'SELECT * FROM customer'
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

// Get a customer
// This will api will return call customer from database
router.get('/:id', (req, res) => {
console.log(req.params.id)
let query = 'SELECT * FROM customer where customer_id = ' + req.params.id
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
