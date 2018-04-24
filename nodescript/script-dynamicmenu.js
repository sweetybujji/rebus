/**
 * @author Narendra
 * @created date 09/11/2017
 * @Modified By Narendra
 * @Modified Date 09/11/2017
 */

module.exports = function (app, postgresqlDBManager, fs, path, __dirname) {


    //********************************* Narendra Dynamic Menu Cration ************************************//
    app.get("/MenuOperation", function (req, res) {
        try {

            var Querytext = 'select "FormIdText","Admin_T_Modules"."ModuleIdText" from "Admin_T_Forms" join "Admin_T_Modules" on "Admin_T_Forms"."ModuleId" = "Admin_T_Modules"."ModuleId"';
            Querytext += 'where "FormId" in(SELECT "FormId"';
            Querytext += 'FROM public."Admin_T_RoleBasedFormAccess"';
            Querytext += 'where "RoleId"=$1 and ("Create"=$2 or "Read"=$3 or "Update"=$4 or"Delete"=$5 ));';
            //   var Query = 'SELECT * FROM public."Admin_T_RoleBasedFormAccess" where "RoleId"=$1 and ("Create"=$2 or "Read"=$3 or "Update"=$4 or "Delete"=$5 );';
            var PolicyData = [req.session.RoleId, 'true', 'true', 'true', 'true'];

            postgresqlDBManager.psql_getdata(Querytext, PolicyData, function (err, response) {
                if (!err) {

                    res.send(response);
                }
                else {
                    res.send(false);

                }
            });



        } catch (e) {
            console.log("Error" + "\t" + "MenuOperation" + e);
        }


    });

    /**
    @summary:To Create Side menu and save file in json foramt in application
    @function code:Menu_Creation_035
    **/
    app.post("/Menu_Creation", function (req, res) {
        try {
            if (req.session.authenticated === true) {


                //  console.log(req.body.treedata);
                var url = __dirname + "/public/resourceFiles/side_topmenu/Sidemenu.json";
                fs.writeFile(url, req.body.treedata, function (err) {
                    if (err) {
                        return console.log(err);
                        res.send(false);
                    }
                    var url_top = __dirname + "/public/resourceFiles/side_topmenu/Topmenu.json";
                    fs.writeFile(url_top, req.body.topmenu, function (err) {
                        if (err) {
                            return console.log(err);
                            res.send(false);
                        }
                        console.log("The file was saved!");
                        res.send(true);
                    });
                });
            }

            else {
                res.send({ "isauthenticated": false });

            }
        } catch (e) {
            console.log("Error:" + "\t" + Menu_Creation + "\t" + e);
        }
    });

    /**
    @summary:To Create Topmenu and save file in json foramt in application
    @function code:TopMenu_Creation_036
    **/
    app.get("/TopMenu_Creation", function (req, res) {
        var url = __dirname + "/public/resourceFiles/side_topmenu/Topmenu.json";
        fs.readFile(url, function (err, data) {
            if (err) {

                res.send(false);
            }
            else {
                res.send(data);
            }
        });
    });



    /**
    @summary:To Get Sidemenu
    @function code:GetMenu_Creation_037
    **/
    app.get("/GetMenu_Creation", function (req, res) {
        try {
            // var url = "D:/NewWorkSpace/iARMS_Product_DevFramework/iARMS Dev Framework _08-11-17/Side_Top_Menu/Sidemenu.json";
            var url = path.join(__dirname, '/public/resourceFiles/side_topmenu/Sidemenu.json')

            fs.readFile(url, 'utf8', function (err, data) {
                if (err) {

                   // console.log("flase");
                    res.send(false);
                }
                else {

                   // console.log("welcome");
                    var Querytext = 'select "FormIdText","Admin_T_Modules"."ModuleIdText" from "Admin_T_Forms" join "Admin_T_Modules" on "Admin_T_Forms"."ModuleId" = "Admin_T_Modules"."ModuleId"';
                    Querytext += 'where "FormId" in(SELECT "FormId"';
                    Querytext += 'FROM public."Admin_T_RoleBasedFormAccess"';
                    Querytext += 'where "RoleId"=$1 and ("Create"=$2 or "Read"=$3 or "Update"=$4 or"Delete"=$5 ));';
                    //   var Query = 'SELECT * FROM public."Admin_T_RoleBasedFormAccess" where "RoleId"=$1 and ("Create"=$2 or "Read"=$3 or "Update"=$4 or "Delete"=$5 );';
                   // console.log("roleid " + req.session.RoleId);

                    var PolicyData = [req.session.RoleId, 'true', 'true', 'true', 'true'];

                    postgresqlDBManager.psql_getdata(Querytext, PolicyData, function (err, response) {
                        if (!err) {

                            res.send({ "data": data, "Menudata": response });
                        }
                        else {
                            res.send(false);

                        }
                    });

                }
            });
        } catch (e) {
            console.log("Error:" + "\t" + "GetMenu_Creation" + "\t" + e);
        }
    });

    /**
    @summary:To Get TopMenu
    @function code:GetTopMenu_Creation_038
    **/
    app.post("GETTopMenu_Creation", function (req, res) {

        var url_top = __dirname + "/public/resourceFiles/side_topmenu/Topmenu.json";
        fs.writeFile(url_top, req.body.topmenu, function (err) {
            if (err) {
                return console.log(err);
                res.send(false);
            }
            console.log("The file was saved!");
            res.send(true);
        });


    });



    //********************************* Narendra Dynamic Menu Cration ************************************//
};
