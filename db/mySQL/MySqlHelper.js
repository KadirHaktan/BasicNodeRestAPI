const mysql = require('mysql')
const util = require('util')

function makeDb() {
    const host = 'localhost'
    const user = 'root'
    const password = ""
    const database = 'clean-node-api'

    const con = mysql.createConnection({
        host,
        user,
        password,
        database
    })

    function query(sql, args=null) {
        return util.promisify(con.query)
            .call(con, sql, args)
    }

    function close() {
        return util.promisify(con.end).call(con)
    }

    return Object.freeze({
        query,
        close
    })
}

module.exports = makeDb