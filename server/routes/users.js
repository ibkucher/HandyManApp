var express = require('express')
var router = express.Router()
const database = require('../database')
const jwt = require('jsonwebtoken')
const config = require('../config')
const middleware = require('../middleware')
const userService = require('../services/userService')
// Create new user
// This is a post request api. Front end will use this api to create new user.
// Once user is inserted into database it will return newly created user to frontend
router.post('/add', (req, res) => {
  let data = req.body
  console.log(data)
  userService.addUser(data).then((rows) => {
    res.json({
      data: rows
    })
  }).catch((err) => {
    res.sendStatus(400).json({
      success: false,
      message: err
    })
  })
  // let userName = data.loginInfo.userName
  // let password = data.loginInfo.password
  // let email = data.loginInfo.email
  // let userType = data.personalInfo.userType
  // let personalInfo = data.personalInfo
  // let abilities = data.abilities.selectedSkills
  // let availableTime = data.availableTime

  // console.log(data)
  // let query = `INSERT INTO user (user_name, password, email, user_type) VALUES ('${userName}', '${password}', '${email}', ${userType})`
  // console.log(query)
  // database.query(query)
  //   .then(rows => {
  //     let userID = rows.insertId
  //     let handyManQuery = `INSERT INTO handyman VALUES ('H0007','${userID}','${personalInfo.fname}','${personalInfo.lname}','${personalInfo.phone}', '${personalInfo.city}');`

  //     console.log(rows)
  //     database.query(handyManQuery)
  //     .then((rows) => {
  //       database.close().then(() => {
  //         res.json({
  //           data: rows
  //         })
  //       })
  //     })
  //   .catch(err => {
  //     database.close().then(() => {
  //       res.json({
  //         data: err
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //       res.json({
  //         data: err
  //       })
  //     })
  //   })
  //   })
  //   .catch(err => {
  //     database.close().then(() => {
  //       res.json({
  //         data: err
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //       res.json({
  //         data: err
  //       })
  //     })
  //   })
})

// Edit a user
// This is a Edit request api. Front end will use this api to eidt a user.
// Once user is updated into database it will return updated user to frontend
router.put('/edit/:id', middleware.checkToken, (req, res) => {
  // let data = req.body
  let data = {
    first_name: req.body.password
  }
  console.log(data)
  let query = 'UPDATE user SET ? WHERE user_id = ' + req.params.id
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

// Get all users
// This will api will return call users from database
router.get('/', middleware.checkToken, (req, res) => {
  database.query('SELECT * FROM user')
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

// Get(Find) a user for checking Login
// This will api will return call user from database
router.post('/finduser', (req, res) => {
  let data = req.body
  let userName = data.userName
  let password = data.password
      let query = "SELECT * FROM user where user_name = '" + `${userName}` +
                "' and password = '" + `${password}` + "'"
    database.query(query)
        .then(rows => {
          database.close().then(() => {
            if (rows.length === 1) {
              let token = jwt.sign({ userName: userName }, config.secret, { expiresIn: '24h' })
              res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
              })
            } else {
              res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
              })
            }
          })
        }).catch(err => {
          database.close().then(() => {
            res.send(400).json({
              success: false,
              message: 'Authentication failed! Please check the request'
            })
          })
        })
        .catch((error) => {
            res.json({
            data: err
          })
        })
})

// Search for Handyman
// This API will retrun Handyman list based on selected filters
router.post('/searchpostal', middleware.checkToken, (req, res) => {
  let data = req.body.searchFilters

  // TODO: Include skills in filter search
  let query = 'SELECT user.user_name ' +
    'FROM user INNER JOIN address on user.user_id=address.user_id ' +
    'WHERE user.user_type = "2" AND address.postal_code="' + data.pcode + '"'

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

router.get('/profile', middleware.getUserName, (req, res) => {
  debugger
  let data = req.body
  let userName = req.userName

  userService.findUser(userName).then((user) => {
    let query = ''
    if (user[0].user_type === 2) {
      query = `SELECT * FROM user 
      INNER JOIN handyman ON user.user_id = handyman.user_id
      WHERE user.user_name = '${userName}'`
    } else {
      query = `SELECT * FROM user 
      INNER JOIN address1 ON user.user_id = address1.user_id
      INNER JOIN customer ON user.user_id = customer.user_id
      WHERE user.user_name = '${userName}'`
    }
    database.query(query)
    .then(rows => {
      console.log(rows)
      delete rows[0].password
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
  }).catch((e) => {
    res.send(400).json({
      data: e
    })
  })
})

module.exports = router
