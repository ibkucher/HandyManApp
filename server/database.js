const mysql = require('mysql')
class Database {
    constructor () {
      this.connection = mysql.createConnection({
        host: '149.202.210.182',
        user: 'helia',
        password: 'SixSmiles',
        database: 'handyman'
      })
    }
    query (sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) { return reject(err) }
                resolve(rows)
            })
        })
    }
    close () {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
}
let database = new Database()
module.exports = database
