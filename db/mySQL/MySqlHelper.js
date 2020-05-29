const mysql = require('mysql')
const util = require('util')

function makeDb() {
    const host = process.env.localhost
    const user = process.env.user
    const password = process.env.password
    const database = process.env.database

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