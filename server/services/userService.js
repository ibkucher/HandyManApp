const database = require('../database')

let addUser = function (data) {
    return new Promise((resolve, reject) => {
        findUser(data.loginInfo.userName).then((rows) => {
            if (rows.length >= 1) {
                reject(new Error({ error: 'User Name is taken' }))
            } else {
                let userType = data.personalInfo.userType

                if (userType === 1) {
                    addHomeowner(data).then((rows) => {
                        resolve(rows)
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    addHandyman(data).then((rows) => {
                        resolve(rows)
                    }).catch((error) => {
                        reject(error)
                    })
                }
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

function addHomeowner (data) {
    let userName = data.loginInfo.userName
    let password = data.loginInfo.password
    let email = data.loginInfo.email
    let userType = data.personalInfo.userType
    let personalInfo = data.personalInfo
    let fname = personalInfo.fname
    let lname = personalInfo.lname
    let phone = personalInfo.phone
    let street = personalInfo.addres
    let city = personalInfo.city
    let province = personalInfo.province
    let pcode = personalInfo.pcode
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO user (user_name, password, email, user_type) 
        VALUES ('${userName}', '${password}', '${email}', ${userType})`

        database.query(query).then((rows) => {
            let userID = rows.insertId
            let customerQuery = `INSERT INTO customer (user_id, first_name, last_name, phone_num)
             VALUES ('${userID}','${fname}','${lname}','${phone}');`

            let addressQuery = `INSERT INTO address1 (user_id, street, city, province, postal_code, used_address)
            VALUES ('${userID}', '${street}', '${city}', '${province}', '${pcode}', 'Y');`
            database.query(customerQuery).then((rows) => {
                resolve(rows)
                database.query(addressQuery).then((rows) => {
                    resolve(rows)
                }).catch((error) => {
                    reject(error)
                })
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

function addHandyman (data) {
    let userName = data.loginInfo.userName
    let password = data.loginInfo.password
    let email = data.loginInfo.email
    let userType = data.personalInfo.userType
    let personalInfo = data.personalInfo
    let abilities = data.abilities.selectedSkills
    let availabilities = data.availabilities

    return new Promise((resolve, reject) => {
        let query = `INSERT INTO user (user_name, password, email, user_type) 
        VALUES ('${userName}', '${password}', '${email}', ${userType})`

        database.query(query).then((rows) => {
            let userID = rows.insertId
            let handyManQuery = `INSERT INTO handyman (user_id, first_name, last_name, phone_num,work_location, work_avaliable_area, work_available_days, work_start_time, work_end_time) 
            VALUES ('${userID}','${personalInfo.fname}','${personalInfo.lname}','${personalInfo.phone}', '${personalInfo.city}', null, '${availabilities.availableTime}', '${availabilities.startTime}', '${availabilities.endTime}');`

            database.query(handyManQuery).then((handyManRows) => {
                let getHandyManIDquery = `SELECT * from handyman where user_id = '${userID}'`

                database.query(getHandyManIDquery).then((results) => {
                    let handymanId = results[0].handyman_id
                    let promises = []
                    abilities.forEach((ability) => {
                        let abilityQuery = `INSERT INTO handyman_ability (handyman_id, ability_skill_id, skill_license_no, license_issued_date, hourly_rate)
                        VALUES ('${handymanId}', '${ability.id}', null, null, 0)`
                        promises.push(database.query(abilityQuery))
                    })
                    Promise.all(promises).then((skillsRows) => {
                        console.log(skillsRows)
                        resolve(skillsRows)
                    }).catch((error) => {
                        console.log(error)
                        reject(error)
                    })
                }).catch((error) => {
                    reject(error)
                })
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

function findUser (userName) {
    let query = `SELECT * from user where user_name = '${userName}'`

    return database.query(query)
}

function findCustomer (userName) {
    return findUser(userName).then((user) => {
        let query = `SELECT * from customer where user_id = '${user[0].user_id}'`

        return database.query(query)
    })
}

function findHandyman (userName) {
    return findUser(userName).then((user) => {
        let query = `SELECT * from handyman where user_id = '${user[0].user_id}'`

        return database.query(query)
    })
}

function findHandymanById (id) {
    let query = `SELECT * from handyman where handyman_id = '${id}'`

    return database.query(query)
}
module.exports = {
    addUser,
    findUser,
    findCustomer,
    findHandyman,
    findHandymanById
}
