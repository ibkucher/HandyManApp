const jwt = require('jsonwebtoken')
const config = require('./config')

/**
 * Verify token sent by client. Allow next if token is found else return 401 with error
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let checkToken = (req, res, next) => {
  let token = req.headers['token'] || req.headers['authorization']
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.send(401).json({
      success: false,
      message: 'Auth token is not provided'
    })
  }
}

/**
 * Decode username from the token sent by client. If token is valid allow next else return 401 with error
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let getUserName = (req, res, next) => {
  let token = req.headers['token'] || req.headers['authorization']
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    let payload = jwt.decode(token, config.secret)

    if (payload) {
      req.userName = payload.userName
      next()
    } else {
      return res.json({
        success: false,
        message: 'Token is not valid'
      })
    }
  } else {
    return res.send(401).json({
      success: false,
      message: 'Auth token is not provided'
    })
  }
}

module.exports = {
  checkToken,
  getUserName
}
