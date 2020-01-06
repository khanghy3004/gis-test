var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gis"
});

module.exports  = {
    select: function (callback) {
        con.query('SELECT * FROM info', function (err, result , fields) {
            if (err) {
                callback("error", err)
            } else {
                callback("success", result)
            }
        });
    }
}