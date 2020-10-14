var express = require('express')
var router = express.Router()
const database = require('../database')

  // Get all workday
  // This will api will return call workdays from database
  router.get('/', (req, res) => {
    database.query('SELECT * FROM workday')
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
