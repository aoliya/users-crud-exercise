const express = require('express');
const router = express.Router();
const mysql = require("../db");

/* GET all users list list */
router.get('/', (req, res) => {
    let myQuery = "SELECT * FROM users"
    mysql.query(myQuery, (err, result) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(result);
            // console.log(result)
        }
    })
});


/* POST edit user */
router.put("/edit/:userId", (req, res) => {
    let userId = req.params.userId;
    let fullname = req.body.Fullname;
    let email = req.body.Email;
    let myQuery = `UPDATE users SET Fullname = "${fullname}", Email = "${email}" WHERE ID = ${userId}`;
    mysql.query(myQuery, (err, results, fields) => {
        if (err) { res.status(400).json(err) }
        else {
            res.status(201).json(results);
        }

    })
})


/* POST add user */
router.post('/add', (req, res) => {

    let myQuery = `INSERT INTO users (Fullname, Email) VALUES ("${req.body.Fullname}", "${req.body.Email}")`
    mysql.query(myQuery, (err, results) => {
        if (err) { res.status(400).json(err) }
        else {
            res.status(201).json(results);
        }

    })
})



/* POST delete user */
router.delete("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    let myQuery = `DELETE FROM users WHERE ID = ${userId}`;
    mysql.query(myQuery, (err, results, fields) => {
        if (err) { res.status(400).json(err) }
        else {
            res.status(201).json(results);
        }

    })
})



module.exports = router;
