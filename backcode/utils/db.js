import mysql from 'mysql'

const con = mysql.createConnection({
    host: "103.104.231.196",
    user: "sukalpa1",
    password: "1234@sukalpa",
    database: "employeeks",
    port: "3306"
})

con.connect(function(err) {
    if(err) {
        console.log("connection err")
    } else {
        console.log("Connected")
    }
})

export default con;