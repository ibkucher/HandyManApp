var express = require('express')
var router = express.Router()
const database = require('../database')
const middleware = require('../middleware');

// Search for Handyman
// This API will retrun Handyman list based on selected filters
router.post('/', middleware.checkToken, (req, res) => {
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

module.exports = router
