let express = require('express');
let router = express.Router();
let app = express();
let mysql      = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456789sy',
    database:'news'
});
// connection.connect();

/* GET home page. */
// app.get('/', function (req, res) {
//     console.log(req.body);
//     res.json(req.body);
// })
router.get('/', function(req, res, next) {
    let sql = 'SELECT * FROM news';
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json(error);
        }
        res.json(results);
    });
});

//插入新闻
router.post('/insert', function (req, res, next) {
    if (req.body) {
        //能正确解析 json 格式的post参数
        console.log('req.body', req.body);
    }
    let id = 4;
    // let sql = `INSERT INTO news(id,type,title,image,time,src) SELECT 4, '本地', '本地消息', './images/2.jpg', '2012/02/12', 'changAn' FROM DUAL WHERE NOT EXISTS (SELECT * FROM news WHERE id=${id})`; //判断表内不存在 插入数据

    let sql = `INSERT INTO news(id,type,title,image,time,src) SELECT ${req.body.id || 1}, '${req.body.type || ''}', '${req.body.title || ''}', '${req.body.image || ''}', '${req.body.time || ''}', '${req.body.src || ''}' FROM DUAL WHERE NOT EXISTS (SELECT * FROM news WHERE id=${req.body.id || 1})`; //判断表内不存在 插入数据
    console.log('sql', sql);

    // let sql = `SELECT * FROM news WHERE id=1`; //选择表 user
    // let sql = ` WHERE NOT EXISTS(SELECT id FROM news WHERE id=1)`;
    // let sql = `INSERT INTO news(id,type,title,image,time,src) VALUES ('2', '本地', '本地消息', './images/2.jpg', '2012/02/12', 'changAn')`; //判断表内不存在 插入数据

    // let sql = 'SELECT * FROM news';
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json(error);
        }
        res.json(results);
    });
});

//删除新闻
router.post('/delete', function (req, res, next) {
    if (req.body) {
        //能正确解析 json 格式的post参数
        console.log('req.body', req.body);
    }


    let sql = `DELETE FROM news WHERE id=${req.body.id}`;
    console.log('sql', sql);


    // let sql = `SELECT * FROM news WHERE id=1`; //选择表 user
    // let sql = ` WHERE NOT EXISTS(SELECT id FROM news WHERE id=1)`;
    // let sql = `INSERT INTO news(id,type,title,image,time,src) VALUES ('2', '本地', '本地消息', './images/2.jpg', '2012/02/12', 'changAn')`; //判断表内不存在 插入数据

    // let sql = 'SELECT * FROM news';
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json(error);
        }
        res.json(results);
    });
});

//修改新闻
router.post('/edit', function (req, res, next) {
    if (req.body) {
        //能正确解析 json 格式的post参数
        console.log('req.body', req.body);
    }

    let sql = `UPDATE news SET type='${req.body.type || ''}', title='${req.body.title || ''}', image='${req.body.image || ''}', time='${req.body.time || ''}', src='${req.body.src || ''}' WHERE id=${req.body.id}`;
    console.log('sql', sql);


    // let sql = `SELECT * FROM news WHERE id=1`; //选择表 user
    // let sql = ` WHERE NOT EXISTS(SELECT id FROM news WHERE id=1)`;
    // let sql = `INSERT INTO news(id,type,title,image,time,src) VALUES ('2', '本地', '本地消息', './images/2.jpg', '2012/02/12', 'changAn')`; //判断表内不存在 插入数据

    // let sql = 'SELECT * FROM news';
    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json(error);
        }
        res.json(results);
    });
});

module.exports = router;
