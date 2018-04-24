/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By tejasree
 * @Modified Date 19/04/2018
 */

module.exports = function (app, postgresqlDBManager,__dirname) {
app.get("/GetPolicyId", function (req, res) {
        try {
            if (req.session.authenticated === true) {
            var query = 'select * from "Admin_M_Users"';
            query += ' where "EmailId"=';
            query += "'" + req.session.myemail + "'";
            postgresqlDBManager.psql_getdata(query, null, function (err, response) {
                if (!err) {
                    res.send(response[0]["PasswordPolicy"]);
                }
                else {
                    res.send("false");
                }
            });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (e) {
            res.send(e.message);
        }

    });

    app.get('/ImmediateChangepassword', function (req, res) {
        try {

            if (req.user == undefined) {
                if (req.session.myemail != undefined) {
                    res.sendfile(__dirname + '/public/views/Layout.html');
                }
                else {
                    res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
                }

            }
            else if (req.user != undefined) {
                if (JSON.stringify(req.user.emails) != undefined) {
                    sess = req.session;
                    sess.myemail = req.user.emails[0]['value'];
                    sess.displayName = req.user.displayName;
                }
                res.sendfile(__dirname + '/public/views/ImmediateChangepassword/ImmediateChangepassword.html');

            }

        } catch (e) {
            console.log("Error:" + "\t" + "Changepassword" + "\t" + e);
        }
    });

app.post("/setusersessiontime", function (req, res) {
    

        try {
            var query = 'SELECT "Admin_T_PasswordPolicy".*,"Admin_T_PasswordManagement"."Id", "Admin_T_PasswordManagement"."Email", "Admin_T_PasswordManagement"."Description", "Admin_T_PasswordManagement"."CreatedDate"';
            query += ',DATE_PART($1, current_timestamp::timestamp - "Admin_T_PasswordManagement"."CreatedDate"::timestamp)as "DateDiffData" From public."Admin_M_Users"  ';
            query += ' join public."Admin_T_PasswordPolicy"  on "Admin_T_PasswordPolicy"."PolicyID"="Admin_M_Users"."PasswordPolicy"';
            query += ' left outer join public."Admin_T_PasswordManagement" on  "Admin_T_PasswordManagement"."Id"=(select max("Id")  FROM public."Admin_T_PasswordManagement" where "Email"="Admin_M_Users"."EmailId")';
            query += ' where "Admin_M_Users"."EmailId"=';
            query += "'" + req.session.myemail + "'";
            var PolicyData = ['day'];

            postgresqlDBManager.psql_getdata(query, PolicyData, function (err, response) {

                if (!err) {
                    User_SessionTime = typeof parseInt(response[0]["SessionExpiry"]);
                    var PasswordExpiry = response[0]["PasswordExpiry"];
                    var DateDiffData = response[0]["DateDiffData"];

                    if (response[0]["MultiSession"] == "No") {

                        var qur = 'SELECT "BrowserId", "IPAddress", "Count", "Id", "LoginTime", "UserName", "BrowserName", "Description"';
                        qur += ' FROM public."Admin_T_UserLoginDetails"';
                        qur += ' where "UserName"=$1 and "BrowserId"!=$2';
                        qur += ' order by "Id" desc fetch first 1 rows only';
                        var Policy = [req.session.myemail, req.body.BrowserId];

                        postgresqlDBManager.psql_getdata(qur, Policy, function (err, responseData) {
                            if (!err) {

                                if (responseData.length > 0) {

                                    if (responseData[0]["Description"] == "Login") {
                                        var Ip = req.body.Ip;
                                        var BrowserId = req.body.BrowserId;
                                        var datetime = req.body.datetime;
                                        var query = 'INSERT INTO public."Admin_T_UserLoginDetails"("BrowserId", "IPAddress", "Count", "LoginTime", "UserName","BrowserName","Description") VALUES ($1, $2, $3, $4, $5,$6,$7);';

                                        var PolicyData = [responseData[0]["BrowserId"], Ip, "true", datetime, req.session.myemail, responseData[0]["BrowserName"], "Logout"];

                                        postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {

                                            if (!err) {


                                            }
                                            else {

                                                res.end(err.message);
                                            }
                                        });
                                    }
                                }
                            }
                            else {
                                res.send(err.message);
                            }
                        });

                    }


                    if (response[0]["ResetPassword"] == "Yes" && ((response[0]["CreatedDate"] == "null") || (response[0]["CreatedDate"] == null) || (response[0]["CreatedDate"] == ""))) {

                        res.send("ChangePassword");
                    }
                    else if (typeof parseInt(PasswordExpiry) > typeof parseInt(DateDiffData)) {

                        res.send("ChangePassword");
                    }
                    else {
                        res.send("Home");
                    }
                }
                else {
                    res.send(err.message);
                }
            });
        } catch (e) {
            res.send(e.message);
        }

    });

};
