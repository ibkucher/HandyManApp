var express = require('express')
var router = express.Router()
const database = require('../database')

  // Get all status (requested(Booking) status)
  // This will api will return call status from database
  router.get('/', (req, res) => {
    database.query('SELECT * FROM status')
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
