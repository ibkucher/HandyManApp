var express = require('express')
var router = express.Router()
const database = require('../database')

// Create new customer (HomeOwner)
// This is a post request api. Front end will use this api to create new homeowner.
// Once user is inserted into database it will return newly created user to frontend
router.post('/add', (req, res) => {
  let data = req.body
  let userID = data.userID
  let firstName = data.firstName
  let lastName = data.lastName
  let phoneNum = data.phoneNum
  let workLocation = req.body.workLocation
  let workArea = req.body.workArea
  let workDays = req.body.workDays
  let workStartTime = req.body.workStartTime
  let workEndTime = req.body.workEndTime
  console.log(data)
  let query = `INSERT INTO handyman (user_id, first_name, last_name, phone_num, work_location, work_avaliable_area, work_available_days, work_start_time, work_end_time) VALUES ('${userID}', '${firstName}', '${lastName}', ${phoneNum}, ${workLocation}, ${workArea}, ${workDays}, ${workStartTime}, ${workEndTime})`
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

// Edit a HandyMan
// This is a Edit request api. Front end will use this api to eidt a handyman.
// Once handyman is updated into database it will return updated handyman to frontend
router.put('/edit/:id', (req, res) => {
  let data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    phone_num: req.body.phoneNum,
    work_location: req.body.workLocation,
    work_avaliable_area: req.body.workArea,
    work_available_days: req.body.workDays,
    work_start_time: req.body.workStartTime,
    work_end_time: req.body.workEndTime
  }
  console.log(data)
  let query = 'UPDATE handyman SET ? WHERE handyman_id = ' + req.params.id
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

// Get all handymen
// This will api will return call handymen from database
router.get('/', (req, res) => {
  let query = 'select hm.handyman_id, sv.service_id, sv.service_name, hm.first_name, hm.last_name, hm.phone_num, ' +
                  'ha.skill_license_no, sk.skill_name, sk.skill_desc, hm.work_location, ' +
                  'hm.work_avaliable_area, hm.work_available_days, hm.work_start_time, hm.work_end_time, ha.hourly_rate ' +
                'from service sv ' +
                  'join skill sk on sv.service_id = sk.service_id ' +
                  'join handyman_ability ha on ha.ability_skill_id = sk.skill_id ' +
                  'join handyman hm on hm.handyman_id = ha.handyman_id '
  // let query = 'SELECT * FROM handyman'
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

// Get a handyman
// This will api will return call handyman from database
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  let query = 'SELECT * FROM handyman where handyman_id = ' + req.params.id
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

// Get searched handymen list (location, skill, requestDate)
// This will api will return call handymen from database
router.get('/search/list', (req, res) => {
  console.log(req.body)
  let data = req.body
  let skill = '%'
  let workLocation = req.body.workLocation
  let requestDate = req.body.requestDate
  /*
  let skill = "%"  //req.body.skill
  let workLocation = "%" //req.body.workLocation
  let requestDate = '2019-11-12' //req.body.requestDate
  */
  console.log(data)
  let query = 'select hm.handyman_id, sv.service_name, hm.first_name, hm.last_name, hm.phone_num, ' +
                  'ha.skill_license_no, sk.skill_name, sk.skill_desc, hm.work_location, ' +
                  'hm.work_avaliable_area, hm.work_available_days, hm.work_start_time, hm.work_end_time, ha.hourly_rate ' +
                'from service sv ' +
                  'join skill sk on sv.service_id = sk.service_id ' +
                  'join handyman_ability ha on ha.ability_skill_id = sk.skill_id ' +
                  'join handyman hm on hm.handyman_id = ha.handyman_id ' +
                'Where ha.ability_skill_id like ' + `'${skill}'` +
                ' and hm.work_location like ' + `'${workLocation}'` +
                ' and hm.work_available_days in (Select case ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 0 then 1 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 1 then 1 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 2 then 1 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 3 then 1 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 4 then 1 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 5 then 2 ' +
                                    ' when WEEKDAY(' + `'${requestDate}'` + ') = 6 then 2 ' +
                                      ' end as workDays ' +
                                    ' UNION ALL ' +
                                    'SELECT 3 workDays' +
                                    ') '
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
