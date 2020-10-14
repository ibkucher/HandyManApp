var express = require('express')
var router = express.Router()
const database = require('../database')
const middleware = require('../middleware')
const userService = require('../services/userService')
var nodeMailer = require('nodemailer')

// Create new request (booking)
// This is a post request api. Front end will use this api to create new request (booking).
// Once request is inserted into database it will return newly created request (booking) to frontend
router.post('/add', middleware.getUserName, (req, res) => {
  let data = req.body
  let customerID = data.customerID
  let requestDate = data.requestDate
  let addressID = data.addressID
  let totalCost = data.totalCost
  let requestStatus = data.requestStatus
  let serviceId = data.serviceId
  let handymanId = data.handymanId
  let appointmentDate = data.appointmentDate
  let appointmentTime = data.appointmentTime
  data.userName = req.userName
  let query = `INSERT INTO request (customer_id, request_date, address_id, total_cost, request_status) VALUES ('${customerID}', ${requestDate}, ${addressID}, ${totalCost}, '${requestStatus}')`
  database.query(query)
      .then(rows => {
        let requestId = rows.insertId
        let detailsQuery = `INSERT INTO request_detail (request_id, service_id, cost, handyman_id, request_status_id, expected_work_date, expected_work_time, fixed_date) VALUES (${requestId}, ${serviceId}, null, '${handymanId}', null, '${appointmentDate}', '${appointmentTime}', '${appointmentDate}')`
        database.query(detailsQuery)
          .then((detailsRows) => {
            sendEmail(data).then(() => {
              database.close().then(() => {
                res.json({
                  data: detailsRows
                })
              })
            }).catch(() => {
              res.json({
                message: 'Appoinment has been booked. But something is wrong with email server'
              })
            })
          }).catch((err) => {
            res.json({
              data: err
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

// Edit a request (booking)
// This is a Edit request api. Front end will use this api to eidt a request (booking).
// Once request (booking) is updated into database it will return updated a request (booking) to frontend
router.put('/edit/:id', (req, res) => {
  // let data = req.body
  let data = {
    address_id: req.addressID,
    total_cost: req.totalCost,
    request_status: req.requestStatus
  }
  console.log(data)
  let query = 'UPDATE request SET ? WHERE request_id = ' + req.params.id
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

// Delete a request (booking)
// This is a delete request api. Front end will use this api to delete a request (booking).
router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    let query = 'Delete From request where request_id = ' + req.params.id
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

// Get all requests (booking)
// This will api will return call request (booking) from database
router.get('/', middleware.getUserName, (req, res) => {
  let userName = req.userName
  userService.findCustomer(userName).then((customer) => {
    let query = `SELECT * FROM request 
      INNER JOIN request_detail ON request.request_id = request_detail.request_id
      INNER JOIN service ON request_detail.service_id = service.service_id
      INNER JOIN handyman ON request_detail.handyman_id = handyman.handyman_id
      WHERE request.customer_id = '${customer[0].customer_id}'`

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
  }).catch((error) => {
      res.json({
        data: error
      })
  })
})

// Get a request (booking)
// This will api will return call request (booking) from database
router.get('/:id', (req, res) => {
console.log(req.params.id)
let query = 'SELECT * FROM request where request_id = ' + req.params.id
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

function sendEmail (data) {
  getCustomersTemplate(data).then((customerMailOptions) => {
    getHandymanTemplate(data).then((handyManMailOptions) => {
      let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            // should be replaced with real sender's account
            user: 'sixsimiles@gmail.com',
            pass: 'sixsmiles10#'
        }
      })
      let customerEmailSent = new Promise((resolve, reject) => {
        transporter.sendMail(customerMailOptions, (error, info) => {
            if (error) {
              reject(error)
            }
            if (info) {
              resolve(info)
            }
        })
      })

      let handymanEmailSent = new Promise((resolve, reject) => {
        transporter.sendMail(handyManMailOptions, (error, info) => {
          if (error) {
            reject(error)
          }
          if (info) {
            resolve(info)
          }
        })
      })

      return Promise.all([customerEmailSent, handymanEmailSent])
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })
}

function getCustomersTemplate (data) {
  let appointmentDate = data.appointmentDate
  let appointmentTime = data.appointmentTime
  // let userName = data.userName
  let handymanId = data.handymanId
  let serviceId = data.serviceId

  return new Promise((resolve, reject) => {
    userService.findCustomer(data.userName).then((customer) => {
      let firstName = customer[0].first_name
      let userId = customer[0].user_id

      fetchEmailData({ userId, handymanId, serviceId }).then((data) => {
        let user = data[0][0]
        let handyman = data[1][0]
        let service = data[2][0]

        let mailOptions = {
              // should be replaced with real recipient's account
              to: user.email,
              subject: 'Hanyman appointment confirmation',
              html: `
              <div>
                  <h2>Appointment confirmations</h2>
                  <p>Hello ${firstName}, Your appointment has been booked. Please find the details below.</p>
                  <h3>Appointment Deatils</h3>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Time:</strong> ${appointmentTime}</p>
                  <p><strong>Service:</strong>${service.service_name} </p>
                  <p><strong>Handyman name:</strong> ${handyman.first_name}</p>
                  <p><strong>Handyman phone:</strong> ${handyman.phone_num}</p>
              </div>`
          }

          resolve(mailOptions)
       }).catch((err) => {
          reject(err)
       })
    }).catch((err) => {
      reject(err)
    })
  })
}

function getHandymanTemplate (data) {
  let appointmentDate = data.appointmentDate
  let appointmentTime = data.appointmentTime
  // let userName = data.userName
  let handymanId = data.handymanId
  let serviceId = data.serviceId

  return new Promise((resolve, reject) => {
    userService.findHandymanById(handymanId).then((handyman) => {
      let userId = handyman[0].user_id

      fetchEmailData({ userId, handymanId, serviceId }).then((data) => {
        let user = data[0][0]
        let handyman = data[1][0]
        let service = data[2][0]

        let mailOptions = {
          // should be replaced with real recipient's account
          to: user.email,
          subject: 'Hanyman- Service request',
          html: `
          <div>
              <h2>Service request</h2>
              <p>Hello ${handyman.first_name}, You have new Service request. Please find the details below.</p>
              <h3>Deatils</h3>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${appointmentTime}</p>
              <p><strong>Service:</strong> ${service.service_name}</p>
              <p><strong>Customer name:</strong> ${user.first_name}</p>
          </div>`
       }

        resolve(mailOptions)
     }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

function fetchEmailData (data) {
  let query = `SELECT * FROM user WHERE user_id = '${data.userId}'`
  let handymanQuery = `SELECT * FROM handyman WHERE handyman_id = '${data.handymanId}'`
  let serviceQuery = `SELECT * FROM service WHERE service_id = '${data.serviceId}'`

  let promiseArray = [
    database.query(query),
    database.query(handymanQuery),
    database.query(serviceQuery)
  ]

  return Promise.all(promiseArray)
}
module.exports = router
