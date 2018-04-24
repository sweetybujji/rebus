/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By tejasree
 * @Modified Date 19/04/18
 */

module.exports = function (app, postgresqlDBManager) {



    app.get("/departmentdata", function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var qry = 'select * from "Employee_M_Employee"';
                postgresqlDBManager.psql_getdata(qry, null, function (err, response) {
                    if (!err) {
                        res.send(response);
                    }
                    else {
                        res.send(false);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (e) {
            console.log("Error:" + "\t" + "DepartmentsData" + e);
        }

    });

    app.get("/locationdata", function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var qry = 'select * from "Employee_M_Employee"';
                postgresqlDBManager.psql_getdata(qry, null, function (err, response) {
                    if (!err) {
                        res.send(response);
                    }
                    else {
                        res.send(false);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (e) {
            console.log("Error:" + "\t" + "LocationsData" + e);
        }

    });

    app.get("/designationdata", function (req, res) {
        try {
            var qry = 'select * from "Employee_M_Employee"';
            postgresqlDBManager.psql_getdata(qry, null, function (err, response) {
                if (!err) {
                    res.send(response);
                }
                else {
                    res.send(false);
                }
            });
        } catch (e) {
            console.log("Error:" + "\t" + "DesignationsData" + e);
        }

    });

    app.post('/saveemployeedeta', function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var MobileNumber = req.body.Code + '-' + req.body.MobileNumber;

                var query = 'select * from "Employee_M_Employee"';
                query += ' where "EmpId"=';
                query += "'" + req.body.EmpId + "'";
                if (req.body.Email != "" && req.body.Email != "" && req.body.Email != "") {

                    query += ' or "Email"=';
                    query += "'" + req.body.Email + "'";
                }

                if (MobileNumber != "" && MobileNumber != "" && MobileNumber != "") {

                    query += ' or "MobileNumber"=';
                    query += "'" + MobileNumber + "'";
                }


                postgresqlDBManager.psql_getdata(query, null, function (err, response) {
                    if (!err) {
                        //res.send(response);
                        if (response != "" && response != "[]" && response != [] && response != "null" && response != null) {
                            var str = response[0]["EmpId"];
                            if (response[0]["EmpId"] == req.body.EmpId) {

                                res.send("Employee Id already Exists");
                            }
                            else if (response[0]["MobileNumber"] == MobileNumber && MobileNumber != "" && MobileNumber != "null" && MobileNumber != null) {

                                res.send("MobileNumber already Exists");
                            }
                            else if (response[0]["Email"] == req.body.Email && req.body.Email != "" && req.body.Email != "null" && req.body.Email != null) {
                                res.send("Email already Exists");
                            }

                        }
                        else {

                            if (req.body.Id == "" || req.body.Id == "null" || req.body.Id == null) {

                                var qry = 'Insert into "Employee_M_Employee"("EmpId", "EmpName", "Department", "WorkLocation", "JoiningDate", "Designation", "ReportingManager", "MobileNumber", "Email")';
                                qry += "values('" + req.body.EmpId + "','" + req.body.EmpName + "','" + req.body.Department + "','" + req.body.WorkLocation + "','" + req.body.JoiningDate + "','" + req.body.Designation + "','" + req.body.ReportingManager + "','" + MobileNumber + "','" + req.body.Email + "')";
                                console.log("qry : " + qry);
                                postgresqlDBManager.psql_insertdata(qry, null, function (err, response) {
                                    if (!err) {

                                        res.send("Employee Created Successfully");
                                    }
                                    else {
                                        console.log("Error Inserting Employee Data");
                                        res.status(200).json({ "error": err.message });
                                    }
                                });
                            }
                            else {

                                var query = ' UPDATE public."Employee_M_Employee"';
                                query += ' SET "EmpId"=$1, "EmpName"=$2,  "Department"=$3, "WorkLocation"=$4, "JoiningDate"=$5, "Designation"=$6,"ReportingManager"=$7, "MobileNumber"=$8, "Email"=$9 WHERE "Id"=$10';

                                var PolicyData = [req.body.EmpId, req.body.EmpName, req.body.Department, req.body.WorkLocation, req.body.JoiningDate, req.body.Designation,
                                    req.body.ReportingManager, req.body.MobileNumber, req.body.Email, req.body.Id];

                                postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {
                                    if (!err) {
                                        res.send("Employee Updated Successfully");
                                    }
                                    else {
                                        res.send(false);
                                    }
                                });


                            }

                        }

                    }
                    else {
                        res.send(false);
                    }
                });

            }

            else {
                res.send({ "isauthenticated": false });

            }
        }
        catch (e) {

            console.log("Error" + "\t" + "SaveEmployeeDetails" + e);
        }

    });

    app.post('/updateemployeedetails', function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var MobileNumber = req.body.Code + '-' + req.body.MobileNumber;

                var query = 'select * from "Employee_M_Employee"';
                query += ' where "Id"!=' + req.body.Id + ' and(';
                query += ' "EmpId"=';
                query += "'" + req.body.EmpId + "'";
                if (req.body.Email != "" && req.body.Email != "" && req.body.Email != "") {

                    query += ' or "Email"=';
                    query += "'" + req.body.Email + "'";
                }

                if (MobileNumber != "" && MobileNumber != "" && MobileNumber != "") {

                    query += ' or "MobileNumber"=';
                    query += "'" + MobileNumber + "'";
                }
                query += ')';
                postgresqlDBManager.psql_getdata(query, null, function (err, response) {
                    if (!err) {
                        console.log(response);
                        if (response != "" && response != "[]" && response != [] && response != "null" && response != null) {
                            var str = response[0]["EmpId"];
                            if (response[0]["EmpId"] == req.body.EmpId) {

                                res.send("Employee Id already Exists");
                            }
                            else if (response[0]["MobileNumber"] == MobileNumber && MobileNumber != "" && MobileNumber != "null" && MobileNumber != null) {

                                res.send("MobileNumber already Exists");
                            }
                            else if (response[0]["Email"] == req.body.Email && req.body.Email != "" && req.body.Email != "null" && req.body.Email != null) {
                                res.send("Email already Exists");
                            }

                        }
                        else {
                            var query = ' UPDATE public."Employee_M_Employee"';
                            query += ' SET "EmpId"=$1, "EmpName"=$2,  "Department"=$3, "WorkLocation"=$4, "JoiningDate"=$5, "Designation"=$6,"ReportingManager"=$7, "MobileNumber"=$8, "Email"=$9 WHERE "Id"=$10';

                            var PolicyData = [req.body.EmpId, req.body.EmpName, req.body.Department, req.body.WorkLocation, req.body.JoiningDate, req.body.Designation,
                                req.body.ReportingManager, MobileNumber, req.body.Email, req.body.Id];

                            postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {
                                if (!err) {
                                    res.send("Employee Updated Successfully");
                                }
                                else {
                                    console.log("error");
                                    res.send(false);
                                }
                            });
                        }
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }


        }
        catch (e) {

            console.log("Error" + "\t" + "UpdateEmployeeDetails" + e);
        }

    });

    app.get("/employeelist", function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var qry = 'select * from "Employee_M_Employee"';
                postgresqlDBManager.psql_getdata(qry, null, function (err, response) {
                    if (!err) {
                        res.send(response);
                    }
                    else {
                        res.send(false);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (e) {
            console.log("Error:" + "\t" + "Employee_List" + e);
        }

    });

    app.post("/deleteemployee", function (req, res) {
        try {
            if (req.session.authenticated === true) {


                var data = req.body[0];
                var query = 'Delete from "Employee_M_Employee"';
                query += ' where "Id"=';
                query += "'" + data.id + "'";

                postgresqlDBManager.psql_insertdata(query, null, function (err, response) {
                    if (!err) {
                        res.send("Employee Deleted Successfully");
                    }
                    else {
                        res.send(false);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (ex) {
            res.status(200).json({ "error": "error at DeleteEmployee : " + ex.message });
        }
    });

    app.post('/getemployeedata', function (req, res) {
        try {
            if (req.session.authenticated === true) {



                var data = req.body[0];

                var query = 'select * from "Employee_M_Employee"';
                query += ' where "Id"=';
                query += "'" + data.id + "'";

                postgresqlDBManager.psql_getdata(query, null, function (err, response) {
                    if (!err) {
                        res.send(response);
                    }
                    else {
                        res.send(false);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }

        } catch (ex) {

            res.status(200).json({ "error": "error at GetEmployeeData : " + ex.message });
        }

    });
};
