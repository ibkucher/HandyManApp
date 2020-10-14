var express = require('express')
var router = express.Router()
const database = require('../database')

  // Get all skills
  // This will api will return call skills from database
  router.get('/', (req, res) => {
    database.query('SELECT * FROM service')
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
