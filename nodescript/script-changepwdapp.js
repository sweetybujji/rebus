/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By Hanumanth
 * @Modified Date 09/11/2017
 */

module.exports = function (app, postgresqlDBManager, bcrypt, Email,salt) {

    //app.post("/ChangePassword", function (req, res) {
    //    try {
    //        var ConfirmPassword = req.body.ConfirmPassword;

    //        bcrypt.hash(ConfirmPassword, 10, function (err, hash) {
    //            // Store hash in your password DB.
    //            //console.log("Hash" + hash);
    //            client.execute("UPDATE iarms_rad_banglore_lt.users SET attr_274b65f41025b9d4eaea8c0cd5434802f17f79f6='" + hash + "' where attr_f91c552fb799f6c1143fcca2bc26f3aecb363bee=" + sess.col_TimeUuid + ";", function (err, result) {
    //                if (!err) {
    //                    res.send(true);
    //                }
    //                else {
    //                    res.send(false);
    //                }


    //            });



    //        });
    //    } catch (e) {
    //        console.log("Error:" + "\t" + "ChangePassword" + "\t" + e);
    //    }

    //});

    function UpdateUserPasswordDataToPasswordManagement(Email_Id, cb) {

        var qry = 'INSERT INTO public."Admin_T_PasswordManagement"("Email", "Description", "CreatedDate")';
        qry += "values('" + Email_Id + "','Password Updated',current_Timestamp)";
        console.log("qry : " + qry);
        postgresqlDBManager.psql_insertdata(qry, null, function (err, response) {
            if (!err) {
                console.log("Success");
                cb(false, "Success");
            }
            else {
                cb(false, err.message);
            }
        });


    }


    app.post('/UpdatePassword', function (req, res) {
        try {
            if (req.session.authenticated === true) {

            var query = 'select * from "Admin_M_Users"';
            query += ' where "EmailId"=';
            query += "'" + req.session.myemail + "'";

            postgresqlDBManager.psql_getdata(query, null, function (err, response) {
                if (!err) {
                    if (response != "" && response != "[]" && response != [] && response != "null" && response != null) {

                        bcrypt.compare(req.body.OldPassword, response[0]["Password"], function (err, resdata) {

                            if (resdata == true) {

                                var passwordToSave = bcrypt.hashSync(req.body.NewPassword, salt);

                                var query = ' UPDATE public."Admin_M_Users"';
                                query += ' SET "Password"=$1 WHERE "EmailId"=$2';

                                var PolicyData = [passwordToSave, req.session.myemail];

                                postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {
                                    if (!err) {
                                        console.log("Updated");
                                        var HtmlData = '<b>Hi User,</b><br/>';
                                        HtmlData += "<br/>";
                                        HtmlData += ' Your password Has been Updated Sucessfully....!<br/>';
                                        HtmlData += "<br/>";
                                        HtmlData += "<br/>";
                                        HtmlData += ' User Name :' + req.session.myemail + '<br/>';
                                        HtmlData += ' Password :' + req.body.NewPassword + '<br/>';
                                        HtmlData += "<br/>";
                                        HtmlData += "<br/>";
                                        HtmlData += "<br/>";
                                        HtmlData += "Thanks & Regards,<br/>";
                                        HtmlData += "Envision Enterprise Solutions Pvt Ltd,<br/>";
                                        HtmlData += "Hyderabad<br/>";

                                        UpdateUserPasswordDataToPasswordManagement(req.session.myemail, function (re, responsedata) {

                                            if (responsedata == "Success") {
                                                res.end("true");
                                            }
                                            else {
                                                res.end(responsedata);
                                            }
                                        });

                                        //Send Email To User
                                        Email.SendEmail('enterprise360@envisionesl.com', req.session.myemail, 'Password Reset', HtmlData, function (error, result) {
                                            res.end("true");
                                        });
                                    }
                                    else {

                                        res.end(err.message);
                                    }
                                });


                            }
                            else {

                                res.end("Password Invalid");
                            }


                        });
                    }
                    else {
                        res.end("Password Invalid");
                    }
                }
            });

            }

            else {
                res.send({ "isauthenticated": false });

            }
        }
        catch (er) {
            res.end(er.message);
        }
    });
};
