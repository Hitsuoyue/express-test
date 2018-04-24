let express = require('express');
let router = express.Router();
let mysql      = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456789sy',
    database:'sys'
});
// connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM `sys_config`', function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error;
        }
        res.json(results);
    });
});

module.exports = router;
