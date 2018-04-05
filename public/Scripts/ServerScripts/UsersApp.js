/**
 * @author Narendra
 * @created date 09/11/2017
 * @Modified By Narendra
 * @Modified Date 09/11/2017
 */

module.exports = function (app, postgresqlDBManager, bcrypt, AuthanticatorFactor, Email, generator, salt) {
    app.get("/Get_User_EmployeeId", function (req, res) {
        try {

            var qry = 'select * from "Admin_M_Users"';
            postgresqlDBManager.PSQL_getdata(qry, function (err, response) {

            });
        } catch (e) {
            console.log("Error:" + "\t" + "Get_User_EmployeeId" + e);
        }


    });

    //var generator = require('generate-password');
    //var salt = bcrypt.genSaltSync(10);
    app.post('/SaveUserDetails', function (req, res) {
        try {
            //  if (req.session.authenticated === true) {



            var data = req.body[0];
            // console.log(data.id);

            //generator password
            var Password = generator.generate({
                length: 8,
                numbers: true
            });
            // Salt and hash password
            var passwordToSave = bcrypt.hashSync(Password, salt);

            //  console.log(passwordToSave);
            var newSecret = AuthanticatorFactor.generateSecret({ name: 'Rubus', account: req.body.EmailId });

            //console.log(JSON.stringify(newSecret.secret));
            var qry = 'Insert into "Admin_M_Users"("Firstname","MiddelName","Lastname","EmailId","Countrycode","Mobilenumber","EmployeeId","Role","chk_active","Password","SecretId","PasswordPolicy")';
            qry += "values('" + req.body.Firstname + "','" + req.body.MiddelName + "','" + req.body.Lastname + "','" + req.body.EmailId + "','" + req.body.Countrycode + "'," + req.body.Mobilenumber + ",'" + req.body.EmployeeId + "','" + req.body.Role + "','" + req.body.chk_active + "','" + passwordToSave + "','" + newSecret.secret + "','" + req.body.PasswordPolicy + "')";



            var HtmlData = '<b>Hi User,</b><br/>';
            HtmlData += "<br/>";
            HtmlData += ' Your password Created SuccessFully....!<br/>';
            HtmlData += "<br/>";
            HtmlData += "<br/>";
            HtmlData += ' User EamilID :' + req.body.EmailId + '<br/>';
            HtmlData += ' Password :' + Password + '<br/>';
            HtmlData += ' SecretKey :' + newSecret.secret + '<br/>';
            HtmlData += "<br/>";
            HtmlData += "<br/>";
            HtmlData += "<br/>";
            HtmlData += "Thanks & Regards,<br/>";
            HtmlData += "Envision Enterprise Solutions Pvt Ltd,<br/>";
            HtmlData += "Hyderabad<br/>";
            //Send Email To User
            Email.SendEmail('enterprise360@envisionesl.com', req.body.EmailId, 'Rubus App Password', HtmlData, function (err, result) {
                if (!err) {
                    postgresqlDBManager.PSQL_InsertData(qry, null, function (err, response) {
                        if (!err) {
                            res.send("User Successfully Created");

                        }
                        else {
                            console.log("Error Inserting Data in SaveUserDetails");
                            res.status(200).json({ "error": err.message });
                        }
                    });

                }
                else {
                    res.send("User Successfully Created");

                }
            });

            // }

            // else {
            res.send({ "isauthenticated": false });

            //}
        }

        catch (e) {

            console.log("Error" + "\t" + "SaveUserDetails" + e);
        }

    });

    app.get("/User_List", function (req, res) {
        try {
            //     if (req.session.authenticated === true) {
            // var qry = 'select * from "Admin_M_Users"';

            var qry = 'SELECT amu."Id",amu."EmployeeId",amu."Firstname",amu."Lastname", amu."EmailId",amu."chk_active","Admin_T_Roles"."RoleName","Admin_T_Roles"."RoleId" as "Role"  FROM "Admin_M_Users" as amu INNER JOIN "Admin_T_Roles"  ON CAST (amu."Role" as Integer) = "Admin_T_Roles"."RoleId";';

          //  console.log(qry);
            postgresqlDBManager.PSQL_getdata(qry, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);
                }
            });
            // }

            //else {
            // res.send({ "isauthenticated": false });


            // }
        } catch (e) {
            console.log("Error:" + "\t" + "User_List" + e);
        }



    });

    app.post('/GetUserData', function (req, res) {
        try {
            //  if (req.session.authenticated === true) {
            var data = req.body[0];
            //console.log(data.id);
            var query = 'select * from "Admin_M_Users"';
            query += ' where "Id"=';
            query += "'" + data.id + "'";

            // console.log(query);
            postgresqlDBManager.PSQL_getdata(query, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);
                }
            });
            // }

            //  else {
            res.send({ "isauthenticated": false });

            // }
        } catch (ex) {

            res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
        }

    });

    app.post("/DeleteUser", function (req, res) {
        try {
            //  if (req.session.authenticated === true) {

            var data = req.body[0];
            var query = 'Delete from "Admin_M_Users"';
            query += ' where "Id"=';
            query += "'" + data.id + "'";
            postgresqlDBManager.PSQL_InsertData(query, null, function (err, response) {
                if (!err) {
                    res.send("User Deleted Successfully");
                }
                else {
                    res.send(false);
                }
            });
            // }

            // else {
            //    res.send({ "isauthenticated": false });

            // }

        } catch (ex) {
            res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
        }
    });
    app.post("/UpdateUser", function (req, res) {
        try {
            // if (req.session.authenticated === true) {
            var query = ' UPDATE public."Admin_M_Users"';
            query += ' SET "Countrycode"=$1, "EmailId"=$2,  "Firstname"=$3, "Lastname"=$4, "Mobilenumber"=$5, "Role"=$6, "chk_active"=$7, "EmployeeId"=$8,"PasswordPolicy"=$9 WHERE "Id"=$10';

            var PolicyData = [req.body.Countrycode, req.body.EmailId, req.body.Firstname, req.body.Lastname, req.body.Mobilenumber, req.body.Role, req.body.chk_active, req.body.EmployeeId, req.body.PasswordPolicy, req.body.Id];


            postgresqlDBManager.PSQL_InsertData(query, PolicyData, function (err, response) {
                if (!err) {
                    res.send("User Updated Successfully");
                }
                else {
                    res.send(false);
                }
            });
            // }

            //  else {
            //  res.send({ "isauthenticated": false });

            //}
        } catch (e) {
            console.log("Error:" + "\t" + "Update" + e);
        }


    });



    app.get("/EmployeeList", function (req, res) {
        try {
            // if (req.session.authenticated === true) {
            var Querytext = 'SELECT  "EmpId", "EmpName","Email","MobileNumber" FROM public."Employee_M_Employee";';
            postgresqlDBManager.PSQL_getdata(Querytext, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);

                }
            });

            //   }
            //  else {
            //  res.send({ "isauthenticated": false });
            // }

        } catch (e) {
            console.log("Error" + "EmployeeList" + e);
        }



    });

    app.post('/GetEmployeeBasedOnId', function (req, res) {
        try {
            //  if (req.session.authenticated === true) {
            var query = 'select * from "Employee_M_Employee"';
            query += ' where "EmpId"=';
            query += "'" + req.body.textVal + "'";

            postgresqlDBManager.PSQL_getdata(query, null, function (err, response) {
                console.log("response : " + response);
                if (!err) {

                    res.send(response);
                }
                else {
                    res.send(false);
                }
            });
            // }

            //  else {
            //     res.send({ "isauthenticated": false });

            //  }
        } catch (ex) {

            res.status(200).json({ "error": "error at GetEmployeeData : " + ex.message });
        }

    });



    app.get("/GetRoleAcess", function (req, res) {
        try {
            //  if (req.session.authenticated === true) {
            var qry = 'SELECT * FROM public."Admin_T_Roles";';
            postgresqlDBManager.PSQL_getdata(qry, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);
                }
            });

            //}
            // else {
            //   res.send({ "isauthenticated": false });

            //}
        } catch (e) {
            console.log("Error" + "\t" + "GetRoleAcess" + e);
        }
    });

    app.get("/GetPassword", function (req, res) {
        try {
            // if (req.session.authenticated === true) {
            var Query = ' select * FROM public."Admin_T_PasswordPolicy";';
            postgresqlDBManager.PSQL_getdata(Query, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);

                }
            });
            //}
            //  else {
            //      res.send({ "isauthenticated": false });
            //  }

        } catch (e) {
            console.log("Error:" + "\t" + "" + e);
        }



    });
    //users crud

    app.post("/CheckSessionEveryForm", function (req, res) {
        try {

            // if (req.session.authenticated === true) {
            postgresqlDBManager.PSQL_getdata('Select * from "Admin_T_RoleBasedFormAccess" where "RoleId"=$1 and "FormId"=(Select "FormId" from "Admin_T_Forms" where "FormIdText"=$2)', [req.session.RoleId, req.body.FormId], function (err, response) {
                // console.log(response);

                if (!err) {
                    res.send({ "isauthenticated": true, "response": response });
                    //res.json(response);
                }
                else {
                    //console.log("Error Getting Data in GetPasswordPolicies_001");
                    //  res.status(200).json({ "error": err.message });
                    res.send({ "isauthenticated": true, "error": err.message });
                }
            });

            //  }
            //else {
            // res.send({ "isauthenticated": false });
            // }
        } catch (e) {
            console.log("Error:" + "\t" + "CheckSessionEveryForm" + e);
        }
    });
};
