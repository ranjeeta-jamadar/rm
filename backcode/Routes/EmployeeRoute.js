import express, { response } from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'

const router = express.Router()


router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from employee Where email = ?"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong password" })
                    if(response) {
                        const email = result[0].email;
                        const token = jwt.sign(
                { role: "employee", email: email, id: result[0].id }, 
                "jwt_secret_key", 
                { expiresIn: '1d' }
                   )
                   res.cookie('token', token)
                   return res.json({ loginStatus: true, id: result[0].id })
                    } 
            })
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" })
        }
    })
})

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.put('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee
    set name= ?, start_date = ?, end_date = ?, leavetype = ?, status = ?, reason = ?
    Where id = ?`
    const values = [
        req.body.name,
        req.body.start_date,
        req.body.end_date,
        req.body.leavetype,
        req.body.status,
        req.body.reason
    ]
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

router.post('/leave', (req, res) => {   //attendance login
    const sql = `INSERT INTO attendance
     (emp_id ,emp_name ,logged_in_location  ) 
     VALUES (?)`;
        const values = [
    req.body.emp_id,        
    req.body.emp_name,
    req.body.logged_in_location,
    
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
    })
})


router.post('/micro', (req, res) => {   //attendance logout
    const sql = `INSERT INTO attendance1
     (emp_name ,logged_out_location  ) 
     VALUES (?)`;
        const values = [  
    req.body.emp_name,
    req.body.logged_out_location,
    
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
    })
})

router.get('/fetch/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM leavepage where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.get('/attendence/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.put('/attendence/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee
    set name= ?, start_date = ?, end_date = ?, leavetype = ?, status = ?, reason = ?
    Where id = ?`
    const values = [
        req.body.name,
        req.body.start_date,
        req.body.end_date,
        req.body.leavetype,
        req.body.status,
        req.body.reason
    ]
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
    })
})


router.get('/leave/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.put('/leave/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee
    set name= ?, start_date = ?, end_date = ?, leavetype = ?, status = ?, reason = ?
    Where id = ?`
    const values = [
        req.body.name,
        req.body.start_date,
        req.body.end_date,
        req.body.leavetype,
        req.body.status,
        req.body.reason
    ]
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
    })
})

router.put('/micro/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE attendance set logged_out_time = CURRENT_TIMESTAMP,  logged_out_location=? Where id = ?'
    const values = [
        req.body.logged_out_location,
    ]
    console.log("sql",sql)
    con.query(sql,[...values, id], (err, result) => {
        console.log("error", err)
        console.log("result", result)
        if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
    })
})

export { router as EmployeeRouter }