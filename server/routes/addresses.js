var express = require('express')
var router = express.Router()
const database = require('../database')

// Create new address
// This is a post request api. Front end will use this api to create new address.
// Once address is inserted into database it will return newly created address to frontend
router.post('/add', (req, res) => {
  let data = req.body
  let userID = data.userID
  let street = data.street
  let city = data.city
  let province = data.province
  let postalCode = data.postalCode
  let usedAddress = data.usedAddress
  console.log(data)
  let query = `INSERT INTO address1 (user_id, street, city, province, postal_code, used_address) VALUES (${userID}, '${street}', '${city}', '${province}', '${postalCode}', '${usedAddress}')`
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

// Edit an address
// This is a Edit request api. Front end will use this api to eidt an address.
// Once homeowner is updated into database it will return updated address to frontend
router.put('/edit/:id', (req, res) => {
  // let data = req.body
  let data = {
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postalCode,
    used_address: req.body.usedAddress
  }
  console.log(data)
  let query = 'UPDATE address1 SET ? WHERE user_id = ' + req.params.id
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

// Delete an address
// This is a delete request api. Front end will use this api to delete an address.
router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    let query = 'Delete From address1 where user_id = ' + req.params.id
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

// Get all addresses
// This will api will return call address from database
router.get('/', (req, res) => {
  let query = 'SELECT * FROM address1'
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

// Get a address
// This will api will return call address from database
router.get('/:id', (req, res) => {
console.log(req.params.id)
let query = 'SELECT * FROM address1 where user_id = ' + req.params.id
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
