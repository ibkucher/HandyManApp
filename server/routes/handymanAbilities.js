var express = require('express')
var router = express.Router()
const database = require('../database')


// Create new handyman_ability
// This is a post request api. Front end will use this api to create new handyman_ability.
// Once handyman_ability is inserted into database it will return newly created handyman_ability to frontend
router.post('/add', (req, res) => {
  let data = req.body
  let handymanID = data.handymanID
  let skillID = data.skillID
  let skillLicenseNo = data.skillLicenseNo
  let issuedDate = data.issuedDate
  let hourlyRate = data.hourlyRate
  console.log(data)
  let query = `INSERT INTO handyman_ability (handyman_id, ability_skill_id, skill_license_no, license_issued_date, hourly_rate) VALUES (${handymanID}, ${skillID}, '${skillLicenseNo}', ${issuedDate}, ${hourlyRate})`
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


// Edit a handyman_ability
// This is a Edit request api. Front end will use this api to eidt a handyman_ability.
// Once handyman_ability is updated into database it will return updated handyman_ability to frontend
router.put('/edit/:id', (req, res) => {
  let data = {
    skill_license_no : req.body.licenseNo,
    license_issued_date : req.body.issuedDate,
  }
  console.log(data)
  let query = 'UPDATE handyman SET ? WHERE handyman_ability = ' + req.params.id
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


// Delete an handyman_ability
// This is a delete request api. Front end will use this api to delete a handyman_ability.
router.delete('/delete/:id', (req, res) => {
  console.log(req.params.id)
  let query = 'Delete From handyman_ability where handyman_ability_id = ' + req.params.id
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


// Get all handyman_abilities
// This will api will return call handyman_ability from database
router.get('/', (req, res) => {
  let query = 'SELECT * FROM handyman_ability'
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


// Get a handyman_ability
// This will api will return call handyman_ability from database
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  let query = 'SELECT * FROM handyman_ability where handyman_ability_id = ' + req.params.id
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
