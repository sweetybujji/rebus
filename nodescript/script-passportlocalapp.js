/**
 * @author Narendra
 * @created date 09/11/2017
 * @Modified By Narendra
 * @Modified Date 09/11/2017
 */

module.exports = function (app, passport, postgresqlDBManager, LocalStrategy, bcrypt) {

    /*
 * @summary this method is used to Get the Login username
 * functioncode: Login_user_Names_0000
 */
    app.get("/Login_user_Names", function (req, res) {
        try {
            //sess = req.session;
            // console.log("Login Roleid" + sess.RoleId);
            // console.log("Login Display" + sess.displayName);
            //res.send(sess.MyfirstName);
            //res.json({ displayName: sess.displayName, myemail: sess.myemail, fName: sess.MyfirstName });


            var qry = 'select * from "Admin_M_Users" where "EmailId"=$1';

            var PolicyData = [req.session.myemail];
            postgresqlDBManager.psql_getdata(qry, PolicyData, function (err, response) {
                if (!err) {
                    // sess.MyfirstName = response[0].FirstName;
                    res.json({ response: response, displayname: req.session.displayName });
                }
                else {
                    res.send(false);
                }
            });



        }
        catch (e) {
            console.log("Error : Login_users" + e);
        }
    });


    passport.use(new LocalStrategy({ passReqToCallback: true },
  function (req, username, password, done) {

      var qry = 'select * from "Admin_M_Users" where "EmailId"=$1';
      var PolicyData = [username];
      postgresqlDBManager.psql_getdata(qry, PolicyData, function (err, response) {
          if (response.length > 0) {
              var My_password = response[0].Password;
              bcrypt.compare(password, My_password, function (err, res) {
                  // res == true
                  // console.log("Bycrypt" + res);
                  if (res == true) {
                      req.body.verifypassword = true;
                      return done(null, true);
                  }
                  else {
                      //  console.log("false");
                      req.body.verifypassword = false;

                      return done(null, true);
                  }

                  return done(null, result.toString);
              });
          }
          else {
              req.body.verifypassword = false;
              return done(null, true);
          }

      });




  }
));



    //passport.serializeUser(function (req, username, password, donee) {

    //    // if you use Model.id as your idAttribute maybe you'd want
    //    // done(null, user.id);

    //    var qry = 'select * from "Admin_M_Users" where "EmailId"=$1';
    //    var PolicyData = [username];
    //    postgresqlDBManager.PSQL_getdata(qry, PolicyData, function (err, response) {
    //        if (response.length > 0) {
    //            var My_password = response[0].Password;
    //            bcrypt.compare(password, My_password, function (err, res) {
    //                // res == true
    //                // console.log("Bycrypt" + res);
    //                if (res == true) {
    //                    req.body.verifypassword = true;
    //                    return done(null, true);
    //                }
    //                else {
    //                    //  console.log("false");
    //                    req.body.verifypassword = false;

    //                    return done(null, true);
    //                }

    //                return done(null, result);
    //            });
    //        }
    //        else {
    //            req.body.verifypassword = false;
    //            return done(null, true);
    //        }

    //    });


    //});


    //@ Passport local authentication
    app.post('/authlogin', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {

        var Ip = req.body.UserLogin.Ip;
        var BrowserId = req.body.UserLogin.BrowserId;
        var datetime = req.body.UserLogin.datetime;
        console.log(req.body);

        if (req.body.verifypassword == true) {

            sess = req.session;
            var str_uname = req.body.username;
            req.session.myemail = req.body.username;
            req.session.mypassword = req.body.password;
            var password_login = req.body.password;
            // console.log(req.session.myemail);

            //console.log("Ip" + "\t" + Ip + "BrowserId" + "\t" + BrowserId + "\t" + "datetime" + "\t" + datetime);

            var qry = 'select * from "Admin_M_Users" where "EmailId"=$1';
            var PolicyData = [str_uname];
            postgresqlDBManager.psql_getdata(qry, PolicyData, function (err, response) {
                if (response.length > 0) {
                    var My_password2 = response[0].Password;
                    req.session.authenticated = true;
                    req.session.displayName = response[0].Firstname;
                    req.session.RoleId = response[0].Role;
                    req.session.BrowserId = BrowserId;
                    console.log("Session variables" + JSON.stringify(req.session));

                    var LoginQry = 'INSERT INTO public."Admin_T_UserLoginDetails"("BrowserId", "IPAddress", "Count", "LoginTime", "UserName","BrowserName","Description") VALUES ($1, $2, $3, $4, $5,$6,$7);';

                    var PolicyData_login = [BrowserId, Ip, "true", datetime, response[0].EmailId, req.body.UserLogin.browser_version[0] + "_" + req.body.UserLogin.browser_version[1], "Login"];
                    postgresqlDBManager.psql_insertdata(LoginQry, PolicyData_login, function (err, responce2) {
                        if (!err) {
                            console.log(req.body.UserLogin.browser_version[0] + "_" + req.body.UserLogin.browser_version[1]);
                            var qryCheck = 'select count(*) from "Admin_T_UserLoginDetails" where "IPAddress"=$1 and "UserName"=$2;';
                            var PolicyQryData = [Ip, response[0].EmailId];

                            postgresqlDBManager.psql_getdata(qryCheck, PolicyQryData, function (err, response3) {
                                if (!err) {
                                    console.log(response3[0].count);
                                    res.send(response3[0].count);
                                }
                                else {
                                    res.send(false);
                                }

                            });
                        }
                        else {
                            res.send(false);
                        }
                    });
                }
                else {
                    res.send(false);
                }
            });
        }
        else {
            // res.send("Invalid");
            var LoginQry = 'INSERT INTO public."Admin_T_UserLoginDetails"("BrowserId", "IPAddress", "Count", "LoginTime", "UserName","BrowserName","Description") VALUES ($1, $2, $3, $4, $5,$6,$7);';

            var PolicyData_login = [BrowserId, Ip, "false", datetime, req.body.username, req.body.UserLogin.browser_version[0] + "_" + req.body.UserLogin.browser_version[1], "Login"];
            postgresqlDBManager.psql_insertdata(LoginQry, PolicyData_login, function (err, responce2) {
                if (!err) {
                    res.send("Invalid");
                }
                else {
                    res.send({ "error": err.message });
                }

            });
        }
    });

    //......... logout ............//
    /*
     * @summary this method is used to logout user.

     * functioncode: logout_0002
     */
    app.get('/logout', function (req, res) {
        try {
            // console.log("logout");
            delete req.session.authenticated;
            req.session.authenticated = false;
            req.session.myemail = undefined;
            req.session.RoleId = undefined;
            delete req.session.myemail;

            req.session.destroy(function (err, result) {
                if (err) {
                    console.log("Error Login Page");
                    res.send('LoginPage');
                }
                else {

                    res.send('LoginPage');
                }
            });




        }
        catch (e) {
            console.log("Erroras : logoutadd" + e);
            res.send('LoginPage');
        }
    });
};
