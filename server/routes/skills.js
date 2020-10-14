var express = require('express')
var router = express.Router()
const database = require('../database')

  // Get all skills
  // This will api will return call skills from database
  router.get('/', (req, res) => {
    database.query('SELECT * FROM skill')
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

  // Create new Handyman skill
// This is a post request api. Front end will use this api to create new homeowner.
// Once user is inserted into database it will return newly created user to frontend
router.post('/add', (req, res) => {
  console.log('skills.js posting /add')
  let data = req.body
  let skillID = data.skillId
  //let skillID = 3
  let skillName = data.skillName
  let skillDesc = data.skillDesc
  
  console.log(data)
  
  let query = `INSERT INTO skill (skill_id, skill_name, skill_desc) 
                VALUES ('${skillID}', '${skillName}', '${skillDesc}')`
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

  module.exports = router
