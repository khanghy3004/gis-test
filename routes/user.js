
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function (req, res) {
   message = '';
   check = 0;
   if (req.method == "POST") {
      var post = req.body;
      var name = post.name;
      var email = post.email;
      var pass = post.pass;
      var re_pass = post.re_pass;

      var pattern = new RegExp("^(?![_ -])(?:(?![_ -]{2})[\w -]){5,16}(?<![_ -])$");
      var x = pattern.test(name);
      console.log(x, name, email, pass, re_pass);

      if (name != "" && email != "" && pass != "" && re_pass != "") {
         if (pass != re_pass) {
            message = "Mật khẩu không khớp!";
            res.render('signup.ejs', { message: message, check: false });
            return;
         }
         var crypto = require('crypto');
         var hash = crypto.createHash('md5').update(pass).digest("hex");
         var sql_check = "SELECT email FROM users WHERE email='"+email+"'";
         var sql = "INSERT INTO users(name,email,password) VALUES ('" + name + "','" + email + "','" + hash + "')";

         db.query(sql_check, function (err, result) {
            if (result.length > 0) {
               message = "Email đã tồn tại!";
               res.render('signup.ejs', { message: message, check: false });
            } else {
               db.query(sql, function (err, result) {
                  message = "Bạn đã tạo tài khoản thành công!";
                  res.render('signup.ejs', { message: message, check: true });
               });  
            }
            
         });
      }
      else {
         message = "Không được để trống!";
         res.render('signup.ejs', { message: message, check: false });
      }   
   } else {
      res.render('signup.ejs');
   }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
   var message = '';
   var sess = req.session;

   if (req.method == "POST") {
      var post = req.body;
      var email = post.email;
      var pass = post.pass;

      var crypto = require('crypto');
      var hash = crypto.createHash('md5').update(pass).digest("hex");

      var sql = "SELECT id, name, email FROM users WHERE email='" + email + "' and password = '" + hash + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else {
            message = 'Sai email hoặc mật khẩu';
            res.render('index.ejs', { message: message });
         }

      });
   } else {
      res.render('index.ejs', { message: message });
   }

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.dashboard = function (req, res, next) {

   var userId = req.session.userId;
   console.log('userId = ' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM users WHERE id='" + userId + "'";
   db.query(sql, function (err, result) {
      res.render('dashboard.ejs', { data: result });
   });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM users WHERE id='" + userId + "'";
   db.query(sql, function (err, result) {
      res.render('profile.ejs', { data: result, message: '' });
   });
};
exports.changepass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var message = '';
   var sess = req.session;

   if (req.method == "POST") {
      var post = req.body;
      var pass = post.pass;
      var new_pass = post.new_pass;
      var re_new_pass = post.re_new_pass;

      var crypto = require('crypto');
      var hash = crypto.createHash('md5').update(pass).digest("hex");

      var sql = "SELECT id FROM users WHERE id='" + userId + "' and password = '" + hash + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            if (new_pass == re_new_pass) {
               hash = crypto.createHash('md5').update(new_pass).digest("hex");
               var sql = "UPDATE users SET password = '"+hash+"' WHERE id = '"+userId+"'";
               db.query(sql, function (err, results) {
                  res.redirect("/login");
               });
            } else {
               message = 'Mật khẩu mới không khớp';
               res.render('profile.ejs', { message: message });
            }
         } else {
            message = 'Sai mật khẩu cũ';
            res.render('profile.ejs', { message: message });
         }
      });  

   } else {
      res.render('profile.ejs', { message: message });
   }
};
//-------------------------------- MAP --------------------------------
exports.map = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM users WHERE id='" + userId + "'";
   db.query(sql, function (err, result) {
      res.render('vip.ejs', { data: result });
   });
};

exports.download = function (req, res) {
   var userId = req.session.userId;
   var id = req.query.id;
   var date = req.query.date;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT id, dirt, noise, water, DATE_FORMAT(time, '%d-%m-%Y %H:%i:%s') AS time FROM info WHERE time >= '"+date+"' and id="+id;
   
   
   db.query(sql, function (err, result) {
      var json2xls = require("json2xls");
      var fs = require("fs");
      var json = [["id", "Bụi", "Độ ồn", "Nước", "Thời gian"]];
      for (let i = 0; i < result.length; ++i) {
         json.push([result[i].id, result[i].dirt, result[i].noise, result[i].water, result[i].time]);
      } 
      // console.log(json);
      var xls = json2xls(json);
      fs.writeFileSync('public/download/data-'+json[1][4].substring(0,10)+'.xlsx', xls, 'binary');
   });
   console.log(date);
   date = date.split('-');
   var file = "public/download/data-"+date[2]+"-"+date[1]+"-"+date[0]+".xlsx";
   res.download(file) 
};