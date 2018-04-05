/**
 * @author Manikanta
 * @created date 09/11/2017
 * @Modified By Manikanta
 * @Modified Date 09/11/2017
 */

module.exports = function (app, cassandra, mongodb, XLSX, fs, jsonxml, parser, XMLbuilder, xml2js, download, __dirname, sql, path, formidable, _, DataConnectivity, kafka, Producer, Consumer, socket, mqtt, soap, XMLHandler, xmlHandler, util, CircularJSON, WSDL, postgresqlDBManager) {
    ///........ Analytics Connection to Cassandra Database ......///

    var analytics_client = new cassandra.Client({
        contactPoints: ['192.168.4.186:9042'], queryOptions: {
            consistency: cassandra.types.consistencies.quorum
        }, keyspace: 'iarms360'
    });


    var queryOptions = {
        consistency: cassandra.types.consistencies.quorum,
        prepare: true
    };

    // Connect to the cassandra database before starting the application server.
    analytics_client.connect(function (err) {
        // assert.ifError(err);
        if (!err) {
            console.log("Successfully connected to the cassandra database");
        }
        else {
            console.log("ERROR : " + err);
        }

    });
    // Connect to the cassandra database before starting the application server.

    //Connect to the Mongodb database before starting the application server.
    var db;
    mongodb.MongoClient.connect("mongodb://192.168.4.49:27017/iARMS_CM_NodeApp", function (err, database) {
        if (err) {
            console.log(err);
            //process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = database;
        console.log("Database connection ready");

    });

    ///........ Analytics Connection to Cassandra Database ......///  

    // ..... Analytics Routing URL ....... ////

    //app.get('/DashboardFactory', function (req, res) {
    //    res.sendfile(__dirname + '/public/Views/Home/DashboardFactory1.html');
    //    // res.sendfile(__dirname + '/Views/charts.html');
    //});
    // .... Manikanta...///
    app.get('/viewer', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/Home/Layout5.html');
    });

    app.get('/LoadIndex', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/EmsLineDiagram/Index.html');
    })
    // .... Manikanta...///

    /*Divya*/

    //app.get('/Reporting', function (req, res) {

    //    res.sendfile('./public/Analytics/Views/Reporting/Report_Index.html');
    //});

    app.get('/Reporting', function (req, res) {
        res.sendfile('./public/Analytics/Views/Reporting/Latest_Report_Index.html');
    });

    app.get('/Reporting/Help', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/Reporting/Help.html');
    });

    app.get('/Reporting/Report_Parameters', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/Reporting/Report_Parameters.html');
    });

    app.get('/Reporting/DailyViewer', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/Reporting/DailyViewer.html');
    });

    app.get('/Reporting/Viewer', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/Reporting/Viewer.html');
    });

    app.get('/ViewReports', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/Home/Analytics_ViewReports.html');
    });

    app.get('/TrendsView', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/CompareTrends/index.html');
    });

    app.get('/ExceltoTableList', function (req, res) {
        res.sendfile(__dirname + '/public/Analytics/Views/Home/_ExcelLayout.html');
    });

    /*Divya*/

    //// ************************************* Analytics Server Code ********************************************//
    //***********************************************************************************************************//

    // opcformlogic

    /*
     * @summary this method is used to OPCDataSource 
     * functioncode: OPCDataSource_0003
     */
    app.get("/OPCDataSource", function (req, res) {

        /*
         * db.collection("OPC_DATASOURCE").find({}).toArray(function (err, docs) { if
         * (err) { console.log(res, err.message, "Failed to get OPC_DATASOURCE."); }
         * else {
         * 
         * res.status(200).json(docs); } });
         */


        analytics_client.execute('select id as "Id",datasource as "DataSource" from OPC_DATASOURCE', queryOptions, function (err, docs) {


            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(docs.rows)
                res.status(200).json(docs.rows);
            }

        });
    });

    /*
     * @summary this method is used to getOPCdata
     * functioncode: getOPCdata_0004
     */
    app.get("/getOPCdata", function (req, res) {

        /*
         * db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) { if
         * (err) { console.log(res, err.message, "Failed to get OPC data."); } else {
         * 
         * res.status(200).json(docs); } });
         */
        try {
            if (req.session.authenticated === true) {

                var query = 'select id as "_id",servername  as "ServerName",serverdesc as "ServerDesc",primaryurl as "PrimaryURL",secondaryurl as "SecondaryURL",opcservername as "OPCServerName",isactive as "IsActive" from public."Analytics_M_OPC_ConfigTable";';
                var PolicyData = [];
                console.log(query);
                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {


                    //  analytics_client.execute('select id as "_id",servername  as "ServerName",serverdesc as "ServerDesc",primaryurl as "PrimaryURL",secondaryurl as "SecondaryURL",opcservername as "OPCServerName",isactive as "IsActive" from OPC_CONFIGTABLE;', queryOptions, function (err, docs) {

                    if (err) {
                        console.log(res, err.message, "Failed to get OPC data.");
                    } else {

                        // res.status(200).json(docs);
                        // res.status(200).json(docs.rows);

                        res.status(200).json(result);

                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getOPCdata" + e);
        }

    });

    /*
     * @summary this method is used to getOPCdata
     * functioncode: getOPCdata_0004_1
     */
    app.post("/getOPCdata", function (req, res) {

        console.log(req.body[0]);
        /*
         * db.collection(CONTACTS_COLLECTION).insertOne((req.body[0]), function (err,
         * doc) { if (err) { console.log(res, err.message, "Failed to create new
         * getOPCdata."); } else { res.status(201).json(doc.ops[0]); } });
         */
        //var uuid = cassandra.types.TimeUuid.now();



        // req.body[0].id = uuid;
        try {
            if (req.session.authenticated === true) {


                //var query='INSERT INTO public."Analytics_M_OPC_ConfigTable"(isactive, opcservername, primaryurl, secondaryurl, serverdesc, servername) VALUES ($1, $2, $3, $4, $5, $6);';
                //// var query = "Insert into OPC_CONFIGTABLE JSON '" + JSON.stringify(req.body[0]) + "'";
                //// console.log(query);
                //var PolicyData = [req.body[0].IsActive, req.body[0].OPCServerName, req.body[0].PrimaryURL, req.body[0].SecondaryURL, req.body[0].ServerDesc, req.body[0].ServerName];
                //postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                //  analytics_client.execute(query, queryOptions, function (err, result) {

                var query = 'INSERT INTO public."Analytics_M_OPC_ConfigTable"(isactive, opcservername, primaryurl, secondaryurl, serverdesc, servername) VALUES ($1, $2, $3, $4, $5, $6);';
                // var query = "Insert into OPC_CONFIGTABLE JSON '" + JSON.stringify(req.body[0]) + "'";
                // console.log(query);
                var PolicyData = [req.body[0].IsActive, req.body[0].ServerName, req.body[0].PrimaryURL, req.body[0].SecondaryURL, req.body[0].ServerDesc, req.body[0].ServerName];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //  analytics_client.execute(query, queryOptions, function (err, result) {


                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows.Row);
                        //  res.status(200).json(result.rows);

                        res.status(200).json(result);
                    }

                });

            }

            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (e) {
            console.log("Error:" + "\t" + "/getOPCdata" + e);
        }
    });

    /*
     * @summary this method is used to UpdateOpcdata
     * @param req.body. will have all opc conncetion details
     * functioncode: UpdateOpcdata_0005
     */
    app.put("/UpdateOpcdata/:id", function (req, res) {
        /*
            * var updateDoc = req.body[0]; delete updateDoc.OPCserverid;
            * console.log(updateDoc); db.collection(CONTACTS_COLLECTION).updateOne({
            * _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) { if
            * (err) { console.log(res, err.message, "Failed to update OPC"); } else {
            * res.status(204).end(); } });
            */
        try {
            if (req.session.authenticated === true) {

                var query = 'update public."Analytics_M_OPC_ConfigTable" set serverdesc=$1,primaryurl=$2,secondaryurl=$3,opcservername=$4,isactive=$5 where id=$6';


                console.log(query);
                console.log(req.body[0].ServerName + ' ' + req.body[0].Nameofserver);
                var PolicyData = [req.body[0].ServerDesc, req.body[0].PrimaryURL, req.body[0].SecondaryURL, req.body[0].Nameofserver, req.body[0].IsActive, req.body[0].OPCserverid];
                //postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                //   analytics_client.execute(query, queryOptions, function (err, result) {

                // console.log(query);
                //   var PolicyData = [req.body[0].ServerDesc, req.body[0].PrimaryURL, req.body[0].SecondaryURL, req.body[0].OPCServerName, req.body[0].IsActive, req.body[0].OPCserverid];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //   analytics_client.execute(query, queryOptions, function (err, result) {


                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        res.status(200).json(result);
                        // res.status(200).json(result.rows);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/UpdateOpcdata/:id" + e);
        }
    });
    /*
     * @summary this method is used to DeleteOpcdata
     * @param req.body. will have all opc conncetion details
     * functioncode: DeleteOpcdata_0006
     */
    app.delete("/DeleteOpcdata/:id", function (req, res) {

        /*
            * db.collection(CONTACTS_COLLECTION).remove({ _id: new
            * ObjectID(req.params.id) }, function (err, doc) { if (err) {
            * console.log(res, err.message, "Failed to delete opc"); } else {
            * 
            * db.collection("Group_Data").remove({ OPCID: (req.params.id) }, function
            * (err, doc) { if (err) { console.log(res, err.message, "Failed to delete
            * opc"); } else {
            * 
            * db.collection("Tags_Data").remove({ OPCID: (req.params.id) }, function
            * (err, doc) { if (err) { console.log(res, err.message, "Failed to delete
            * opc"); } else { res.status(204).end(); } }); } }); } });
            */

        // console.log(req.params.id);
        try {
            if (req.session.authenticated === true) {

                // var query = "delete from OPC_CONFIGTABLE where id=" + req.params.id + "";
                var query = 'delete from public."Analytics_M_OPC_ConfigTable" where id=$1;';
                var PolicyData = [req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //  analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        //   res.status(200).json(result.rows);
                        res.status(200).json(result);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/UpdateOpcdata/:id" + e);
        }

    });



    app.post("/SelectOpcdata/:id", function (req, res) {

        try {
            if (req.session.authenticated === true) {
                //  var query = "select * from OPC_CONFIGTABLE where id=" + req.params.id + "";
                var query = 'select * from public."Analytics_M_OPC_ConfigTable" where id=$1';
                var PolicyData = [req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        // res.status(200).json(result.rows);

                        res.status(200).json(result);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/SelectOpcdata/:id" + e);
        }

    });




    /*
     * @summary this method is used to getGroupdetails
     * @param req.body. will have all opc conncetion details
     * functioncode: getGroupdetails_0007
     */
    app.post("/getGroupdetails", function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var getgrpdoc = req.body[0];
                console.log("OPCID:" + req.body[0].opcID);


                var query = 'select opcid as "OPCID",opcname as "OPCName",groupname as "GroupName",groupdesc as"GroupDesc",groupactive as "GroupActive",id as "_id" from  public."Analytics_M_OPC_Groupstable" where opcid =$1;';

                var PolicyData = [req.body[0].opcID];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //analytics_client.execute(query, [req.body[0].opcID], queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get OPC data.");
                    } else {
                        // console.log(result.rows);
                        // res.status(200).json(docs);
                        res.status(200).json(result);
                        // res.status(200).json(result.rows);
                    }
                });

            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getGroupdetails" + e);
        }

    });
    /*
     * @summary this method is used to getGroupdata
     * @param req.body. will have all group details
     * functioncode: getGroupdata_0008
     */
    app.post("/getGroupdata", function (req, res) {

        //var uuid = cassandra.types.TimeUuid.now();
        //req.body[0].id = uuid;
        // console.log(JSON.varify(req.body[0]));
        // var query = "Insert into OPC_GROUPTABLE JSON '" + JSON.stringify(req.body[0]) + "'";
        // console.log(query);
        try {
            if (req.session.authenticated === true) {

                var query = 'INSERT INTO public."Analytics_M_OPC_Groupstable"(groupactive, groupdesc, groupname, opcid, opcname)VALUES($1,$2,$3,$4,$5)';
                var PolicyData = [req.body[0].GroupActive, req.body[0].GroupDesc, req.body[0].GroupName, req.body[0].OPCID, req.body[0].OPCName];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                    //  analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows.Row);
                        res.status(200).json(result);
                        //  res.status(200).json(result.rows);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getGroupdata" + e);
        }

    });
    /*
     * @summary this method is used to getAllGroupdetails
     * @param req.body. will have all opc group details
     * functioncode: getAllGroupdetails_0009
     */
    app.get("/getAllGroupdetails", function (req, res) {

        /*
         * db.collection("Group_Data").find({}).toArray(function (err, docs) { if (err) {
         * console.log(res, err.message, "Failed to get OPC data."); } else {
         * 
         * res.status(200).json(docs); } });
         */
        try {
            if (req.session.authenticated === true) {

                var query = 'select opcid as "OPCID",opcname as "OPCName",groupname as "GroupName",groupdesc as"GroupDesc",groupactive as "GroupActive",id as "_id" from public."Analytics_M_OPC_Groupstable";';

                var PolicyData = [];
                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                    // analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get OPC data.");
                    } else {
                        // console.log(result.rows);
                        // res.status(200).json(docs);
                        console.log("SrikanthHHHH");
                        res.status(200).json(result);
                        // res.status(200).json(result.rows);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getAllGroupdetails" + e);
        }
    });

    /*
     * @summary this method is used to UpdateGrpdata
     * @param req.body. will have all group details id
     * functioncode: UpdateGrpdata_0010
     */

    app.put("/UpdateGrpdata/:id", function (req, res) {
        try {
            if (req.session.authenticated === true) {

                var query = 'update public."Analytics_M_OPC_Groupstable" set groupname=$1,groupdesc=$2,groupactive=$3 where id=$4;';


                console.log(query);
                console.log(req.params.id + '    ' + req.body[0].GroupName + '' + req.body[0].GroupDesc + ' ' + req.body[0].GroupActive);
                //var PolicyData = [req.body[0].GroupName, req.body[0].GroupDesc, req.body[0].GroupActive, req.params.id];
                //postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                // analytics_client.execute(query, queryOptions, function (err, result) {

                // console.log(query);
                var PolicyData = [req.body[0].GroupName, req.body[0].GroupDesc, req.body[0].GroupActive, req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    // analytics_client.execute(query, queryOptions, function (err, result) {


                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        // res.status(200).json(result.rows);
                        res.status(200).json(result);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/UpdateGrpdata/:id" + e);
        }

    });

    /*
     * @summary this method is used to DeleteGroupdata
     * @param req.body. will have all group details id
     * functioncode: DeleteGroupdata_0011
     */
    app.delete("/DeleteGroupdata/:id", function (req, res) {

        try {
            if (req.session.authenticated === true) {
                // var query = "delete from OPC_GROUPTABLE where id=" + req.params.id + "";
                var query = 'delete from public."Analytics_M_OPC_Groupstable" where id=$1';

                var PolicyData = [req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    // analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        // res.status(200).json(result.rows);
                        res.status(200).json(result);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/DeleteGroupdata/:id" + e);
        }

    });
    /*
     * @summary this method is used to getTagdetails
     * @param req.body. will have tag details id
     * functioncode: getTagdetails_0012
     */
    app.post("/getTagdetails", function (req, res) {
        /*
         * var gettagdoc = req.body[0];
         * 
         * db.collection("Tags_Data").find({ "OPCID": gettagdoc.opcID,
         * "GROUPID": gettagdoc.grpID }).toArray(function (err, docs) { if (err) {
         * console.log(res, err.message, "Failed to get Tags data."); } else {
         * 
         * res.status(200).json(docs); } });
         */
        try {
            if (req.session.authenticated === true) {
                var query = 'select id as "_id",groupid as "Grpid",groupname as "GrpName",opcid as "OPCID",opcname as "OPCName",maxvalue as "MaxValue",minvalue as "MinValue",pollfreq as "POLLFREQ",polltime as "POLLTIME",tagactive as "TAGACTIVE",tagarthimetic as "TAGARITHMETIC",tagtype as "TAGTYPE",tagdesc as "TAGDESC",tagalias as "TAGALIAS",tagname as "TAGNAME"   from public."Analytics_M_OPC_Tagsdata" where opcid=$1 and groupid=$2 ;';

                var PolicyData = [req.body[0].opcID, req.body[0].grpID];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    // analytics_client.execute(query, [req.body[0].opcID, req.body[0].grpID], queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get OPC data.");

                    } else {
                        // console.log(result.rows);
                        // res.status(200).json(docs);
                        //  res.status(200).json(result.rows);
                        res.status(200).json(result);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getTagdetails" + e);
        }
    });
    /*
     * @summary this method is used to getalltagdata
     * @param req.body. will have all tag details
     * functioncode: getalltagdata_0013
     */
    app.get("/getalltagdata", function (req, res) {

        /*
         * db.collection("Tags_Data").find({}).toArray(function (err, docs) { if
         * (err) { console.log(res, err.message, "Failed to get OPC data."); }
         * else {
         * 
         * res.status(200).json(docs); } });
         */
        try {
            if (req.session.authenticated === true) {
                var query = 'select id as "_id",groupid as "GROUPID",groupname as "GrpName",opcid as "OPCID",opcname as "OPCName",maxvalue as "MaxValue",minvalue as "MinValue",pollfreq as "POLLFREQ",polltime as "POLLTIME",tagactive as "TAGACTIVE",tagarthimetic as "TAGARITHMETIC",tagtype as "TAGTYPE",tagdesc as "TAGDESC",tagalias as "TAGALIAS",tagname as "TAGNAME"   from public."Analytics_M_OPC_Tagsdata";';

                var PolicyData = [];
                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                    // analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get OPC data.");
                    } else {
                        // console.log(result.rows);
                        // res.status(200).json(docs);
                        //res.status(200).json(result.rows);
                        res.status(200).json(result);
                    }
                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/getalltagdata" + e);
        }
    });
    /*
     * @summary this method is used to gettagdata
     * @param req.body. will have all tag data id.
     * functioncode: gettagdata_0014
     */
    app.post("/gettagdata", function (req, res) {

        // console.log(req.body[0]);
        /*
         * db.collection("Tags_Data").insertOne((req.body[0]), function (err,
         * doc) { if (err) { console.log(res, err.message, "Failed to create new
         * Tag data."); } else { } });
         */

        //var uuid = cassandra.types.TimeUuid.now();
        //req.body[0].id = uuid;
        // console.log(req);
        // var query = "Insert into OPC_TAGSDATA JSON '" + JSON.stringify(req.body[0]) + "'";

        try {
            if (req.session.authenticated === true) {
                var query = 'INSERT INTO public."Analytics_M_OPC_Tagsdata"(groupid, groupname, maxvalue, minvalue, opcid, opcname, pollfreq, polltime, tagactive, tagalias, tagarthimetic, tagdesc, tagname, tagtype)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);';
                // console.log(query);

                var PolicyData = [req.body[0].GROUPID, req.body[0].GROUPNAME, req.body[0].MaxValue, req.body[0].MinValue, req.body[0].OPCID, req.body[0].OPCNAME, req.body[0].POLLFREQ, req.body[0].POLLTIME, req.body[0].TAGACTIVE, req.body[0].TAGALIAS, req.body[0].TAGARITHMETIC, req.body[0].TAGDESC, req.body[0].TAGNAME, req.body[0].TAGTYPE];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                    //analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows.Row);
                        res.status(200).json(result);
                        //  res.status(200).json(result.rows);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/gettagdata" + e);
        }
    });
    /*
     * @summary this method is used to UpdateTagdata
     * @param req.body. will have all tag data id.
     * functioncode: UpdateTagdata_0015
     */
    app.put("/UpdateTagdata/:id", function (req, res) {
        /*
         * var updateDoc = req.body[0]; delete updateDoc.TagID; //
         * console.log(updateDoc); db.collection("Tags_Data").updateOne({ _id:
         * new ObjectID(req.params.id) }, updateDoc, function (err, doc) { if
         * (err) { console.log(res, err.message, "Failed to update Tag data"); }
         * else { res.status(204).end(); } });
         */
        try {
            if (req.session.authenticated === true) {

                var query = 'update public."Analytics_M_OPC_Tagsdata" set tagname=$1,tagalias=$2,tagtype=$3,tagdesc=$4,pollfreq=$5,tagarthimetic=$6,tagactive=$7,maxvalue=$8,minvalue=$9 where id=$10';

                console.log(query);

                var PolicyData = [req.body[0].TAGNAME, req.body[0].TAGALIAS, req.body[0].TAGTYPE, req.body[0].TAGDESC, req.body[0].POLLFREQ, req.body[0].TAGARITHMETIC, req.body[0].TAGACTIVE, req.body[0].MaxValue, req.body[0].MinValue, req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        // res.status(200).json(result.rows);

                        res.send("updated");
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/UpdateTagdata/:id" + e);
        }
    });
    /*
     * @summary this method is used to DeleteTagdata
     * @param req.body. will have all tag data id.
     * functioncode: DeleteTagdata_0016
     */
    app.delete("/DeleteTagdata/:id", function (req, res) {

        /*
         * db.collection("Tags_Data").remove({ _id: new ObjectID(req.params.id) },
         * function (err, doc) { if (err) { console.log(res, err.message,
         * "Failed to delete group"); } else {
         * 
         * res.status(204).end(); } });
         */

        // var query = "delete from OPC_TAGSDATA where id=" + req.params.id + "";
        try {
            if (req.session.authenticated === true) {
                var query = 'delete from public."Analytics_M_OPC_Tagsdata" where id=$1';
                var PolicyData = [req.params.id];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    //analytics_client.execute(query, queryOptions, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        // console.log(result.rows);
                        res.status(200).json(result);
                        // res.status(200).json(result.rows);
                    }

                });
            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/DeleteTagdata/:id" + e);
        }
    });


    /*Srikanth Excel To Table OPerations End*/

    //XmluploadStart=================================================================
    /*
     * @summary this method is used to MyFileUpload
     * @param req.body. will have xml file.
     * functioncode: MyFileUpload_0017
     */
    app.post('/XMLFile/MyFileUpload', function (req, res) {
        // console.log("fjhjh");
        try {
            if (req.session.authenticated === true) {
                var form = new formidable.IncomingForm();

                form.multiples = true;

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/public/Analytics/uploadedxmlfiles');

                var path1 = form.uploadDir;


                form.parse(req, function (err, fields, files) {
                    path1 = path.join(path1, files.file.name);
                    //console.log(path1);
                    //console.log(files.file.name);
                    if (fs.existsSync(path1)) {
                        //console.log("Directory Exist");

                        res.send("File already Exists");
                    }
                    else {

                        fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                            if (err) {
                                res.send(err.message);
                            }
                            else {
                                //console.log(files.file.name);
                                res.send(files.file.name);
                            }
                        });

                    }
                });

            }

            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "XMLFile/MyFileUpload" + e);
        }






    });
    /*
     * @summary this method is used to GetXMLFileIdData
     * @param req.body. will have xml file data.
     * functioncode: GetXMLFileIdData_0018
     */






    app.post('/XMLFile/GetXMLFileIdData', function (req, res) {

        try {
            if (req.session.authenticated === true) {

                var query = 'select * from public."Analytics_M_Connections" where id=$1';

                var ConnectionName, ConnectionType, RadioValue, FromURL, UploadedFiles;

                var PolicyData = [req.body.EditData];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to Insert SqlServerdata.");
                        res.send("Failed to select");
                    }
                    else {

                        console.log("Srikanth");
                        ConnectionName = result[0].connectionname;
                        ConnectionType = result[0].connectiontype;

                        console.log(ConnectionName + "  " + ConnectionType);

                        var query11 = 'select * from public."DataConnectors_M_XMLConn" where connectionid=$1';


                        var PolicyData = [req.body.EditData];
                        postgresqlDBManager.PSQL_getdata(query11, PolicyData, function (err, result) {

                            if (err) {
                                console.log(res, err.message, "Failed to Insert SqlServerdata.");
                                res.send("Failed to select");
                            }
                            else {

                                RadioValue = result[0].radiovalue;
                                FromURL = result[0].fromurl;
                                UploadedFiles = result[0].uploadedfiles;

                                var result11 = { "ConnectionName": ConnectionName, "ConnectionType": ConnectionType, "RadioValue": RadioValue, "FromURL": FromURL, "UploadedFiles": UploadedFiles };
                                res.json(result11);
                            }
                        });
                    }
                });

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "XMLFile/GetXMLFileIdData" + e);
        }

    });


    //app.post('/XMLFile/GetXMLFileIdData', function (req, res) {
    //    //console.log(req.body);
    //    // var query='SELECT id as "Id",connectionname as "ConnectionName" FROM
    //    // connections where connectiontype=? allow filtering';
    //    var query = "select * from connections where id=" + req.body.EditData + " allow filtering";
    //    var ConnectionName, ConnectionType, RadioValue, FromURL, UploadedFiles;
    //    //console.log(query);

    //    analytics_client.execute(query, function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //            res.send("Failed to select");
    //        }
    //        else {
    //            //console.log(result.rows); 
    //            ConnectionName = result.rows[0].connectionname;
    //            ConnectionType = result.rows[0].connectiontype;
    //            console.log(ConnectionName + "  " + ConnectionType);
    //            // res.json(result.rows);
    //            var query11 = "select * from xml_conn where connectionid=" + req.body.EditData + " allow filtering";
    //            //console.log(query11);

    //            analytics_client.execute(query11, function (err, result) {
    //                if (err) {
    //                    console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //                    res.send("Failed to select");
    //                }
    //                else {
    //                    //console.log(result.rows); 
    //                    RadioValue = result.rows[0].radiovalue;
    //                    FromURL = result.rows[0].fromurl;
    //                    UploadedFiles = result.rows[0].uploadedfiles;
    //                    //console.log(result.rows[0].FromURL);
    //                    //console.log(RadioValue+" "+UploadedFiles+" "+FromURL);
    //                    var result11 = { "ConnectionName": ConnectionName, "ConnectionType": ConnectionType, "RadioValue": RadioValue, "FromURL": FromURL, "UploadedFiles": UploadedFiles };
    //                    res.json(result11);
    //                }
    //            });
    //        }
    //    });

    //});
    /*
     * @summary this method is used to AutoFillDropDown
     * @param req.body. will have xml files list data.
     * functioncode: AutoFillDropDown_0019
     */
    app.get('/XMLFile/AutoFillDropDown', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var Path = './public/Analytics/uploadedxmlfiles';

                fs.readdir(Path, function (err, files) {

                    if (err) {
                        console.log(res, err.message, "Failed to Load uploadedxmlfiles.");
                        res.send("Failed to Load");
                    }
                    else {
                        res.status(200).send(files);
                    }

                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "XMLFile/AutoFillDropDown" + e);
        }
    });
    /*
     * @summary this method is used to GetXMLTableData
     * @param req.body. will have xml table data.
     * functioncode: GetXMLTableData_0020
     */



    app.post('/XMLFILE/GetXMLTableData', function (req, res) {
        try {
            if (req.session.authenticated === true) {

                var query = 'SELECT uploadedfiles as "UploadedFiles",radiovalue as "RadioValue",fromurl as "FromURL" FROM ';
                query += 'public."DataConnectors_M_XMLConn" where connectionid=$1';

                var PolicyData = [req.body.SelectedId];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to Insert SqlServerdata.");
                        res.send("Failed to select");
                    }
                    else {
                        console.log(result.rows);
                        var radiovalue = result[0].RadioValue;
                        var url = result[0].FromURL;
                        var uploadedfiles = result[0].UploadedFiles;
                        if (radiovalue == "FromUrl") {
                            console.log("URLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
                            var url11 = url.toString();
                            var LastSlash = url11.lastIndexOf("/");
                            var FileName = url11.substring(LastSlash + 1, url11.length);
                            path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + FileName + '';
                            fs.readFile('' + path11 + '', 'utf8', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                var XMLPath = '' + path11 + '';
                                var rawJSON = loadXMLDoc(XMLPath);
                                function loadXMLDoc(filePath) {
                                    var json;
                                    var fileData = fs.readFileSync(filePath, 'ascii');
                                    var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
                                    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                                        json = JSON.stringify(result);
                                        res.send(json);
                                    });
                                }
                            });
                        } else {
                            path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + uploadedfiles + '';
                            fs.readFile('' + path11 + '', 'utf8', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                var XMLPath = '' + path11 + '';
                                var rawJSON = loadXMLDoc(XMLPath);
                                function loadXMLDoc(filePath) {
                                    var json;
                                    var fileData = fs.readFileSync(filePath, 'ascii');

                                    var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
                                    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                                        json = JSON.stringify(result);

                                        res.send(json);
                                    });
                                }
                            });
                        }
                    }
                });

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "XMLFILE/GetXMLTableData" + e);
        }

    });











    //app.post('/XMLFILE/GetXMLTableData', function (req, res) {
    //    // var query = "select UploadedFiles,RadioValue,FromURL from xml_conn
    //    // where id="+req.body.DeleteID+"";
    //    // console.log(query);
    //    var query = 'SELECT uploadedfiles as "UploadedFiles",radiovalue as "RadioValue",fromurl as "FromURL" FROM xml_conn where connectionid=? allow filtering';
    //    //console.log(query);

    //    analytics_client.execute(query, [req.body.SelectedId], function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //            res.send("Failed to select");
    //        }
    //        else {
    //            console.log(result.rows);
    //            //res.json(result.rows);
    //            var radiovalue = result.rows[0].RadioValue;
    //            var url = result.rows[0].FromURL;
    //            var uploadedfiles = result.rows[0].UploadedFiles;
    //            //console.log(radiovalue+" "+url+" "+uploadedfiles);
    //            if (radiovalue == "FromUrl") {
    //                console.log("URLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    //                //console.log(url);
    //                /*console.log(urlll.parse(''+url+'').pathname);
    //                console.log(urlll.parse(''+url+'').path);
    //                var targetStr=urlll.parse(''+url+'').path;
    //                targetStr=targetStr.replace("/","");
    //                console.log(targetStr);*/

    //                var url11 = url.toString();
    //                var LastSlash = url11.lastIndexOf("/");
    //                var FileName = url11.substring(LastSlash + 1, url11.length);
    //                path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + FileName + '';
    //                //console.log(path11);
    //                fs.readFile('' + path11 + '', 'utf8', function (err, data) {
    //                    if (err) {
    //                        return console.log(err);
    //                    }
    //                    // console.log(data);

    //                    /* parser.parseString(data, function (err, result) {
    //                          console.dir(result);
    //                          var json11=JSON.stringify(result);
    //                          console.log('Done');
    //                          res.json(json11);
    //                      });*/
    //                    var XMLPath = '' + path11 + '';
    //                    var rawJSON = loadXMLDoc(XMLPath);
    //                    function loadXMLDoc(filePath) {
    //                        //var fs = require('fs');
    //                        //var xml2js = require('xml2js');
    //                        var json;

    //                        var fileData = fs.readFileSync(filePath, 'ascii');

    //                        var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
    //                        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
    //                            json = JSON.stringify(result);
    //                            //console.log(JSON.stringify(result));
    //                            res.send(json);
    //                        });

    //                        // console.log("File '" + filePath + "/ was successfully read.\n");
    //                        // return json;
    //                    }
    //                    // res.json(data);
    //                    // return;
    //                });
    //            } else {
    //                path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + uploadedfiles + '';
    //                //console.log(path11);
    //                fs.readFile('' + path11 + '', 'utf8', function (err, data) {
    //                    if (err) {
    //                        return console.log(err);
    //                    }
    //                    // console.log(data);

    //                    /* parser.parseString(data, function (err, result) {
    //                          console.dir(result);
    //                          var json11=JSON.stringify(result);
    //                          console.log('Done');
    //                          res.json(json11);
    //                      });*/
    //                    var XMLPath = '' + path11 + '';
    //                    var rawJSON = loadXMLDoc(XMLPath);
    //                    function loadXMLDoc(filePath) {
    //                        //var fs = require('fs');
    //                        //var xml2js = require('xml2js');
    //                        var json;

    //                        var fileData = fs.readFileSync(filePath, 'ascii');

    //                        var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
    //                        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
    //                            json = JSON.stringify(result);
    //                            //console.log(JSON.stringify(result));
    //                            res.send(json);
    //                        });

    //                        // console.log("File '" + filePath + "/ was successfully read.\n");
    //                        // return json;
    //                    }
    //                    // res.json(data);
    //                    // return;
    //                });
    //            }
    //        }
    //    });
    //});
    /*
     * @summary this method is used to RemoveConnection
     * @param req.body. will have xml connection details.
     * functioncode: RemoveConnection_0021
     */


    app.post('/XMLFile/RemoveConnection', function (req, res) {
        try {
            if (req.session.authenticated === true) {

                postgresqlDBManager.PSQL_Connect(function (err, pgclient, done) {
                    if (!err) {

                        var query11 = 'delete from public."DataConnectors_M_XMLConn" where ';
                        query11 += "connectionid=$1";

                        postgresqlDBManager.PSQL_ExecuteQuery(pgclient, query11, [req.body.DeleteID], function (err, result) {

                            if (err) {
                                console.log(res, err.message, "Failed to delete data.");
                            }
                            else {

                                console.log("deleted!!!!!!!@@@@@@@@@@@@");
                                var query = 'delete from public."Analytics_M_Connections" where ';
                                query += "id=$1";

                                postgresqlDBManager.PSQL_ExecuteQuery(pgclient, query, [req.body.DeleteID], function (err, result) {

                                    if (err) {
                                        console.log(res, err.message, "Failed to delete data.");
                                    }
                                    else {

                                        res.status(200).json(result.rows);

                                    }
                                });

                            }
                        });
                    }
                    else {
                        console.log(err.message);
                    }
                });

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/XMLFile/RemoveConnection" + e);
        }

    });






    //app.post('/XMLFile/RemoveConnection', function (req, res) {
    //    //console.log(req);

    //    var query = "delete from connections where id=" + req.body.DeleteID + "";
    //    //console.log(query);
    //    analytics_client.execute(query, queryOptions, function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to delete data.");
    //        }
    //        else {
    //            // console.log(result.rows.Row);
    //            //console.log("deleted!!!!!!!@@@@@@@@@@@@");
    //            res.status(200).json(result.rows);

    //        }
    //    });
    //    var query11 = "delete from xml_conn where connectionid=" + req.body.DeleteID + "";
    //    //console.log(query11);
    //    analytics_client.execute(query11, queryOptions, function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to delete data.");
    //        }
    //        else {
    //            // console.log(result.rows.Row);
    //            console.log("deleted!!!!!!!@@@@@@@@@@@@");
    //            res.status(200).json(result.rows);

    //        }
    //    });

    //});
    /*
     * @summary this method is used to GetXMLConnList
     * @param req.body. will have xml connections list data.
     * functioncode: GetXMLConnList_0022
     */


    //app.get('/XMLFile/GetXMLConnList', function (req, res) {
    //    var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM connections where connectiontype=? allow filtering';
    //    //console.log(query);

    //    analytics_client.execute(query, ['XML Connection'], function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //            res.send("Failed to select");
    //        }
    //        else {
    //            //console.log(result.rows); 
    //            res.json(result.rows);
    //        }
    //    });
    //});



    app.get('/XMLFile/GetXMLConnList', function (req, res) {

        try {
            if (req.session.authenticated === true) {

                var query = 'SELECT id as "Id",connectionname as "ConnectionName"  FROM public."Analytics_M_Connections" where connectiontype=$1 and username=$2;';

                var PolicyData = ['XML Connection',req.session.myemail];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, response) {

                    if (!err) {

                        res.json(response);

                    }

                    else {
                        console.log(res, err.message, "Failed to Insert SqlServerdata.");
                        res.send("Failed to select");
                    }
                });


            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/XMLFile/GetXMLConnList" + e);
        }


    });




    /*
     * @summary this method is used to SaveXMLFileData
     * @param req.body. will have xml connection data.
     * functioncode: SaveXMLFileData_0023
     */





    app.post('/XMLFile/SaveXMLFileData', function (req, res) {
        try {
            if (req.session.authenticated === true) {

                var json = JSON.parse(req.body["routinedata"]);
                var idf_key = "";
                if (json[0].HiddenConId == "Save") {
                    if (json[0].RadioValue == "FromUrl") {
                        var url = "" + json[0].FromUrl + "";
                        var url11 = url.toString();
                        var LastSlash = url11.lastIndexOf("/");
                        var FileName = url11.substring(LastSlash + 1, url11.length);
                        var options = {
                            directory: __dirname + '/public/Analytics/uploadedxmlfiles',
                            filename: "" + FileName + ""
                        }

                        download(url, options, function (err) {
                            if (err) throw err

                        })

                    }
                    var uuid = cassandra.types.TimeUuid.now();
                    json[0].id = uuid;

                    var query = 'INSERT INTO public."Analytics_M_Connections"(connectionname, connectiontype,username,"Role")VALUES';
                    query += "($1,$2,$3,$4) RETURNING id";


                    var PolicyData = [json[0].ConnectionName, json[0].ConnType, req.session.myemail, req.session.RoleId];

                    postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                        if (err) {
                            console.log(res, err.message, "Failed to Insert xmldata.");
                            //  res.send("Failed to Insert");
                            res.send({ "errorresult": "error" });
                        }
                        else {



                            idf_key = result[0].id;

                            var uuid1 = cassandra.types.TimeUuid.now();
                            var query11 = 'INSERT INTO public."DataConnectors_M_XMLConn"(connectionid, fromurl, radiovalue, uploadedfiles) VALUES ($1, $2, $3, $4);';

                            console.log(query11);

                            var PolicyData1 = [idf_key, json[0].FromUrl, json[0].RadioValue, json[0].UploadedFiles];

                            postgresqlDBManager.PSQL_InsertData(query11, PolicyData1, function (err, result) {

                                if (err) {
                                    console.log(query11);
                                    console.log(res, err.message, "Failed to Insert SqlServerdata.");
                                    res.send("Failed to Insert");
                                }
                                else {
                                    console.log(query11);
                                    console.log("inserted monGO");
                                    // res.json("inserted");
                                    res.send({ "responsedata": "inserted" });
                                }
                            });

                            console.log("inserted");

                        }
                    });

                }
                else {
                    console.log("save button clicked fron update");
                    var query = 'update public."Analytics_M_Connections" ';
                    query += "set connectionname=$1 where id=$2";
                    console.log(query);

                    var PolicyData = [json[0].ConnectionName, json[0].HiddenConId];
                    postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {


                        if (err) {
                            console.log(res, err.message, "Failed to update data.");
                        }
                        else {
                            console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

                            var query11 = 'update public."DataConnectors_M_XMLConn" set ';
                            query11 += "radiovalue=$1,fromurl=$2,uploadedfiles=$3 where connectionid=$4";

                            var PolicyData = [json[0].RadioValue, json[0].FromUrl, json[0].UploadedFiles, json[0].HiddenConId];
                            postgresqlDBManager.PSQL_getdata(query11, PolicyData, function (err, result) {
                                if (err) {
                                    console.log(res, err.message, "Failed to update data.");
                                }
                                else {
                                    console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

                                    res.send({ "responsedata": "updated" });
                                }

                            });
                        }

                    });


                    if (json[0].RadioValue == "FromUrl") {
                        var url1 = json[0].FromUrl;

                        var url11 = url1.toString();
                        var LastSlash = url11.lastIndexOf("/");
                        var FileName = url11.substring(LastSlash + 1, url11.length);
                        var path1 = path.join(__dirname, '/public/Analytics/uploadedxmlfiles/' + FileName + '');

                        if (fs.existsSync(path1)) {
                            console.log("Directory Exist");

                            res.send("File already Exists");
                        }
                        else {
                            console.log("NewFile");
                            var options = {
                                directory: __dirname + '/public/Analytics/uploadedxmlfiles',
                                filename: "" + FileName + ""
                            }

                            download(url1, options, function (err) {
                                if (err) throw err
                                console.log("meow")
                            })

                        }

                    }



                }

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/XMLFile/SaveXMLFileData" + e);
        }

    });




    //app.post('/XMLFile/SaveXMLFileData', function (req, res) {
    //    // console.log(req.body);
    //    // console.log(req.body[0]);
    //    //console.log(req.body["routinedata"]);
    //    var json = JSON.parse(req.body["routinedata"]);
    //    //console.log(json[0].HiddenConId);
    //    if (json[0].HiddenConId == "Save") {
    //        if (json[0].RadioValue == "FromUrl") {
    //            //console.log("@@@@@@@@@@@@@@@@@");
    //            //console.log(json[0].FromUrl);
    //            //var url = "http://i.imgur.com/G9bDaPH.jpg"
    //            var url = "" + json[0].FromUrl + "";
    //            var url11 = url.toString();
    //            var LastSlash = url11.lastIndexOf("/");
    //            var FileName = url11.substring(LastSlash + 1, url11.length);
    //            //console.log();
    //            //console.log(FileName);
    //            var options = {
    //                directory: __dirname + '/public/Analytics/uploadedxmlfiles',
    //                filename: "" + FileName + ""
    //            }

    //            download(url, options, function (err) {
    //                if (err) throw err
    //                //console.log("meow")
    //            })
    //            //console.log("@@@@@@@@@@@@@@@@@@@");
    //        }
    //        var uuid = cassandra.types.TimeUuid.now();
    //        json[0].id = uuid;
    //        // var query="Insert into connections JSON
    //        // '"+JSON.stringify(json[0])+"'";
    //        var query = "INSERT INTO iarms360.connections(id, connectionname, connectiontype)VALUES(" + json[0].id + ", '" + json[0].ConnectionName + "', '" + json[0].ConnType + "')";
    //        //console.log(query);

    //        analytics_client.execute(query, function (err, result) {
    //            if (err) {
    //                console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //                res.send("Failed to Insert");
    //            }
    //            else {
    //                console.log("inserted monGO");
    //            }
    //        });
    //        var uuid1 = cassandra.types.TimeUuid.now();
    //        var query11 = "INSERT INTO iarms360.xml_conn(id, connectionid, fromurl, radiovalue, uploadedfiles)VALUES(" + uuid1 + "," + json[0].id + ", '" + json[0].FromUrl + "', '" + json[0].RadioValue + "', '" + json[0].UploadedFiles + "')";
    //        // console.log(query);

    //        analytics_client.execute(query11, function (err, result) {
    //            if (err) {
    //                console.log(res, err.message, "Failed to Insert SqlServerdata.");
    //                res.send("Failed to Insert");
    //            }
    //            else {
    //                console.log("inserted monGO");
    //            }
    //        });
    //    }
    //    else {
    //        console.log("save button clicked fron update");
    //        var query = "update connections set connectionname='" + json[0].ConnectionName + "' where id=" + json[0].HiddenConId + "";
    //        analytics_client.execute(query, queryOptions, function (err, result) {
    //            if (err) {
    //                console.log(res, err.message, "Failed to delete data.");
    //            }
    //            else {
    //                //console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    //                // res.status(200).json(result.rows);

    //            }

    //        });
    //        // console.log(json[0].FromUrl);
    //        var query11 = "update xml_conn set radiovalue='" + json[0].RadioValue + "',fromurl='" + json[0].FromUrl + "',uploadedfiles='" + json[0].UploadedFiles + "' where connectionid=" + json[0].HiddenConId + "";
    //        analytics_client.execute(query11, queryOptions, function (err, result) {
    //            if (err) {
    //                console.log(res, err.message, "Failed to delete data.");
    //            }
    //            else {
    //                //console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    //                // res.status(200).json(result.rows);

    //            }

    //        });

    //        var url1 = json[0].FromUrl;
    //        //var path1=form.uploadDir;
    //        var url11 = url1.toString();
    //        var LastSlash = url11.lastIndexOf("/");
    //        var FileName = url11.substring(LastSlash + 1, url11.length);
    //        var path1 = path.join(__dirname, '/public/Analytics/uploadedxmlfiles/' + FileName + '');
    //        // form.parse(req,function(err, fields, files) {
    //        //  path1=path.join(path1,files.file.name);
    //        // console.log(path1);
    //        // console.log(files.file.name);
    //        if (fs.existsSync(path1)) {
    //            console.log("Directory Exist");

    //            res.send("File already Exists");
    //        }
    //        else {
    //            console.log("NewFile");
    //            var options = {
    //                directory: __dirname + '/public/Analytics/uploadedxmlfiles',
    //                filename: "" + FileName + ""
    //            }

    //            download(url1, options, function (err) {
    //                if (err) throw err
    //                console.log("meow")
    //            })

    //        }
    //        //   });
    //    }

    //});










    /** ****ExcelUploadStart*************** */
    /*
     * @summary this method is used to SaveExcelFileData
     * @param req.body. will have Excel connection data.
     * functioncode: SaveExcelFileData_0024
     */
    app.post('/ExcelFile/SaveExcelFileData', function (req, res) {

        try {
            if (req.session.authenticated === true) {
                //console.log(req);
                console.log(req.body["routinedata"]);
                var uuid = cassandra.types.TimeUuid.now();
                var json = JSON.parse(req.body["routinedata"]);
                json[0].id = uuid;
                if (json[0].HiddenConId == "Save") {
                    if (json[0].RadioValue == "FromUrl") {
                        //console.log("@@@@@@@@@@@@@@@@@");
                        console.log(json[0].FromUrl);
                        // var url = "http://i.imgur.com/G9bDaPH.jpg"
                        var url = "" + json[0].FromUrl + "";
                        var url11 = url.toString();
                        var LastSlash = url11.lastIndexOf("/");
                        var FileName = url11.substring(LastSlash + 1, url11.length);
                        // console.log();
                        console.log(FileName);
                        path1 = __dirname + '/public/Analytics/uploadedfiles/' + FileName + '';
                        if (fs.existsSync(path1)) {
                            // Do something
                            console.log("File Exists");
                        }
                        else {
                            var options = {
                                directory: __dirname + '/public/Analytics/uploadedfiles',
                                filename: "" + FileName + ""
                            }

                            download(url, options, function (err) {
                                if (err) throw err
                                console.log("meow")
                            })
                            console.log("@@@@@@@@@@@@@@@@@@@");
                        }
                    }

                    var query = 'INSERT INTO public."Analytics_M_Connections"(connectionname, connectiontype,username,"Role")VALUES';
                    query += "($1,$2,$3,$4) RETURNING id;";
                    console.log(query);

                    var PolicyData = [json[0].ConnectionName, json[0].ConnType, req.session.myemail, req.session.RoleId];
                    postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                        // analytics_client.execute(query, function (err, result) {
                        if (err) {
                            console.log(res, err.message, "Failed to Insert SqlServerdata.");
                            // res.send("Failed to Insert");
                            res.send("Fail");
                            // console.log("Faileddddddddddddddddd");
                        }
                        else {
                            console.log("inserted excel");
                            console.log(result[0].id);
                            var idforfk = result[0].id
                            console.log(idforfk);
                            var uuid1 = cassandra.types.TimeUuid.now();
                            var FileName = json[0].UploadedFiles;
                            var filepath = __dirname + '/public/Analytics/uploadedfiles/' + FileName + '';
                            var query11 = 'INSERT INTO public."DataConnectors_M_ExcelConn"(connectionid, fromurl, radiovalue,sheetnumber,uploadedfilename,uploadedfilepath)VALUES';
                            query11 += "($1,$2,$3,$4,$5,$6);";
                            console.log(query11);


                            var PolicyData = [idforfk, json[0].FromUrl, json[0].RadioValue, json[0].Sheetnum, json[0].UploadedFiles, filepath];
                            postgresqlDBManager.PSQL_getdata(query11, PolicyData, function (err, result) {
                                // analytics_client.execute(query11, function (err, result) {
                                if (err) {
                                    console.log(res, err.message, "Failed to Insert SqlServerdata.");
                                    res.send("Failed to Insert");
                                    // console.log("Failed");
                                }
                                else {
                                    console.log("inserted excel");
                                    res.send("inserted");
                                }
                            });
                        }
                    });

                }
                else {
                    console.log("updated excel connection......");
                    console.log("save button clicked fron update");

                    var query = 'update public."Analytics_M_Connections" set connectionname=$1 where id=$2;';

                    var PolicyData = [json[0].ConnectionName, json[0].HiddenConId];
                    postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {
                        //analytics_client.execute(query, queryOptions, function (err, result) {
                        if (err) {
                            console.log(res, err.message, "Failed to delete data.");
                        }
                        else {
                            console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
                            // res.status(200).json(result.rows);

                        }

                    });
                    // console.log(json[0].FromUrl);
                    var query12 = 'select * from public."DataConnectors_M_ExcelConn" where connectionid=$1; ';
                    console.log(query12);
                    // console.log
                    var PolicyData = [json[0].HiddenConId];
                    postgresqlDBManager.PSQL_getdata(query12, PolicyData, function (err, result) {

                        //  analytics_client.execute(query12, [json[0].HiddenConId], function (err, result) {
                        if (err) {
                            console.log(res, err.message, "Failed to delete data.");
                        }
                        else {
                            // console.log(result.rows.Row);
                            // console.log("deleted excel conn from connection
                            // table.......");
                            // res.status(200).json(result.rows);
                            console.log(result[0].id);
                            var FileName = json[0].UploadedFiles;
                            var filepath = __dirname + '/public/Analytics/uploadedfiles/' + FileName + '';
                            var query11 = 'update public."DataConnectors_M_ExcelConn" set ';
                            query11 += "radiovalue=$1,fromurl=$2,uploadedfilename=$3,uploadedfilepath=$4,sheetnumber=$5 where id=$6";


                            var PolicyData = [json[0].RadioValue, json[0].FromUrl, json[0].UploadedFiles, filepath, json[0].Sheetnum, result[0].id];
                            postgresqlDBManager.PSQL_getdata(query11, PolicyData, function (err, result) {

                                //analytics_client.execute(query11, queryOptions, function (err, result) {
                                if (err) {
                                    console.log(res, err.message, "Failed to delete data.");
                                }
                                else {
                                    console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
                                    // res.status(200).json(result.rows);
                                    if (json[0].RadioValue == "FromUrl") {
                                        //console.log("@@@@@@@@@@@@@@@@@");
                                        console.log(json[0].FromUrl);
                                        // var url = "http://i.imgur.com/G9bDaPH.jpg"
                                        var url = "" + json[0].FromUrl + "";
                                        var url11 = url.toString();
                                        var LastSlash = url11.lastIndexOf("/");
                                        var FileName = url11.substring(LastSlash + 1, url11.length);
                                        // console.log();
                                        console.log(FileName);
                                        path1 = __dirname + '/public/Analytics/uploadedfiles/' + FileName + '';
                                        if (fs.existsSync(path1)) {
                                            // Do something
                                            console.log("File Exists");
                                        }
                                        else {
                                            var options = {
                                                directory: __dirname + '/public/Analytics/uploadedfiles',
                                                filename: "" + FileName + ""
                                            }

                                            download(url, options, function (err) {
                                                if (err) throw err
                                                console.log("meow")
                                            })
                                            //console.log("@@@@@@@@@@@@@@@@@@@");
                                        }
                                    }
                                    res.send("updated");
                                }

                            });
                        }
                    });
                }

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/SaveExcelFileData" + e);
        }

    });
    /*
     * @summary this method is used to SaveXMLFileData
     * @param req.body. will have Excel file.
     * functioncode: SaveXMLFileData_0025
     */
    app.post('/ExcelFile/MyFileUpload', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                //console.log("ExceLLLLLLLLLLLLLLLLLL");
                var form = new formidable.IncomingForm();

                form.multiples = true;

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/public/Analytics/uploadedfiles');

                var path1 = form.uploadDir;


                form.parse(req, function (err, fields, files) {
                    path1 = path.join(path1, files.file.name);
                    console.log(path1);
                    console.log(files.file.name);
                    if (fs.existsSync(path1)) {
                        console.log("Directory Exist");

                        res.send("File already Exists");
                    }
                    else {

                        fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                            if (err) {
                                res.send(err.message);
                            }
                            else {
                                console.log(files.file.name);
                                res.send(files.file.name);
                            }
                        });

                    }
                });

            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/MyFileUpload" + e);
        }
    });
    /*
     * @summary this method is used to GetExcelConnList
     * @param req.body. will have Excel connections list data.
     * functioncode:GetExcelConnList_0026
     */
    //app.get('/ExcelFile/GetExcelConnList', function (req, res) {
    //    var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM connections where connectiontype=? allow filtering';
    //    console.log(query);

    //    analytics_client.execute(query, ['Excel Connection'], function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "failed to read excel conn's.");
    //            res.send("Failed to read excel connections");
    //        }
    //        else {
    //            console.log(result.rows);
    //            res.json(result.rows);
    //        }
    //    });
    //});



    app.get('/ExcelFile/GetExcelConnList', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM public."Analytics_M_Connections" where connectiontype=$1 and username=$2;';
                console.log(query);

                var PolicyData = ['Excel Connection',req.session.myemail];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, response) {


                    // analytics_client.execute(query, ['Excel Connection'], function (err, result) {
                    if (err) {
                        console.log(res, err.message, "failed to read excel conn's.");
                        res.send("Failed to read excel connections");
                    }
                    else {
                        //console.log(result.rows);
                        //res.json(result.rows);
                        console.log("SRIKANTH@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
                        res.json(response);
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/GetExcelConnList" + e);
        }
    });










    /*
     * @summary this method is used to RemoveConnection
     * @param req.body. will have Excel connection data.
     * functioncode:RemoveConnection_0027
     */
    //app.post('/ExcelFile/RemoveConnection', function (req, res) {
    //    console.log(req);

    //    var query = "delete from connections where id=" + req.body.DeleteID + "";
    //    console.log(query);
    //    analytics_client.execute(query, queryOptions, function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to delete data.");
    //        }
    //        else {
    //            // console.log(result.rows.Row);
    //            console.log("deleted excel conn from connection table.......");
    //            // res.status(200).json(result.rows);

    //        }
    //    });
    //    var query1 = 'select * from excel_conn where connectionid=? allow filtering';
    //    console.log(query1);
    //    analytics_client.execute(query1, [req.body.DeleteID], function (err, result) {
    //        if (err) {
    //            console.log(res, err.message, "Failed to delete data.");
    //        }
    //        else {
    //            // console.log(result.rows.Row);
    //            // console.log("deleted excel conn from connection
    //            // table.......");
    //            // res.status(200).json(result.rows);
    //            console.log(result.rows[0].id);
    //            var query2 = "delete from excel_conn where id=" + result.rows[0].id + "";
    //            analytics_client.execute(query2, queryOptions, function (err, result) {
    //                if (err) {
    //                    console.log(res, err.message, "Failed to delete data.");
    //                }
    //                else {
    //                    // console.log(result.rows.Row);
    //                    console.log("deleted excel conn from excel_conn table.......");
    //                    // res.status(200).json(result.rows);

    //                }
    //            });
    //        }
    //    });

    //});






    app.post('/ExcelFile/RemoveConnection', function (req, res) {
        // console.log(req);

        // var query = "delete from connections where id=" + req.body.DeleteID + "";

        try {
            if (req.session.authenticated === true) {
                // console.log(result.rows.Row);
                // console.log("deleted excel conn from connection table.......");
                var query1 = 'select * from public."DataConnectors_M_ExcelConn" where connectionid=$1;';
                console.log(query1);
                console.log(req.body.DeleteID);
                var PolicyData = [req.body.DeleteID];
                postgresqlDBManager.PSQL_getdata(query1, PolicyData, function (err, result) {

                    //  analytics_client.execute(query1, [req.body.DeleteID], function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to delete data.");
                    }
                    else {
                        // console.log(result.rows.Row);
                        // console.log("deleted excel conn from connection
                        // table.......");
                        // res.status(200).json(result.rows);
                        //console.log(result.rows[0].id);
                        console.log(result[0].id);
                        var query2 = 'delete from public."DataConnectors_M_ExcelConn" where id=$1';
                        var PolicyData = [result[0].id];
                        postgresqlDBManager.PSQL_getdata(query2, PolicyData, function (err, result) {

                            // analytics_client.execute(query2, queryOptions, function (err, result) {
                            if (err) {
                                console.log(res, err.message, "Failed to delete data.");
                            }
                            else {
                                // console.log(result.rows.Row);
                                console.log("deleted excel conn from excel_conn table.......");
                                var query = 'delete from public."Analytics_M_Connections" where id=$1';
                                console.log(query);
                                console.log(req.body.DeleteID);
                                var PolicyData = [req.body.DeleteID];
                                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, response) {

                                    //analytics_client.execute(query, queryOptions, function (err, result) {
                                    if (err) {
                                        console.log(res, err.message, "Failed to delete data.");
                                    }
                                    else {
                                        res.send("deleted");
                                    }
                                });
                                // res.status(200).json(result.rows);

                            }
                        });
                    }
                });

                // res.status(200).json(result.rows);

                //   }
                //  });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/RemoveConnection" + e);
        }

    });





    /*
     * @summary this method is used to GetExcelFileIdData
     * @param req.body. will have Excel connection data.
     * functioncode:GetExcelFileIdData_0028
     */
    app.post('/ExcelFile/GetExcelFileIdData', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'select * from public."Analytics_M_Connections" where id=$1;';
                var ConnectionName, ConnectionType, RadioValue, FromURL, UploadedFiles, SheetNumber;
                console.log(query);

                var PolicyData = [req.body.EditData];
                postgresqlDBManager.PSQL_getdata(query, PolicyData, function (err, result) {

                    // analytics_client.execute(query, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to Insert SqlServerdata.");
                        res.send("Failed to select");
                    }
                    else {
                        //console.log(result.rows);
                        //ConnectionName = result.rows[0].connectionname;
                        //ConnectionType = result.rows[0].connectiontype;
                        console.log(result);
                        ConnectionName = result[0].connectionname;
                        ConnectionType = result[0].connectiontype;
                        console.log(ConnectionName + "  " + ConnectionType);
                        // res.json(result.rows);
                        var query11 = 'select * from public."DataConnectors_M_ExcelConn" where connectionid=$1 ';
                        console.log(query11);

                        var PolicyData = [req.body.EditData];
                        postgresqlDBManager.PSQL_getdata(query11, PolicyData, function (err, result) {

                            //  analytics_client.execute(query11, function (err, result) {
                            if (err) {
                                console.log(res, err.message, "Failed to Insert SqlServerdata.");
                                res.send("Failed to select");
                            }
                            else {
                                //console.log(result.rows);
                                //RadioValue = result.rows[0].radiovalue;
                                //FromURL = result.rows[0].fromurl;
                                //SheetNumber = result.rows[0].sheetnumber;
                                //UploadedFiles = result.rows[0].uploadedfiles;
                                //console.log(result.rows[0].FromURL);
                                console.log(result);
                                RadioValue = result[0].radiovalue;
                                FromURL = result[0].fromurl;
                                SheetNumber = result[0].sheetnumber;
                                UploadedFiles = result[0].uploadedfilename;
                                console.log(result[0].FromURL);
                                console.log(RadioValue + " " + UploadedFiles + " " + FromURL);
                                var result11 = { "ConnectionName": ConnectionName, "ConnectionType": ConnectionType, "RadioValue": RadioValue, "FromURL": FromURL, "UploadedFiles": UploadedFiles, "SheetNumber": SheetNumber };
                                res.json(result11);
                            }
                        });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/GetExcelFileIdData" + e);
        }

    });
    /*
     * @summary this method is used to AutoFillDropDown
     * @param req.body. will have Excel connections files list.
     * functioncode: AutoFillDropDown_0029
     */
    app.get('/ExcelFile/AutoFillDropDown', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var Path = './public/Analytics/uploadedfiles';

                fs.readdir(Path, function (err, files) {

                    if (err) {
                        console.log(res, err.message, "Failed to Load uploadedxmlfiles.");
                        res.send("Failed to Load");
                    }
                    else {

                        //   res.send(files);
                        res.status(200).send(files);
                    }

                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/GetExcelFileIdData" + e);
        }
    });
    /*
     * @summary this method is used to GetExcelTableData
     * @param req.body. will have Excel table data.
     * functioncode: GetExcelTableData_0030
     */
    app.post('/ExcelFile/GetExcelTableData', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query1 = 'select * from public."DataConnectors_M_ExcelConn" where connectionid=$1';

                var PolicyData = [req.body.SelectedId];
                postgresqlDBManager.PSQL_getdata(query1, PolicyData, function (err, result) {


                    // analytics_client.execute(query2, queryOptions, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to delete data.");
                    }
                    else {
                        // console.log(result.rows.Row);
                        console.log("select excel conn from excel_conn table.......");
                        // res.status(200).json(result.rows);

                        var query2 = 'select * from public."DataConnectors_M_ExcelConn" where id=$1';
                        var PolicyData = [result[0].id];
                        postgresqlDBManager.PSQL_getdata(query2, PolicyData, function (err, result) {

                            //analytics_client.execute(query2, queryOptions, function (err, result) {
                            if (err) {
                                console.log(res, err.message, "Failed to delete data.");
                            }
                            else {
                                // console.log(result.rows.Row);
                                console.log("excel table data");
                                // res.status(200).json(result.rows);
                                //console.log(result.rows[0].uploadedfilename);
                                //console.log(result.rows[0].sheetnumber);
                                //FileName1 = result.rows[0].uploadedfilename;
                                console.log(result[0].uploadedfilename);
                                console.log(result[0].sheetnumber);
                                FileName1 = result[0].uploadedfilename;
                                if (result[0].radiovalue == "FromUrl") {
                                    var url = "" + result[0].fromurl + "";
                                    var url11 = url.toString();
                                    var LastSlash = url11.lastIndexOf("/");
                                    FileName1 = url11.substring(LastSlash + 1, url11.length);
                                    // console.log();
                                    console.log(FileName1);
                                }
                                path1 = __dirname + '/public/Analytics/uploadedfiles/' + FileName1 + '';
                                // form.parse(req,function(err, fields, files) {
                                console.log(path1);
                                //  console.log(fields.Ddl_sheetName);

                                //path1=path.join(path1,files.file.name);
                                var workbook = XLSX.readFile(path1);
                                var sheet_name_list = workbook.SheetNames[result[0].sheetnumber];
                                console.log(sheet_name_list);

                                sheet_name_list = ["" + workbook.SheetNames[result[0].sheetnumber] + ""];
                                sheet_name_list.forEach(function (y) {

                                    var worksheet = workbook.Sheets[y];
                                    var hji;
                                    var headers = {};
                                    var data = [];
                                    // worksheet = XLSX.utils.sheet_to_row_object_array(worksheet,
                                    // {'date_format':'dd/mm/yyyy'});
                                    // worksheet = XLSX.utils.(worksheet,
                                    // {'date_format':'dd/mm/yyyy'});

                                    for (z in worksheet) {
                                        if (z[0] === '!')
                                            continue; // parse out the column, row, and value
                                        var tt = 0;
                                        for (var i = 0; i < z.length; i++) {
                                            if (!isNaN(z[i])) {
                                                tt = i; break;
                                            }
                                        };
                                        var col = z.substring(0, tt);
                                        var row = parseInt(z.substring(tt)); var value = worksheet[z].v;

                                        // store header names
                                        if (row == 1 && value) {
                                            headers[col] = value;
                                            continue;
                                        }

                                        if (!data[row])
                                            data[row] = {};
                                        data[row][headers[col]] = value;
                                    }
                                    // drop those first two rows which are empty
                                    data.shift();
                                    data.shift();
                                    console.log(data);
                                    res.json(data);
                                    //hji=data;
                                    //res.send(data)

                                    /* var xml = jsonxml({                   
                                           parent:data
                                       })
                                       
                                       console.log(xml);
                                     fs.writeFile('./public/XMLSchema/'+fields.Ddl_sheetName+'.xml', xml, function(err) {
                                            if (err) {
                                                 return console.error(err);
                                                 //res.send(err.message);
                                              }
                                            else
                                                {
                                               //res.send("Project Saved Successfully");
                                               
                                                }
                                       });*/


                                });
                                // console.log(hj1);
                                //  res.json(hji)


                                //    });
                            }

                        });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error:" + "\t" + "/ExcelFile/GetExcelFileIdData" + e);
        }
    });
    /** ****ExcelUploadEnd***************** */


    //XmluploadEnd=================================================================

    /*Mongo DB Database Operations*/

    /* Create Parameter Database Operations end */
    /*
     * @summary this method is used to SaveMongo_Connection
     * @param req.body. will have Mongo Connection Details.
     * functioncode: SaveMongo_Connection_0031
     */
    app.post('/MongoDBConnection/SaveMongo_Connection', function (req, res) {

        json = JSON.parse(req.body.Save_Conndata);

        var uuid = cassandra.types.TimeUuid.now();
        json[0].id = uuid;

        if (json[0].operation == "save") {
            delete json[0].operation;
            var query = "Insert into connections JSON '" + JSON.stringify(json[0]) + "'";
            // console.log(query);

            analytics_client.execute(query, function (err, result) {
                if (err) {
                    console.log(res, err.message, "Failed to Insert SqlServerdata.");
                    res.send("Failed to Insert");
                }
                else {
                    var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM connections where connectiontype=? allow filtering';
                    //console.log(query);

                    analytics_client.execute(query, ['MongoDB Connection'], function (err, result) {
                        if (err) {
                            console.log(res, err.message, "Failed to Insert SqlServerdata.");
                            res.send("Failed to select");
                        }
                        else {
                            res.status(200).json({ responsedata: result.rows });
                        }
                    });
                }
            });
        }
        else {
            query = "update connections set connectionname='" + json[0].connectionname + "',connectiontype='" + json[0].connectiontype + "',servername='" + json[0].servername + "',portnumber=" + json[0].portnumber + ",databasename='" + json[0].databasename + "' where id=" + json[0].operation + "";
            analytics_client.execute(query, queryOptions, function (err, result) {
                if (err) {
                    console.log(res, err.message, "Failed to delete data.");
                }
                else {

                    //res.status(200).json(result.rows);
                    var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM connections where connectiontype=? allow filtering';
                    //console.log(query);

                    client.execute(query, ['MongoDB Connection'], function (err, result) {
                        if (err) {
                            console.log(res, err.message, "Failed to Insert SqlServerdata.");
                            res.send("Failed to select");
                        }
                        else {
                            res.status(200).json({ responsedata: result.rows });
                        }
                    });

                }
            });
        }
    });
    /*
     * @summary this method is used to RemoveMongo_Connection
     * @param req.body. will have Mongo Connection Details.
     * functioncode: RemoveMongo_Connection_0032
     */
    app.post('/MongoDBConnection/RemoveMongo_Connection', function (req, res) {

        var query = "delete from connections where Id=" + req.body.remove_ConndataId + "";

        analytics_client.execute(query, queryOptions, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to delete data.");
            }
            else {

                res.status(200).json(result.rows);

            }
        });
    });
    /*
     * @summary this method is used to GetMongoCollectionAvail
     * @param req.body. will have Selected Mongo Connection Details.
     * functioncode: GetMongoCollectionAvail_0033
     */
    app.post('/MongoDBConnection/GetMongoCollectionAvail', function (req, res) {

        var server, port, result11;
        var query = "select * from connections where Id=" + req.body.selectedConnId + "";

        analytics_client.execute(query, queryOptions, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to delete data.");
            }
            else {

                result11 = JSON.stringify(result.rows);
                var json = JSON.parse(result11);

                server = json[0].servername;
                port = json[0].portnumber;
                var dbname = json[0].databasename;
                var Url = "mongodb://" + server + ":" + port + "/" + dbname;
                console.log(Url);
                mongodb.MongoClient.connect(Url, function (err, database) {
                    if (err) {
                        console.log(res, err.message, "Failed to update data.");
                        res.send({ errorresult: err.message });
                    }
                    else {
                        database.listCollections().toArray(function (err, collInfos) {
                            res.status(200).json({ "jsonsplist": collInfos });
                        });

                    }
                });

            }

        });

    });
    /*
     * @summary this method is used to GET_Colldtails
     * @param req.body. will have Mongo collections Details.
     * functioncode: GET_Colldtails_0034
     */
    app.post('/MongoDBConnection/GET_Colldtails', function (req, res) {
        //console.log(req.body);
        var json = JSON.parse((req.body.GET_SPdtail));
        //console.log(json[0].SelcSPId);
        //console.log(json[0].StorePDname);
        var query = "select * from connections where id=" + json[0].SelcSPId + "";
        analytics_client.execute(query, queryOptions, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to update data.");
            }
            else {
                //console.log(result.rows);
                var server = result.rows[0].servername;
                var port = result.rows[0].portnumber;
                var connectionname = result.rows[0].connectionname;
                var connectiontype = result.rows[0].connectiontype;
                var dbname = result.rows[0].databasename;

                var Url = "mongodb://" + server + ":" + port + "/" + dbname + "";
                mongodb.MongoClient.connect(Url, function (err, database) {
                    if (err) {
                        console.log(res, err.message, "Failed to update data.");
                        res.send({ errorresult: err.message });
                    }
                    else {

                        var col = database.collection('' + json[0].StorePDname + '');

                        col.find({}, { _id: 0 }).toArray(function (err, docs) {
                            res.json({ "data": docs });
                        });
                    }
                });
            }
        });
    });
    /*
     * @summary this method is used to EditMongo_Connection
     * @param req.body. will have Mongo connection Details.
     * functioncode: EditMongo_Connection_0035
     */
    app.post('/MongoDBConnection/EditMongo_Connection', function (req, res) {

        var query = "select * from connections where Id=" + req.body.Edit_Conn + "";
        analytics_client.execute(query, queryOptions, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to update data.");
                res.send({ errorresult: err.message });
            }
            else {
                res.status(200).json(result.rows);

            }
        });
    });
    /*
     * @summary this method is used to GetMongoConnList
     * @param req.body. will have Mongo connection list data.
     * functioncode: GetMongoConnList_0036
     */
    app.get('/MongoDBConnection/GetMongoConnList', function (req, res) {

        var query = 'SELECT id as "Id",connectionname as "ConnectionName" FROM connections where connectiontype=? allow filtering';
        //console.log(query);

        analytics_client.execute(query, ['MongoDB Connection'], function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to Insert SqlServerdata.");
                res.send("Failed to select");
            }
            else {
                res.json(result.rows);
            }
        });
    });

    /*MongoDB Database OPerations End*/


    // ....Srikanth Code End.... //


    // /..... Abhiram Code starts....///


    /* conditional monitoring */


    /* Location database operations */


    /*
     * @summary this method is used to LoactionDataSource
     * @param req.body. will have LoactionDataSource.
     * functioncode: LoactionDataSource_0037
     */
    app.get("/LoactionDataSource", function (req, res) {


        analytics_client.execute('select * from LocationMaster', function (err, docs) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                res.status(200).json(docs);
            }

        });
    });
    /*
     * @summary this method is used to getLocationdata
     * @param req.body. will have LoactionDataSource.
     * functioncode: getLocationdata_0038
     */
    app.get("/getLocationdata", function (req, res) {
        analytics_client.execute('select id as "Id",locationid  as "LocationId",locationname as "LocationName",parentlocationid as "ParentLocationId",description as "Description" from LocationMaster;', function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {

                res.status(200).json(result.rows);
            }

        });

    });
    /*
     * @summary this method is used to getLocationdata
     * @param req.body. will have location data existence.
     * functioncode: getLocationdata_0039
     */
    app.post("/checkdistinctlocation", function (req, res) {
        var query = 'select * from LocationMaster where locationid= ?' +
        ' and locationname= ? ' + ' allow filtering';


        analytics_client.execute(query, [req.body[0].LocationId, req.body[0].LocationName], function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {

                console.log(result.rows.Row);
                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to CreateLocationdata
     * @param req.body. will have location data.
     * functioncode: CreateLocationdata_0040
     */
    app.post("/CreateLocationdata", function (req, res) {
        console.log(req.body);
        console.log("save location data");

        var uuid = cassandra.types.TimeUuid.now();

        req.body[0].id = uuid;


        var query = "Insert into LocationMaster JSON '" + JSON.stringify(req.body[0]) + "'";
        console.log(query);


        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {

                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to getTreeLocationdata
     * @param req.body. will have locations tree date.
     * functioncode: getTreeLocationdata_0041
     */
    app.get("/getTreeLocationdata", function (req, res) {
        console.log("get location data");
        analytics_client.execute('select locationid as "LocationId",locationname as "LocationName" from LocationMaster', function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(result);
                res.status(200).json(result.rows);
            }

        });

    });
    /*
     * @summary this method is used to UpdateLocationdata
     * @param req.body. will have LoactionDataSource.
     * functioncode: UpdateLocationdata_0042
     */
    app.put("/UpdateLocationdata/:id", function (req, res) {
        var query = "update LocationMaster set LocationName='" + req.body[0].LocationName + "',Description='" + req.body[0].Description + "' where LocationId='" + req.body[0].LocationId + "' and parentlocationid='" + req.body[0].ParentLocationId + "'";
        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to DeleteLocationdata
     * @param req.body. will have location data.
     * functioncode: DeleteLocationdata_0043
     */
    //app.put("/DeleteLocationdata/:id", function (req, res) {


    //    var query = "delete from LocationMaster where LocationId IN(" + req.body[0].ChildArray + " )";

    //    analytics_client.execute(query, function (err, result) {

    //        if (err) {
    //            console.log(res, err.message, "Failed to get LoactionDataSource.");
    //        }
    //        else {
    //            // console.log(result.rows);
    //            res.status(200).json(result.rows);
    //        }

    //    });
    //});
    var obj = [];
    app.put("/DeleteLocationdata/:id", function (req, res) {
        obj = [];
        obj.push({ "id": req.params.id });

        var data = Test(req.params.id);
        setTimeout(function () {
            //console.log("boo" + JSON.stringify(obj));
            // console.log(obj.length);
            for (var i = 0; i < obj.length; i++) {
                //console.log(obj[i]["id"]);
                var query = "delete from LocationMaster where LocationId IN('" + obj[i]["id"] + "')";
                //console.log(query);
                analytics_client.execute(query, function (err, result) {

                    if (err) {
                        console.log(res, err.message, "Failed to get LoactionDataSource.");
                    }
                    else {
                        //console.log(result.rows);
                        //if(i>=obj.length)
                        //{
                        //    console.log(i);
                        //    result.status(200).json(result.rows);

                        //}
                    }
                    if (i >= obj.length) {
                        //console.log(i);
                        res.status(200).json(result.rows);

                    }
                });

            }
        }, 100)
        //var query = "delete from LocationMaster where LocationId IN(" + req.body[0].ChildArray + " )";

        //analytics_client.execute(query, function (err, result) {

        //    if (err) {
        //        console.log(res, err.message, "Failed to get LoactionDataSource.");
        //    }
        //    else {
        //         console.log(result.rows);
        //        res.status(200).json(result.rows);
        //    }

        //});
    });

    function Test(id) {
        //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEst")
        var query = "select locationid from LocationMaster where parentlocationid  IN('" + id + "') allow filtering;";

        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(result, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        obj.push({ "id": result.rows[i].locationid });
                        // console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssss:::::::::::"+JSON.stringify(obj));
                        Test(result.rows[i].locationid);
                    }
                }


            }
        });

    }
    /*
     * @summary this method is used to DeleteChildLocationdata
     * @param req.body. will have parent and child location data.
     * functioncode: DeleteChildLocationdata_0044
     */
    app.put('/DeleteChildLocationdata/:id', function (req, res) {

        var query = "delete from LocationMaster where LocationId='" + req.body[0].LocationId + "'";
        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                res.status(200).json(result.rows);
            }

        });
    })
    // /...............Location Database Operations
    // Ended.................///

    /*
     * @summary this method is used to getAssetdata 
     * functioncode: getAssetdata_0045
     */
    app.get("/getAssetdata", function (req, res) {
        //console.log("hai");
        var query = 'select assetid as "AssetId",assetname as "AssetName",assetlocname as "AssetLocName",parentasset as "ParentAsset",id as "ID",assetlocid as "AssetLocId",id as "_id" from assetmaster';
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {

                res.status(200).json(result.rows);

            }

        });
    });

    /*
     * @summary this method is used to checkdistinctassets
     * @param req.body. will have asset data existence.
     * functioncode: checkdistinctassets_0046
     */
    app.post("/checkdistinctassets", function (req, res) {

        var query = 'select * from assetmaster where assetid= ?' +
        ' and assetname= ? ' + ' allow filtering';
        analytics_client.execute(query, [req.body[0].AssetId, req.body[0].AssetName], function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(query);
                console.log(result.rows);
                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to CreateAssetdata
     * @param req.body. will have asset data.
     * functioncode: CreateAssetdata_0047
     */
    app.post("/CreateAssetdata", function (req, res) {
        var uuid = cassandra.types.TimeUuid.now();
        req.body[0].id = uuid;
        var query = "Insert into assetmaster JSON '" + JSON.stringify(req.body[0]) + "'";


        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {
                // console.log(result.rows.Row);
                res.status(200).json(result.rows);
            }
        });
    });
    /*
     * @summary this method is used to CreateAssetdata 
     * functioncode: CreateAssetdata_0048
     */
    app.get("/getTreeAssetdata", function (req, res) {
        // console.log("tree data");

        analytics_client.execute('select assetid as "AssetId",assetname as "AssetName" from assetmaster', function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to UpdateAssetdata
     * @param req.body. will have asset data.
     * functioncode: UpdateAssetdata_0049
     */
    app.put("/UpdateAssetdata/:id", function (req, res) {

        // console.log("update started");
        var query = "update assetmaster set AssetName='" + req.body[0].AssetName + "',AssetId='" + req.body[0].AssetId + "' where Id=" + req.body[0].Asset_id + "";
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }

        });
    });
    /*
     * @summary this method is used to DeleteAssetdata
     * @param req.body. will have asset data.
     * functioncode: DeleteAssetdata_0050
     */
    app.put("/DeleteAssetdata/:id", function (req, res) {
        // console.log("delete");
        var query = "delete from assetmaster  where Id=" + req.body[0].Asset_id + "";
        // console.log(query);
        // console.log(req.body[0].Asset_id);
        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }

        });
    });


    /* Manage meters Database Operations */
    /*
     * @summary this method is used to getAssetdata1
     
     * functioncode: getAssetdata1_0051
     */
    app.get("/getAssetdata1", function (req, res) {

        var query = 'select id as "_id", assetid as "AssetId",assetname as "AssetName" from assetmaster';
        analytics_client.execute(query, function (err, result) {
            // console.log(req.result[0]);
            // console.log(result[0]["ID"]);
            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {
                // console.log(result.rows.Row);
                // console.log(result);
                res.status(200).json(result.rows);
                // console.log(json(result.rows));
                // console.log(result.rows[0][id]);

            }

        });
    });



    /* Manage meters Database Operations */
    /*
     * @summary this method is used to gettagdata
     * @param req.body. will have virtual tags data.
     * functioncode: gettagdata_0052
     */
    app.get("/gettagdata", function (req, res) {

        var query = 'select id as "_id",tagname as "TAGNAME", tagalias as "TAGALIAS",opcid as "OPCID" from opc_tagsdata';
        // console.log(query);
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {
                res.status(200).json(result.rows);

                // console.log(result.rows);
                // console.log(result.rows[0][id]);

            }

        });
    });

    /*
     * @summary this method is used to getVtagdata
     * @param req.body. will have virtual tags data.
     * functioncode: getVtagdata_0053
     */
    app.get("/getVtagdata", function (req, res) {

        var query = 'select id as "_id",vtagname as "VTagName" from virtualtagtable';
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get TagDataSource.");
            }
            else {
                res.status(200).json(result.rows);

            }

        });
    });
    /*
     * @summary this method is used to getMeterdata
     * @param req.body. will have meters data.
     * functioncode: getMeterdata_0054
     */
    app.get("/getMeterdata", function (req, res) {
        var query = 'select assetname as "AssetName",metername as "Metername",meteraliasname as "MeterAliasName",metertype as "MeterType",meterdescription as "Meterdescription",frequency as "Frequency",meterid as "MeterId",id as "_id",SynctoServer as "SynctoServer",assetid as "AssetId" from metertable';
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to get AssetDataSource.");
            }
            else {
                res.status(200).json(result.rows);

            }

        });
    });
    /*
     * @summary this method is used to postMeterdadta
     * @param req.body. will have meters data.
     * functioncode: postMeterdadta_0055
     */
    app.post("/postMeterdadta", function (req, res) {

        var uuid = cassandra.types.TimeUuid.now();
        req.body[0].id = uuid;
        var query = "Insert into metertable JSON '" + JSON.stringify(req.body[0]) + "'";
        console.log(query);
        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get MeterDataSource.");
            }
            else {
                // console.log(result.rows.Row);
                res.status(200).json(result.rows);
            }

        });

    });
    /*
     * @summary this method is used to DeleteMeterdata
     * @param req.body. will have meters data.
     * functioncode: DeleteMeterdata_0056
     */
    app.delete("/DeleteMeterdata/:id", function (req, res) {
        var query = "delete from Metertable where id=" + req.params.id + "";
        console.log(query);
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to Delete.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }
        });

    });
    /*
     * @summary this method is used to UpdateMeterdata
     * @param req.body. will have meters data.
     * functioncode: UpdateMeterdata_0057
     */
    app.put("/UpdateMeterdata/:id", function (req, res) {
        // console.log("update");
        var query = "update metertable set MeterAliasName='" + req.body[0].MeterAliasName + "',MeterType='" + req.body[0].MeterType + "',MeterDescription='" + req.body[0].Meterdescription + "',Frequency='" + req.body[0].Frequency + "' where id=" + req.body[0].ID + "";
        // console.log(query);
        analytics_client.execute(query, function (err, result) {

            if (err) {
                console.log(res, err.message, "Failed to get LoactionDataSource.");
            }
            else {
                // console.log(result.rows);
                res.status(200).json(result.rows);
            }
        });
    });

    // .... Abhiram Code Ends....///



    /*
     * @summary this method is used to /CreateParameter/GET_paramdata
     * @param req.body. will have parameter connection data.
     * functioncode: /CreateParameter/GET_paramdata_0075
     */
    app.post('/CreateParameter/GET_paramdata', function (req, res) {

        var resarray = JSON.parse(req.body.Paramdata_obj);


        var selcSPName = resarray[0]["param_spname"];
        var SPparams = resarray[0]["param_data"];
        var datasource = resarray[0]["param_dsname"];
        var selcConSPId = resarray[0]["param_connid"];

        // console.log(selcConSPId);

        if (datasource == "Sql Connection") {

            var query = 'select * from Connections where id=?;';

            analytics_client.execute(query, [selcConSPId], queryOptions, function (err, result) {
                if (err) {
                    console.log(res, err.message, "Failed to get Conndata.");
                    res.send(err);
                }
                else {


                    var dbname = result.rows[0].databasename;
                    var config = '';
                    var sql_Type = result.rows[0].sqltype;
                    if (sql_Type == "Sql") {
                        config = {
                            user: result.rows[0].userid,
                            password: result.rows[0].password,
                            server: result.rows[0].servername,
                            port: result.rows[0].portnumber,
                            database: result.rows[0].databasename,
                            options: {
                                encrypt: true
                            }
                        };
                    }
                    else {
                        config = {
                            server: result.rows[0].servername,
                            port: result.rows[0].portnumber,
                            database: result.rows[0].databasename,
                            options: {
                                encrypt: true
                            }
                        };
                    }

                    var parameter_array = JSON.parse(resarray[0]["param_data"]);

                    /* " + Session["UserName"]. + " */




                    sql.connect(config).then(function () {

                        var request = new sql.Request();

                        var Recursive = function (x) {
                            if (x < parameter_array.length) {

                                request.input((parameter_array[x].PARAMETER_NAME).replace('@', ''), parameter_array[x].Value);

                                if (x == parameter_array.length - 1) {
                                    request.execute(selcSPName, function (err, recordsets, returnValue) {
                                        // ... error checks

                                        if (err) {
                                            res.status(200).json({ "errorresult": err });
                                        }
                                        else {
                                            res.status(200).json(recordsets);
                                            // console.log(recordsets);
                                        }

                                    });
                                }
                                Recursive(x + 1);
                            }
                        }
                        Recursive(0);

                    });

                    /*
                       * async.mapSeries(parameter_array,
                       * function(item, next) {
                       * console.log(item); var request = new
                       * sql.Request() for (var key in item) {
                       * //console.log(item);
                       * request.input(key, item[key]); };
                       * //request.execute("procedure_name",
                       * next); }, function(err, results) { //
                       * done });
                       */
                }
            });

        }

    })
    /* Create Parameter Database Operations end */

    /* LineDiagrams Database Operations */

    /*
     * @summary this method is used to /EmsLineDiagram/getallicons_hmimotors
     * functioncode: /EmsLineDiagram/getallicons_hmimotors_0076
     */
    app.get('/EmsLineDiagram/getallicons_hmimotors', function (req, res) {

        var Path = './public/Analytics/Linediagrams__Icon/HMISymbols/Motors/Motors Small/';

        fs.readdir(Path, function (err, files) {
            if (err) {
                console.log(res, err.message, "Failed to HMI Motors.");
                res.send("Failed to Load");
            }
            else {
                res.status(200).send(files);
            }

        })

    });
    /*
     * @summary this method is used to /EmsLineDiagram/getallicons_hmitanks
     * functioncode: /EmsLineDiagram/getallicons_hmimotors_0077
     */
    app.get('/EmsLineDiagram/getallicons_hmitanks', function (req, res) {

        var Path = './public/Analytics/Linediagrams__Icon/HMISymbols/Tanks/Tanks Small/';

        fs.readdir(Path, function (err, files) {

            if (err) {
                console.log(res, err.message, "Failed to Load HMI Tanks.");
                res.send("Failed to Load");
            }
            else {
                res.status(200).send(files);
            }

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getallicons_hmipumps
     * functioncode: /EmsLineDiagram/getallicons_hmipumps_0079
     */
    app.get('/EmsLineDiagram/getallicons_hmipumps', function (req, res) {

        var Path = './public/Analytics/Linediagrams__Icon/HMISymbols/Pumps/Pumps Small/';

        fs.readdir(Path, function (err, files) {

            if (err) {
                console.log(res, err.message, "Failed to Load HMI Pumps.");
                res.send("Failed to Load");
            }
            else {
                res.status(200).send(files);
            }

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getallicons_hmielbows
     * functioncode: /EmsLineDiagram/getallicons_hmielbows_0080
     */
    app.get('/EmsLineDiagram/getallicons_hmielbows', function (req, res) {

        var Path = './public/Analytics/Linediagrams__Icon/HMISymbols/Elbows/Elbows Small/';

        fs.readdir(Path, function (err, files) {

            if (err) {
                console.log(res, err.message, "Failed to Load HMI Tanks.");
                res.send("Failed to Load");
            }
            else {
                res.status(200).send(files);
            }

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getbg_image
     * functioncode: /EmsLineDiagram/getbg_image_0081
     */
    app.get('/EmsLineDiagram/getbg_image', function (req, res) {

        var Path = './public/Analytics/Linediagrams__BGImage';

        fs.readdir(Path, function (err, files) {

            if (err) {
                console.log(res, err.message, "Failed to Load HMI Tanks.");
                res.send("Failed to Load");
            }
            else {
                res.status(200).send(files);
            }

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getallicons
     * functioncode: /EmsLineDiagram/getallicons_0082
     */
    app.get('/EmsLineDiagram/getallicons', function (req, res) {

        var Path = './public/Analytics/Linediagrams__Icon';

        fs.readdir(Path, function (err, files) {

            if (err) {
                console.log(res, err.message, "Failed to Load HMI Tanks.");
                res.send("Failed to Load");
            }
            else {
                // console.log(files);
                res.status(200).send(files);
            }

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getallicons
     * @param req.body. will have line diagram json data.
     * functioncode: /EmsLineDiagram/getallicons_0083
     */
    app.post('/EmsLineDiagram/savedata', function (req, res) {

        /*
            * console.log(req.body);
            * 
            * console.log(req.body.blocks);
            * console.log(req.body.connections);
            * console.log(req.body.DataNodes);
            * console.log(req.body.container);
            * console.log(req.body.groupcontainer);
            * console.log(req.body.advanceimgprop_arraydata);
            * console.log(req.body.filename);
            */


        // console.log(req.body);

        var XML = "<project><Block>";
        XML += req.body[0].blocks + "</Block><connections>" + req.body[0].connections + "</connections><DataNodes>" + req.body[0].DataNodes + "</DataNodes>";
        XML += "<container>" + req.body[0].container + "</container><groupcontainer>" + req.body[0].groupcontainer + "</groupcontainer><advanceimgprop_arraydata>" + req.body[0].advanceimgprop_arraydata + "</advanceimgprop_arraydata></project>";

        // console.log(XML);

        fs.writeFile('./public/Analytics/emsxml/' + req.body[0].filename + '.xml', XML, function (err) {
            if (err) {
                /* return console.error(err); */
                res.send(err.message);
            }
            else {
                res.send("Project Saved Successfully");

            }
        });

        /*
         * var root = XMLbuilder.create('project');
         * 
         * root.com('Blocks Structure');
         * 
         * root.ele('Block').txt(req.body.blocks);
         * 
         * root.ele('connections').txt(req.body.connections);
         * 
         * root.ele('DataNodes').txt(req.body.DataNodes);
         * 
         * root.ele('container').txt(req.body.container);
         * 
         * root.ele('groupcontainer').txt(req.body.groupcontainer);
         * 
         * root.ele('advanceimgprop_arraydata').txt(req.body.advanceimgprop_arraydata);
         * 
         * //console.log(root.toString({ pretty: true }));
         * 
         * console.log("Directory created successfully!");
         * fs.writeFile('./public/emsxml/'+req.body.filename+'.xml',
         * root, function(err) { if (err) { return
         * console.error(err); res.send(err.message); } else {
         * res.send("Project Saved Successfully");
         *  } });
         */


    });
    /*
     * @summary this method is used to /EmsLineDiagram/deleteicons
     * @param req.body. will have line line diagram hmi icons data.
     * functioncode: /EmsLineDiagram/deleteicons_0084
     */
    app.post('/EmsLineDiagram/deleteicons', function (req, res) {

        // console.log(req.body);
        var path = './public/Analytics/Linediagrams__Icon/' + req.body.iconname;

        fs.unlink(path, function (err) {
            if (err) {
                // return console.error(err);
                res.status(200).send(err.message);
            }
            else {
                // console.log("Icon Deleted Successfully");
                res.status(200).send("Icon Deleted Successfully");
            }
        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/deleteicons
     * @param req.body. will have line diagram hmi icons data.
     * functioncode: /EmsLineDiagram/deleteicons_0085
     */
    app.post('/EmsLineDiagram/Saveicons', function (req, res) {

        var form = new formidable.IncomingForm();

        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/public/Analytics/Linediagrams__Icon');

        var path1 = form.uploadDir;


        form.parse(req, function (err, fields, files) {
            path1 = path.join(path1, files.file.name);

            if (fs.existsSync(path1)) {
                // console.log("Directory Exist");
                res.send("Icon alresdy Exists");
            }
            else {
                fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                    if (err) {
                        res.send(err.message);
                    }
                    else {
                        res.send(files.file.name);
                    }
                });
            }
        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getemsfiles
     * @param req.body. will have line diagram files list.
     * functioncode: /EmsLineDiagram/getemsfiles_0086
     */
    app.get('/EmsLineDiagram/getemsfiles', function (req, res) {

        var PathUrl = './public/Analytics/emsxml';
        var list = [];
        var i = 0;
        fs.readdir(PathUrl, function (err, files) {

            files.forEach(function (file) {
                fs.stat(path.join(PathUrl, file), function (error, stats) {
                    var date = new Date(stats.mtime);
                    var createddate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                    list.push({ ReportId: i.toString(), ReportName: file, CreatedDate: createddate, CreatedBy: "iARMS", Desc: "Reports" })

                    if (i == files.length - 1) {
                        // console.log(list);
                        res.status(200).json(list);
                    }
                    else {
                        i++;
                    }

                });

            });

        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/GetData
     * @param req.body. will have line diagram file data.
     * functioncode: /EmsLineDiagram/GetData_0087
     */
    app.post('/EmsLineDiagram/GetData', function (req, res) {



        var json = "";
        var filepath = './public/Analytics/emsxml/' + req.body.filename + '.xml';
        fs.readFile(filepath, function (err, data) {
            // console.log(data.toString());
            if (!err) {
                var parser = new xml2js.Parser({ explicitRoot: false });
                parser.parseString(data, function (err, result) {
                    // json = JSON.stringify(result);
                    // console.log(JSON.stringify(result));
                    if (!err) {
                        res.status(200).json(result);
                    }
                    else {
                        res.send(err.message);
                        // console.log(err.message);
                    }
                });
            }
            else {

                res.send(err.message);
            }

        })
    });
    /*
     * @summary this method is used to /EmsLineDiagram/getkwhvalues 
     * functioncode: /EmsLineDiagram/getkwhvalues_0088
     */
    app.get('/EmsLineDiagram/getkwhvalues', function (req, res) {
        res.send("hai");
    })
    /* LineDiagrams Database Operations End */


    // .... Manikanta Code Ends...////


    /*  ... Divya *Reports in Data Reports*/

    /*
     * @summary this method is used to /EmsLineDiagram/filecheck
     * @param req.body. will have report file data.
     * functioncode: /Reporting/filecheck_0089
     */
    app.post('/Reporting/filecheck', function (req, res) {
        fs.exists('./public/Analytics/rdlcxml/' + req.body[0].filename + '.json', function (exists) {
            if (exists) {
                res.send("Exists");
            }
            else {
                res.send("Doesnot Exist");
            }
        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/savedata
     * @param req.body. will have report file save data.
     * functioncode: /Reporting/savedata_0090
     */
    app.post('/Reporting/savedata', function (req, res) {
        fs.writeFile('./public/Analytics/rdlcxml/' + req.body[0].filename + '.json', JSON.stringify(req.body), function (err) {
            if (err) {
                res.send(err.message);
            }
            else {
                res.send("Report Saved Successfully");
            }
        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/GetRDLCFiles 
     * functioncode: /Reporting/GetRDLCFiles_0091
     */
    app.get('/Reporting/GetRDLCFiles', function (req, res) {
        var PathUrl = './public/Analytics/rdlcxml';
        var list = [];
        var i = 0;
        fs.readdir(PathUrl, function (err, files) {

            files.forEach(function (file) {
                fs.stat(path.join(PathUrl, file), function (error, stats) {
                    var date = new Date(stats.mtime);
                    var createddate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                    list.push({ ReportId: i.toString(), ReportName: file, CreatedDate: createddate, CreatedBy: "iARMS", Desc: "Reports" })

                    if (i == files.length - 1) {
                        res.status(200).json(list);
                    }
                    else {
                        i++;
                    }
                });
            });
        });
    });
    /*
     * @summary this method is used to /EmsLineDiagram/GetData
     * @param req.body. will have report file save data.
     * functioncode: /Reporting/GetData_0092
     */
    app.post('/Reporting/GetData', function (req, res) {
        var json = "";
        var filepath = './public/Analytics/rdlcxml/' + req.body.filename + '.json';
        fs.readFile(filepath, function (err, data) {
            if (!err) {
                res.status(200).send(data);
            }
            else {
                res.send(err.message);
            }
        })
    });


    /*
     * @summary this method is used to /EmsLineDiagram/GetXMLData
     * @param req.body. will have report file save data.
     * functioncode: /Reporting/GetXMLData_0093
     */
    app.post('/Reporting/GetXMLData', function (req, res) {
        var json = "";
        var filepath = './public/Analytics/rdlcxml/' + req.body.filename + '.xml';
        fs.readFile(filepath, function (err, data) {
            if (!err) {
                var parser = new xml2js.Parser({ explicitRoot: false });
                parser.parseString(data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                    }
                    else {
                        res.send(err.message);
                    }
                });
            }
            else {
                res.send(err.message);
            }
        })
    });
    /*
     * @summary this method is used to /EmsLineDiagram/UploadFile
     * @param req.body. will have report file save data.
     * functioncode: /Reporting/UploadFile_0094
     */
    app.post('/Reporting/UploadFile', function (req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/public/Analytics/Uploads');
        var path1 = form.uploadDir;

        form.parse(req, function (err, fields, files) {
            path1 = path.join(path1, files.file.name);

            if (fs.existsSync(path1)) {
                res.send("Image already Exists");
            }
            else {
                fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                    if (err) {
                        res.send(err.message);
                    }
                    else {
                        res.send(files.file.name);
                    }
                });
            }
        });
    });

    /*  ... Divya *Reports in Data Reports End*/


    //..... Karthik....//
    /*
     * @summary this method is used to RestfulserviceRequest
     * @param req.body. will have report file save data.
     * functioncode: RestfulserviceRequest_0095
     */
    app.post("/RestfulserviceRequest", function (req, res) {

        var url = req.body["Url"];
        var username = req.body["UserName"];
        var password = req.body["Password"];
        var auth = "Basic "
            + new Buffer(username + ":" + password).toString("base64");
        request({
            url: url,
            headers: {
                "Authorization": auth
            },

        }, function (error, response, body) {
            res.send(response);
            console.log(response);
        });
    });
    /*
     * @summary this method is used to getVirtualTagsDetails
     * @param req.body. will have getVirtualTagsDetails data.
     * functioncode: getVirtualTagsDetails_0096
     */
    app.get("/getVirtualTagsDetails", function (req, res) {
        var query = "SELECT * FROM virtualtagtable";
        analytics_client.connect(function (err) {
            if (!err) {
                analytics_client.execute(query, function (err, result) {

                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(result.rows[0]);
                        res.send(result);
                    }

                });
            }

        });
    });
    /*
     * @summary this method is used to getdata
     * @param req.body. will have file save data.
     * functioncode: getdata_0097
     */
    app.post('/getdata', function (req, res) {
        var topicname = req.body.topicname;
        Consumer = kafka.Consumer, client = new kafka.Client('192.168.4.183:2181'),
            consumer = new Consumer(client, [{
                topic: topicname,
                partition: 0
            }], {
                autoCommit: false
            });

        consumer.on('message', function (message) {

            res.send(message.value + '$$' + topicname);
        });

    });
    /*
     * @summary this method is used to InsertTagsData
     * @param req.body. will have file save data.
     * functioncode: InsertTagsData_0098
     */
    app.post("/InsertTagsData", function (req, res) {
        var query = '';
        var uuid = cassandra.types.TimeUuid.now();
        if (req.body["EditID"] == 0) {
            query = "INSERT INTO icloud.ivirtualtagsdata (ivtagid, ivtagname, igroupname, iactive, ipollfreq, ipolluom, ipostfreq, ipostuom, iselecttagdata, istartfrom) VALUES(" + uuid + ", '"
                        + req.body["vtagname"]
                        + "', '"
                        + req.body["groupname"]
                        + "', "
                        + req.body["active"]
                        + ", '"
                        + req.body["pollfrq"]
                        + "', '"
                        + req.body["polltime"]
                        + "', '"
                        + req.body["postfreq"]
                        + "', '"
                        + req.body["posttime"]
                        + "', '"
                        + req.body["tagsarea"]
                        + "', '"
                        + req.body["strtfrom"] + "')";
        } else {
            query = "update icloud.ivirtualtagsdata set iactive= "
                + req.body["active"] + ", ipollfreq='"
                + req.body["pollfrq"] + "', ipolluom='"
                + req.body["polltime"] + "', ipostfreq ='"
                + req.body["postfreq"] + "', ipostuom = '"
                + req.body["posttime"] + "', iselecttagdata='"
                + req.body["tagsarea"] + "', istartfrom='"
                + req.body["strtfrom"] + "' where ivtagid = "
                + req.body["EditID"] + " and  ivtagname='"
                + req.body["vtagname"] + "' and igroupname='"
                + req.body["groupname"] + "' ";
        }

        analytics_client.connect(function (err) {
            if (!err) {
                analytics_client.execute(query, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(result.rows);
                        res.status(200).json("Data Cloudified");
                    }

                });
            }

        });
    });
    /*
     * @summary this method is used to GetTagsDataforEdit
     * @param req.body. will have file save data.
     * functioncode: GetTagsDataforEdit_0099
     */
    app.post("/GetTagsDataforEdit", function (req, res) {
        console.log(req.body["EditID"]);
        /* if (req.body["EditId"] != undefined || req.body["EditId"] != '') { */
        var query = "SELECT * FROM icloud.ivirtualtagsdata where ivtagid ="
            + req.body["EditID"] + "";
        analytics_client.connect(function (err) {
            if (!err) {
                analytics_client.execute(query, function (err, result) {

                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(result.rows[0]);
                        res.send(result);
                    }

                });
            }

        });
    });
    /*
     * @summary this method is used to DeleteTagData
     * @param req.body. will have report file save data.
     * functioncode: DeleteTagData_0100
     */
    app.post("/DeleteTagData", function (req, res) {
        console.log(req.body);
        console.log(req.body["ID"]);

        var query = "delete FROM icloud.ivirtualtagsdata where ivtagid ="
            + req.body["ID"] + "";
        analytics_client.connect(function (err) {
            if (!err) {
                analytics_client.execute(query, function (err, result) {

                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(result.rows[0]);
                        res.status(200).json("Tag Deleted Successfully.");
                    }

                });
            }

        });
    });
    /*
     * @summary this method is used to /ExcelFormula/GetExcelsheets
    
     * functioncode: /ExcelFormula/GetExcelsheets_0101
     */
    app.post('/ExcelFormula/GetExcelsheets', function (req, res) {

        var form = new formidable.IncomingForm();

        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/public/Analytics/ExcelFiles');

        var path1 = form.uploadDir;
        console.log("aaa " + path1);
        form.parse(req, function (err, fields, files) {
            /*path1=path.join(path1,files.file.name); 
           console.log("Path1 : " +path1);
            var workbook = XLSX.readFile(path1); 
            var sheet_name_list = workbook.SheetNames;  
            var workbook = XLSX.readFile(path1); 
            var sheet_name_list =  workbook.SheetNames;
            console.log("sheet_name_list : " + sheet_name_list);*/
            if (fs.existsSync(path1)) {
                //console.log(files);
                //console.log(fields);
                //console.log(err);
                fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                    if (err) {
                        res.send(err.message);
                    }
                    else {
                        path1 = path.join(path1, files.file.name);
                        console.log("Path1 : " + path1);
                        var workbook = XLSX.readFile(path1);
                        var sheet_name_list = workbook.SheetNames;
                        var workbook = XLSX.readFile(path1);
                        var sheet_name_list = workbook.SheetNames;
                        console.log("sheet_name_list : " + sheet_name_list);
                        console.log(files.file.name)
                        res.json(sheet_name_list);
                    }
                });

            }
            else {

                fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                    if (err) {
                        res.send(err.message);
                    }
                    else {
                        path1 = path.join(path1, files.file.name);
                        //console.log("Path1 : " + path1);
                        var workbook = XLSX.readFile(path1);
                        var sheet_name_list = workbook.SheetNames;
                        var workbook = XLSX.readFile(path1);
                        var sheet_name_list = workbook.SheetNames;
                        //console.log("sheet_name_list : " + sheet_name_list);
                        //console.log(files.file.name)
                        res.json(sheet_name_list);

                    }
                });
            }
        });
    })
    var hji = "";
    /*
     * @summary this method is used to /ECR/ImportXceltoDataSource
     * @param req.body. will have report file save data.
     * functioncode: /ECR/ImportXceltoDataSource_0102
     */
    app.post('/ECR/ImportXceltoDataSource', function (req, res) {
        var form = new formidable.IncomingForm();

        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '/public/Analytics/ExcelFiles');
        var path1 = form.uploadDir;
        form.parse(req, function (err, fields, files) {

            console.log(fields.Ddl_sheetName);

            path1 = path.join(path1, files.file.name);
            var workbook = XLSX.readFile(path1);
            var sheet_name_list = workbook.SheetNames;

            sheet_name_list = ["" + fields.Ddl_sheetName + ""];
            sheet_name_list.forEach(function (y) {

                var worksheet = workbook.Sheets[y];

                var headers = {};
                var data = [];
                // worksheet = XLSX.utils.sheet_to_row_object_array(worksheet,
                // {'date_format':'dd/mm/yyyy'});
                // worksheet = XLSX.utils.(worksheet,
                // {'date_format':'dd/mm/yyyy'});

                for (z in worksheet) {
                    if (z[0] === '!')
                        continue; // parse out the column, row, and value
                    var tt = 0;
                    for (var i = 0; i < z.length; i++) {
                        if (!isNaN(z[i])) {
                            tt = i; break;
                        }
                    };
                    var col = z.substring(0, tt);
                    var row = parseInt(z.substring(tt)); var value = worksheet[z].v;

                    // store header names
                    if (row == 1 && value) {
                        headers[col] = value;
                        continue;
                    }

                    if (!data[row])
                        data[row] = {};
                    data[row][headers[col]] = value;
                }
                // drop those first two rows which are empty
                data.shift();
                data.shift();
                console.log(data);
                hji = data;
                //res.send(data)

                var xml = jsonxml({
                    parent: data
                })

                console.log(xml);
                fs.writeFile('./public/Analytics/XMLSchema/' + fields.Ddl_sheetName + '.xml', xml, function (err) {
                    if (err) {
                        return console.error(err);
                        //res.send(err.message);
                    }
                    else {
                        //res.send("Project Saved Successfully"); 

                    }
                });


            });

            res.json(hji)


        });
    });
    /*
     * @summary this method is used to /ECR/GetImportedfiles_List
     * @param req.body. will have report file save data.
     * functioncode: /ECR/GetImportedfiles_List_0103
     */
    app.post('/ECR/GetImportedfiles_List', function (req, res) {
        var Path = './public/Analytics/XMLSchema/';

        fs.readdir(Path, function (err, files) {
            if (err) {
                console.log(res, err.message, "Failed to HMI Motors.");
                res.send("Failed to Load");
            }
            else {
                res.send(files);
            }

        })


    });
    /*
     * @summary this method is used to /ECR/GetImportedfileById
     * @param req.body. will have report file save data.
     * functioncode: /ECR/GetImportedfileById_0104
     */

    app.post('/ECR/GetImportedfileById', function (req, res) {

        var json = "";
        var filepath = './public/Analytics/XMLSchema/' + req.body["param"];
        console.log(filepath);

        fs.readFile(filepath, function (err, data) {

            if (!err) {
                var parser = new xml2js.Parser({ explicitRoot: false });
                parser.parseString(data, function (err, result) {
                    //json = JSON.stringify(result);
                    //console.log(JSON.stringify(result));
                    if (!err) {
                        res.send(result);
                    }
                    else {
                        res.json(err.message);
                        //console.log(err.message);
                    }
                });
            }
            else {

                res.json(err.message);
            }
        });
    });
    /*
     * @summary this method is used to /ECR/Delete_ImportedFile
     * @param req.body. will have report file save data.
     * functioncode: /ECR/Delete_ImportedFile_0105
     */
    app.post('/ECR/Delete_ImportedFile', function (req, res) {

        var filepath = './public/Analytics/XMLSchema/' + req.body["fileName"];

        fs.unlink(filepath, function (err) {
            if (err) {
                // return console.error(err);
                res.send(err.message);
            }
            else {
                // console.log("Icon Deleted Successfully");
                res.send("File Deleted Successfully");
            }
        });
    });


    var Trendlivecomp = "";
    var Trendcomp = "";
    /*
     * @summary this method is used to /CompareTrends/LiveData
     * @param req.body. will have report file save data.
     * functioncode: /CompareTrends/LiveData_0106
     */

    app.post('/CompareTrends/LiveData', function (req, res) {
        console.log(req.body);
        res.json("");
    });
    /*
     * @summary this method is used to /CompareTrends/CurrentData
     * @param req.body. will have report file save data.
     * functioncode: /CompareTrends/CurrentData_0107
     */

    app.post('/CompareTrends/CurrentData', function (req, res) {
        console.log(req.body);
        res.json("");
    });
    /*
     * @summary this method is used to /Trends/Live
     * @param req.body. will have report file save data.
     * functioncode: /Trends/Live_0108
     */
    app.get('/Trends/Live', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/Trends/Live.html');
    });
    /*
     * @summary this method is used to /Trends/Compare_Trends
     * @param req.body. will have trends data.
     * functioncode: /Trends/Compare_Trends_0109
     */
    app.get('/Trends/Compare_Trends', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/Trends/Compare_Trends.html');
    });
    /*
     * @summary this method is used to /ManualReading/MeterSelection
     * @param req.body. will have trends data.
     * functioncode: /ManualReading/MeterSelection_0110
     */
    app.get('/ManualReading/MeterSelection', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/ManualReading/MeterSelection.html');
    });
    /*
     * @summary this method is used to /EMSParameter/ParameterSelection
     * @param req.body. will have trends data.
     * functioncode: /EMSParameter/ParameterSelection_0111
     */
    app.get('/EMSParameter/ParameterSelection', function (req, res) {

        res.sendfile(__dirname + '/public/Analytics/Views/EMSParameter/ParameterSelection.html');
    });
    /*
     * @summary this method is used to /checktrendname
     * @param req.body. will have trends data.
     * functioncode: /checktrendname_0112
     */
    app.post('/checktrendname', function (req, res) {
        var query = "SELECT * FROM iarms360.comparetrends where trendname = '" + req.body["trend"] + "' and userid = '" + req.body["username"] + "'";
        console.log(query);
        analytics_client.execute(query, queryOptions, function (err, result) {
            if (err) {
                console.log(res, err.message, "Fail to Save Data.");
            }
            else {
                if (result.rowLength == 0) {
                    res.send("FALSE");
                }
                else {
                    res.send("TRUE");
                }
            }
        });
    });
    /*
     * @summary this method is used to /BookmarkData
     * @param req.body. will have trends data.
     * functioncode: /BookmarkData_0113
     */
    app.post('/BookmarkData', function (req, res) {
        console.log(req);
        console.log(req.body);
        console.log(req.body["selectedlist"]);

        res.send("");
    });

    // /...............Rule Engine Database Operations.................///
    // /...............Rule Engine Database Operations.................///

    /*
     * @summary this method is used to /CreatingRuleEngine
     * @param req.body. will have rule engine data.
     * functioncode: /CreatingRuleEngine_0114
     */
    app.post("/CreatingRuleEngine", function (req, res) {


        try {

            var CollectionName = req.body[0].RuleName;
            var uuid = cassandra.types.TimeUuid.now();
            req.body[0].id = uuid;
            req.body[0].Condition = "";
            req.body[0].Action = "";
            if (req.body[0].MultiConditions.length > 0) {
                req.body[0].Condition = JSON.stringify(req.body[0].MultiConditions[0].Condition);
                req.body[0].Action = JSON.stringify(req.body[0].MultiConditions[1].Actions);

            }
          //  var query = "Insert into RuleEngine(id,RuleName,RuleDesc,Active,Condition,Action,CreatedBy,PostId,TriggerId) values(" + req.body[0].id + ",'" + CollectionName + "','" + req.body[0].RuleDesc + "'," + req.body[0].Active + ",'" + req.body[0].Condition + "','" + req.body[0].Action + "','Admin'," + req.body[0].PostId + "," + req.body[0].TriggerId + ")";




           var query='INSERT INTO public."Analytics_M_RuleEngine"(rulename, ruledesc, active, condition, action, createdby, postid, triggerid)VALUES($1,$2,$3,$4,$5,$6,$7,$8);'
          //  analytics_client.execute(query, function (err, result) {
           postgresqlDBManager.PSQL_getdata(query, [CollectionName, req.body[0].RuleDesc, req.body[0].Active, req.body[0].Condition, req.body[0].Action, 'Admin', req.body[0].PostId, req.body[0].TriggerId], function (err, result) {
                if (err) {
                    console.log("err : " + err);
                    res.send({ error: err.message });
                }

                else {
                    res.send({ data: "Successfully Inserted" });
                }

            });

        }
        catch (ex) {
            console.log(ex);
        }
    });
    /*
     * @summary this method is used to /getREList
     * @param req.body. will have rule engine list data.
     * functioncode: /getREList_0115
     */
    app.get("/getREList", function (req, res) {
        //db.collection("RuleEngineList").find({}).toArray(function (err, docs) {
        //    if (err) {
        //        handleError(res, err.message, "Failed to get REList DataSource.");
        //    } else {
        //        res.status(200).json(docs);
        //    }
        //});

        try {
            //var query = "select id,rulename,createdby from ruleengine";
            var query = 'select id,rulename,createdby from public."Analytics_M_RuleEngine"';

          //  analytics_client.execute(query, function (err, result) {
            postgresqlDBManager.PSQL_getdata(query,null, function (err, result) {

                if (err) {
                    console.log("err : " + err);
                    res.send({ error: err.message });

                }

                else {
                    //console.log(result.rows.Row); res.status(200).json(result.rows); 
                    // console.log("Successfully Inserted");
                    res.send(result);
                }

            });
        }
        catch (ex) {
            console.log(ex.message);
        }
    });
    /*
     * @summary this method is used to /getRECollection
     * @param req.body. will have rule engine data.
     * functioncode: /getRECollection_0116
     */
    app.get("/getRECollection", function (req, res) {
        //db.collection(req.body[0]).find({}).toArray(function (err, docs) {
        //    if (err) {
        //        handleError(res, err.message, "Failed to get REList DataSource.");
        //    } else {
        //        res.status(200).json(docs);
        //    }
        //});

        try {
         //   var query = "select * from ruleengine where id=" + req.body[0] + "";


            var query = 'select * from public."Analytics_M_RuleEngine" where id=$1';

            //  analytics_client.execute(query, function (err, result) {
            postgresqlDBManager.PSQL_getdata(query, [req.body[0]], function (err, result) {
          //  analytics_client.execute(query, function (err, result) {

                if (err) {
                    console.log("err : " + err);
                    res.send({ error: err.message });

                }

                else {
                    //console.log(result.rows.Row); res.status(200).json(result.rows); 
                    // console.log("Successfully Inserted");
                    res.send(result);
                }

            });
        }
        catch (ex) {
            console.log(ex.message);
        }

    });
    /*
     * @summary this method is used to /DeleteRECollection
     * @param req.body. will have rule engine collection data.
     * functioncode: /DeleteRECollection_0117
     */
    app.put("/DeleteRECollection/:id", function (req, res) {
        console.log(req.params.id);// deleteOne
        //db.collection(req.params.id).drop({}, function (err, doc) {
        //    if (err) {
        //        handleError(res, err.message, "Failed to delete Rule Engine Collection");
        //    } else {
        //        db.collection("RuleEngineList").remove({ CollectionName: req.params.id }, function (err, doc) {
        //            if (err) {
        //                handleError(res, err.message, "Failed to delete Rule Engine List Documenet");
        //            } else {
        //                res.send('Rule Engine collection deleted');
        //            }
        //        });
        //    }
        //});


        try {
            //  var query = "delete from ruleengine where id=" + req.params.id + "";

            var query = 'delete from public."Analytics_M_RuleEngine" where id=$1';

            postgresqlDBManager.PSQL_getdata(query, [req.params.id], function (err, result) {
          //  analytics_client.execute(query, function (err, result) {

                if (err) {
                    console.log("err : " + err);
                    res.send({ error: err.message });

                }

                else {
                    //console.log(result.rows.Row); res.status(200).json(result.rows); 
                    // console.log("Successfully Inserted");
                    res.send("Successfully Deleted");
                }

            });
        }
        catch (ex) {

        }
    });
    //edit rule engine dtaEditRuleEnginedata

    app.post("/EditRuleEnginedata/:id", function (req, res) {
        // console.log(req.params.id);// deleteOne

        try {
            var query = 'select action,editcondition from public."Analytics_M_RuleEngine" where id=$1';

            postgresqlDBManager.PSQL_getdata(query, [req.params.id], function (err, result) {
           // analytics_client.execute(query, function (err, result) {

                if (err) {
                    console.log("err : " + err);
                    res.send({ error: err.message });

                }

                else {
                    //console.log(result.rows.Row); res.status(200).json(result.rows); 
                    // console.log("Successfully Inserted");
                    res.send(result[0]);
                }

            });
        }
        catch (ex) {

        }
    });

    /*
     * @summary this method is used to /getopctags
     * @param req.body. will have opc tags data.
     * functioncode: /getopctags_0118
     */
    app.get("/getopctags", function (req, res) {
        try {

           // var query = 'select id as "_id",tagname as "TAGNAME", tagalias as "TAGALIAS",opcid as "OPCID",opcname as "OPCNAME" from  public."Analytics_M_OPC_Tagsdata";';
            var query = "select distinct description,equipementname from itvdataparameterlist where equipementname!='';";
            var PolicyData = [];
            console.log(query);
            postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {


            ////var query = 'select id as "_id",tagname as "TAGNAME", tagalias as "TAGALIAS",opcid as "OPCID",opcname as "OPCNAME" from opc_tagsdata';
            ////// console.log(query);
            ////analytics_client.execute(query, function (err, result) {
                if (err) {
                    console.log("err" + err);
                    handleError(res, err.message, "Failed to get AssetDataSource.");
                }
                else {
                    res.status(200).json(result);
                }

            });
        }
        catch (ex) {
            console.log(ex.message);
        }
    });
    // /...............Rule Engine Database Operations.................///


    // /...............Modbus Device Database Operations.................///

    /*
     * @summary this method is used to /CreatingModbusDevice
     * @param req.body. will have modbus connection data.
     * functioncode: /CreatingModbusDevice_0119
     */
    app.post("/CreatingModbusDevice", function (req, res) {
        // console.log(req.body[0]);
        db.collection("ModbusDevice").insertOne((req.body[0]), function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new Modbus Device.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    });
    /*
     * @summary this method is used to /getModbusDeviceList
     * @param req.body. will have modbus connection data.
     * functioncode: /getModbusDeviceList_0120
     */
    app.get("/getModbusDeviceList", function (req, res) {
        db.collection("ModbusDevice").find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get REList DataSource.");
            } else {
                res.status(200).json(docs);
            }
        });
    });
    /*
     * @summary this method is used to /getParamsList
     * @param req.body. will have modbus connection list data.
     * functioncode: /getParamsList_0121
     */
    app.get("/getParamsList", function (req, res) {
        db.collection("Parameter_Master").find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get Parameter_Master List DataSource.");
            } else {
                res.status(200).json(docs);
            }
        });
    });
    // /...............ModbusDevice Database Operations.................///



    // /...............ModbusDevice Node Database Operations.................///
    /*
     * @summary this method is used to /CreatingModbusNode
     * @param req.body. will have  modbus node connection data.
     * functioncode: /CreatingModbusNode_0122
     */
    app.post("/CreatingModbusNode", function (req, res) {
        // console.log(req.body[0]);
        db.collection("ModbusDeviceNode").insertOne((req.body[0]), function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new Modbus Device Node.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    });
    /*
     * @summary this method is used to /CreatingModbusNode
     * @param req.body. will have  modbus node connection list data.
     * functioncode: /CreatingModbusNode_0123
     */
    app.get("/getModbusNodeList", function (req, res) {
        db.collection("ModbusDeviceNode").find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get REList DataSource.");
            } else {
                res.status(200).json(docs);
            }
        });
    });
    // /...............ModbusDevice Node Database Operations.................///


    // /...............Design values Database Operations.................///

    /*
     * @summary this method is used to /CreatingModbusNode
     * @param req.body. will have modbus node data.
     * functioncode: /CreatingModbusNode_0124
     */
    app.post("/CreatingModbusNode", function (req, res) {
        // console.log(req.body[0]);


    });
    /*
     * @summary this method is used to /getDesignValuesData
     * @param req.body. will have get DesignValues Data.
     * functioncode: /getDesignValuesData_0125
     */
    app.get("/getDesignValuesData", function (req, res) {
        console.log("hai");
    });
    /*
     * @summary this method is used to /DesignValuesupdatedata
     * @param req.body. will have get DesignValues Data.
     * functioncode: /DesignValuesupdatedata_0126
     */
    app.post("/DesignValuesupdatedata", function (req, res) {
        // console.log(req.body[0]);


    });
    /*
     * @summary this method is used to /DeleteDesignValues
     * @param req.body. will have get DesignValues Data.
     * functioncode: /DeleteDesignValues_0127
     */
    app.post("/DeleteDesignValues", function (req, res) {
        // console.log(req.body[0]);


    });
    // /...............Design values Database Operations.................///
    //.... Karthik...////


    /*  ... Phani **/


    /*Cassandra database operations*/

    /*Loading Database List*/
    /*
     * @summary this method is used to /CassandraConnection/GetDatabaseList
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/GetDatabaseList_0128
     */
    app.post('/CassandraConnection/GetDatabaseList', function (req, res) {

        try {

            if (req.session.authenticated == true) {
                var json = JSON.parse(req.body.Conndata);

                var contactpoints = json[0].ServerName + ":" + json[0].PortNumber;

                // console.log("contact points : " + contactpoints);
                var dc_client = new cassandra.Client({
                    contactPoints: [contactpoints]
                });

                dc_client.connect(function (err) {
                    if (!err) {
                        var query = "SELECT keyspace_name from system_schema.keyspaces;";
                        dc_client.execute(query, function (err, result) {
                            if (err) {
                                //console.log(res, err.message, "Failed to get data");


                                if (err.message.indexOf('Keyspace system_schema does not exist') > -1) {
                                    query = "SELECT keyspace_name from system.schema_keyspaces;";
                                    dc_client.execute(query, function (err, result) {
                                        if (!err) {
                                            res.status(200).json({ "dblist": result.rows })
                                        }
                                        else {
                                            res.status(200).json({ "error": err.message });
                                        }
                                    });

                                }
                                else {
                                    res.status(200).json({ "error": err.message });
                                }

                            }
                            else {
                                //console.log(result);
                                //  res.status(200).json(result.rows);
                                res.status(200).json({ "dblist": result.rows })
                            }
                        });


                    }
                    else {
                        //console.log("ERROR : " + err);
                        res.status(200).json({ "error": err.message });

                    }
                });
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }
        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });

        }
    });

    /*    Save  and update Cassandra connection*/
    /*
     * @summary this method is used to /CassandraConnection/GetDatabaseList
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/GetDatabaseList_0129
     */
    app.post('/CqlConnection/Savecas_Connection', function (req, res) {
        try {
            if (req.session.authenticated == true) {

                if (req.body[0].operation == "save") {

                    var query = 'select count(*) from "Analytics_M_Connections" where connectionname=$1 and connectiontype=$2';

                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].ConnectionName, 'Cassandra Connection'], function (err, result) {
                        if (!err) {
                            if (result[0].count > 0) {
                                res.status(200).json({ "data": "duplicates" })
                            }
                            else {

                                query = 'INSERT INTO "Analytics_M_Connections"(connectas, connectionname, connectiontype, databasename, password, portnumber, servername,  userid, username, "Role") VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

                                postgresqlDBManager.PSQL_InsertData(query, [req.body[0].Connectas, req.body[0].ConnectionName, req.body[0].ConnectionType, req.body[0].databasename, req.body[0].Password, req.body[0].PortNumber, req.body[0].ServerName, req.body[0].Userid, req.session.myemail, req.session.RoleId], function (err, cqlresult) {
                                    if (!err) {
                                        query = 'select ConnectionName as "ConnectionName",Id as "Id" from "Analytics_M_Connections" where UserName=$1 and ConnectionType=$2';

                                        postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, req.body[0].ConnectionType], function (err, cqllist) {
                                            if (!err) {
                                                res.status(200).json({ "data": cqllist })
                                            }
                                            else {
                                                res.status(200).json({ "error": err.message });
                                            }
                                        })
                                    }
                                    else {
                                        res.status(200).json({ "error": err.message });
                                    }
                                })
                            }
                        }
                        else {
                            res.status(200).json({ "error": err.message });
                        }
                    })
                }
                else {


                    var query = 'select count(*) from "Analytics_M_Connections" where connectionname=$1 and connectiontype=$2 and id!=$3';

                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].ConnectionName, 'Cassandra Connection', req.body[0].operation], function (err, result) {
                        if (!err) {
                            if (result[0].count == 0) {

                                //delete req.body[0].operation;
                                var query = 'update "Analytics_M_Connections" set connectionname=$1,connectiontype=$2,databasename=$3,password=$4,portnumber=$5,servername=$6,userid=$7,username=$8,"Role"=$9 where id=$10';
                                //console.log(query);
                                postgresqlDBManager.PSQL_InsertData(query, [req.body[0].ConnectionName, req.body[0].ConnectionType, req.body[0].databasename, req.body[0].Password, req.body[0].PortNumber, req.body[0].ServerName, req.body[0].Userid, req.session.myemail, req.session.RoleId, req.body[0].operation], function (err, cqlresult) {
                                    if (!err) {
                                        query = 'select ConnectionName as "ConnectionName",Id as "Id" from "Analytics_M_Connections" where UserName=$1 and ConnectionType=$2';

                                        postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, req.body[0].ConnectionType], function (err, cqllist) {
                                            if (!err) {
                                                res.status(200).json({ "data": cqllist })
                                            }
                                            else {
                                                res.status(200).json({ "error": err.message });
                                            }
                                        })
                                    }
                                    else {
                                        res.status(200).json({ "error": err.message });
                                    }
                                });
                            }
                            else {
                                res.status(200).json({ "data": "duplicates" })
                            }
                        }
                        else {
                            res.status(200).json({ "error": err.message });
                        }

                    });

                }
            }
            else {
                res.status(200).json({ "isauthenticated": false })
            }
        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });

        }
    });
    /*
     * @summary this method is used to /CassandraConnection/GetCassandraConnList
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/GetCassandraConnList_0130
     */
    app.get('/CassandraConnection/GetCassandraConnList', function (req, res) {

        try {
            if (req.session.authenticated === true) {
                var query = 'select connectionname as "ConnectionName",id as "Id" from "Analytics_M_Connections" where username=$1 and connectiontype=$2';

                postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, 'Cassandra Connection'], function (err, result) {
                    if (!err) {
                        console.log(result);
                        res.status(200).json({ "data": result });
                    }
                    else {
                        console.log("error : " + err.message);
                        res.status(200).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }
        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }
    });
    /*
     * @summary this method is used to /CassandraConnection/GetCassandraConnList
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/GetCassandraConnList_0131
     */
    app.post('/CqlConnection/RemoveCassandra_Connection', function (req, res) {

        try {
            if (req.session.authenticated == true) {
                var query = 'delete from "Analytics_M_Connections" where id=' + req.body.remove_ConndataId + '';

                postgresqlDBManager.PSQL_InsertData(query, null, function (err, result) {
                    if (!err) {
                        res.status(200).json({ "data": "Successfully connection deleted" });
                    }
                    else {
                        res.status(200).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }

    });
    /*
     * @summary this method is used to /CassandraConnection/Editcassandra_Connection
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/Editcassandra_Connection_0132
     */
    app.post('/CassandraConnection/Editcassandra_Connection', function (req, res) {

        try {
            if (req.session.authenticated == true) {

                var query = 'select * from "Analytics_M_Connections" where id=' + req.body.Edit_Conn + '';

                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                    if (!err) {
                        res.status(200).json({ "data": result });
                    }
                    else {
                        res.status(200).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }

    });

    //Cassandra_Conn Table Insert Query BY phani start
    /*
     * @summary this method is used to /CassandraConnection/CassandraTableName
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/SaveCassandraQuery_0133
     */
    app.post("/CassandraConnection/SaveCassandraQuery", function (req, res) {
        try {
            if (req.session.authenticated == true) {

                if (req.body[0].operation == "save") {
                    var query = 'select * from "DataConnectors_M_CassandraConn" where tablename=$1 and connectionid=$2';

                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].Name, req.body[0].ConnIdhidespedit], function (err, result) {
                        if (!err) {
                            if (result.length > 0) {
                                res.status(200).json({ "duplicate": result });
                            }
                            else {
                                query = 'INSERT INTO "DataConnectors_M_CassandraConn"(connectionid,  query, tablename)VALUES($1,$2,$3)';

                                postgresqlDBManager.PSQL_InsertData(query, [req.body[0].ConnIdhidespedit, req.body[0].SPCreateQuery, req.body[0].Name], function (err, result) {
                                    if (!err) {

                                        query = 'select * from "DataConnectors_M_CassandraConn" where connectionid=' + req.body[0].ConnIdhidespedit + '';

                                        postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                                            if (!err) {
                                                res.status(200).json({ "data": result });
                                            }
                                            else {
                                                res.status(200).json({ "error": err.message });
                                            }
                                        })
                                    }
                                    else {
                                        res.status(200).json({ "error": err.message });
                                    }
                                })
                            }
                        }
                        else {
                            res.status(200).json({ "error": err.message });
                        }
                    });
                }
                else {

                    query = 'select count(*) from "DataConnectors_M_CassandraConn" where tablename=$1 and id!=$2';

                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].Name, req.body[0].operation], function (err, result) {
                        if (!err) {

                            if (result[0].count == 0) {
                                query = 'update  "DataConnectors_M_CassandraConn" set   query=$1,tablename=$3 where id=$2';


                                postgresqlDBManager.PSQL_InsertData(query, [req.body[0].SPCreateQuery, req.body[0].operation, req.body[0].Name], function (err, result) {
                                    if (!err) {
                                        query = 'select * from "DataConnectors_M_CassandraConn" where connectionid=' + req.body[0].ConnIdhidespedit + '';

                                        postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                                            if (!err) {
                                                res.status(200).json({ "data": result });
                                            }
                                            else {
                                                res.status(200).json({ "error": err.message });
                                            }
                                        })
                                    }
                                    else {
                                        res.status(200).json({ "error": err.message });
                                    }
                                });
                            }
                            else {
                                res.status(200).json({ "duplicate": result });
                            }
                        }
                        else {
                            res.status(200).json({ "error": err.message });
                        }
                    });


                }

            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }
    });


    /*
     * @summary this method is used to /CassandraConnection/GetCassandraList
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/GetCassandraList_0134
     */
    app.post('/CassandraConnection/GetSelectedCassandraList', function (req, res) {

        try {
            if (req.session.authenticated == true) {

                var query = 'select * from "DataConnectors_M_CassandraConn" where connectionid=' + req.body.Conndata + '';

                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                    if (!err) {
                        res.status(200).json({ "data": result });
                    }
                    else {
                        res.status(200).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }
    });




    //Cassandra_Conn Table Edit Query
    /*
     * @summary this method is used to /CassandraConnection/CassandraSPGet
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/CassandraSPGet_0135
     */
    app.post('/CassandraConnection/CassandraSPGet', function (req, res) {

        try {
            var resarray = JSON.parse(req.body.GET_SPdtail);
            var StorePDname = resarray[0]["StorePDname"];
            var SelcSPId = resarray[0]["SelcSPId"];


            if (req.session.authenticated == true) {

                var query = 'select amc.servername,amc.portnumber,amc.databasename,amc.userid,amc.password,dmc.query from "Analytics_M_Connections" as AMC inner join "DataConnectors_M_CassandraConn" as DMC on AMC.id=DMC.connectionid where DMC.id=$1';

                postgresqlDBManager.PSQL_getdata(query, [StorePDname], function (err, result) {
                    if (!err) {

                        var dbname = result[0].databasename;

                        var host = result[0].servername + ':' + result[0].portnumber;

                        var dc_clientTesult = new cassandra.Client({ contactPoints: [host], keyspace: result[0].databasename });

                        dc_clientTesult.connect(function (err) {
                            if (!err) {
                                dc_clientTesult.execute(result[0].query, function (err, cassandraresult) {
                                    if (!err) {
                                        res.status(200).json({ "res": cassandraresult.rows })
                                    }
                                    else {
                                        res.status(200).json({ "error": err.message });
                                    }
                                })
                            }
                            else {
                                res.status(200).json({ "error": err.message });
                            }
                        })
                    }
                    else {
                        res.status(200).json({ "error": err.message });

                    }
                });

            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }

    });


    /*
     * @summary this method is used to /CassandraConnection/CassandraSPGetEdit
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/CassandraSPGetEdit_0137
     */
    app.post('/CasConnection/CassandraSPGetEdit', function (req, res) {
        var data = JSON.parse(req.body.CassGetSPforedit);
        var selcSPId = data[0].Editspitem;

        try {
            if (req.session.authenticated == true) {

                var query = 'select * from "DataConnectors_M_CassandraConn" where id=$1';

                postgresqlDBManager.PSQL_getdata(query, [selcSPId], function (err, result) {
                    if (!err) {
                        res.status(200).json({ "data": result });
                    }
                    else {
                        res.status(200).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }


    });
    /*
     * @summary this method is used to /CassandraConnection/RemoveCas_SPConnection
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/RemoveCas_SPConnection_0138
     */

    app.post('/CasConnection/RemoveCas_SPConnection', function (req, res) {


        var data1 = JSON.parse(req.body.Remove_ConnSPdata);

        try {
            if (req.session.authenticated == true) {

                var query = 'delete from "DataConnectors_M_CassandraConn" where id=$1';

                postgresqlDBManager.PSQL_InsertData(query, [data1[0].SelectedSPS], function (err, result) {
                    if (!err) {
                        query = 'select * from "DataConnectors_M_CassandraConn" where connectionid=' + data1[0].ConnIdhide + '';

                        postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                            if (!err) {
                                res.status(200).json({ "data": result });
                            }
                            else {
                                res.status(200).json({ "error": err.message });
                            }
                        })
                    }
                    else {
                        res.status(200).json({ "error": err.message });
                    }
                });

            }
            else {
                res.status(200).json({ "isauthenticated": false });
            }

        }
        catch (ex) {
            res.status(200).json({ "error": ex.message });
        }


    });
    /*
     * @summary this method is used to /CassandraConnection/CassandraSPGetEdit
     * @param req.body. will have cassandra connection data.
     * functioncode: /CassandraConnection/CassandraSPGetEdit_0139
     */

    //////////////////////////////phani_Cassansdra EDit
    app.post('/CassandraConnection/CassandraSPGetEdit', function (req, res) {
        console.log("edit and update");
        console.log(Edit_Conn);

        var query = "select * from connections where id=" + req.body.Edit_Conn + "";
        analytics_client.execute(query, function (err, result) {
            if (err) {
                console.log(res, err.message, "Failed to update data.");
            }
            else {
                res.status(200).json(result.rows);
            }
        });
    });

    /*  ... Phani **/



    //......... GET_DataForMathOperations ..................//
    /*
     * @summary this method is used to /CassandraConnection/AllConnGrid
     * @param req.body. will have  connection data.
     * functioncode: /GetAllConnectionData/AllConnGrid_0140
     */
    app.get('/GetAllConnectionData/AllConnGrid', function (req, res) {
        var arr = [];

        try {
            analytics_client.execute("SELECT id, connectas, connectionname, connectiontype, databasename, password, portnumber, servername, service, sqltype, userid, username FROM connections;", queryOptions, function (err, result) {
                if (err) {
                    res.status(200).send({ "errorresult": err.message });
                }
                else {
                    result = result.rows;
                    var connctionsloop = function (i) {
                        if (i < result.length) {
                            try {
                                if (result[i].connectiontype == "Sql Connection") {
                                    analytics_client.execute("SELECT connectionid, selected_sp, checked, id FROM sql_conn where connectionid=" + result[i].id + ";", queryOptions, function (err, sqlresult) {
                                        if (err) {
                                            res.status(200).send({ "errorresult": err.message });
                                        }
                                        else {
                                            var sqlresultloop = function (x) {
                                                if (x < sqlresult.rows.length) {
                                                    arr.push({ "Id": sqlresult.rows[x].connectionid, "SPId": sqlresult.rows[x].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": sqlresult.rows[x].selected_sp, "UserName": "Admin" });
                                                    sqlresultloop(x + 1);
                                                }
                                                else {
                                                    connctionsloop(i + 1);
                                                }
                                            }
                                            sqlresultloop(0);
                                        }
                                    });
                                }
                                else if (result[i].connectiontype == "Cassandra Connection") {
                                    analytics_client.execute("SELECT connectionid, tablename, id, query FROM iarms360.cassandra_conn where connectionid=" + result[i].id + ";", queryOptions, function (err, cqlresult) {
                                        if (err) {
                                            res.status(200).send({ "errorresult": err.message });
                                        }
                                        else {
                                            var cqlresultloop = function (x) {
                                                if (x < cqlresult.rows.length) {
                                                    arr.push({ "Id": cqlresult.rows[x].connectionid, "SPId": cqlresult.rows[x].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": cqlresult.rows[x].tablename, "UserName": "Admin" });
                                                    cqlresultloop(x + 1);
                                                }
                                                else {
                                                    connctionsloop(i + 1);
                                                }
                                            }
                                            cqlresultloop(0);
                                        }
                                    });
                                }
                                else if (result[i].connectiontype == "MongoDB Connection") {
                                    arr.push({ "Id": result[i].id, "SPId": result[i].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": result[i].databasename, "UserName": "Admin" });
                                    connctionsloop(i + 1);
                                }
                                else if (result[i].connectiontype == "Oracle Connection") {
                                    arr.push({ "Id": result[i].id, "SPId": result[i].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": result[i].databasename, "UserName": "Admin" });
                                    connctionsloop(i + 1);
                                }
                                else if (result[i].connectiontype == "XML Connection") {
                                    arr.push({ "Id": result[i].id, "SPId": result[i].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": result[i].databasename, "UserName": "Admin" });
                                    connctionsloop(i + 1);
                                }
                                else if (result[i].connectiontype == "Excel Connection") {
                                    arr.push({ "Id": result[i].id, "SPId": result[i].id, "ConnectionName": result[i].connectionname, "ConnectionType": result[i].connectiontype, "DataSource": result[i].databasename, "UserName": "Admin" });
                                    connctionsloop(i + 1);
                                }
                            }
                            catch (ex) {
                                res.status(200).send({ "errorresult": ex.message });
                            }
                        }
                        else {
                            // console.log(JSON.stringify(arr));
                            res.status(200).json({ "responsegrid": arr });
                        }
                    }
                    connctionsloop(0);
                }
            });
        }
        catch (ex) {
            res.status(200).send({ "errorresult": ex.message });
        }
    });
    /*
     * @summary this method is used to /CassandraConnection/GET_SPGriddtails
     * @param req.body. will have  connection data.
     * functioncode: /GetAllConnectionData/GET_SPGriddtails_0141
     */
    app.post('/GetAllConnectionData/GET_SPGriddtails', function (req, res) {
        try {
            var resarray = JSON.parse(req.body.Get_SPGriddtail);
            var StorePDname = resarray[0]["DSName"];
            var SelcSPId = resarray[0]["DSId"];
            //console.log(resarray[0]["ConnectionID"]);
            //console.log(resarray[0]["DSId"]);

            var connectiontype = resarray[0].DSConnType;
            if (connectiontype == "Cassandra Connection") {
                analytics_client.execute('Select * from Connections where id=?;', [SelcSPId], queryOptions, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to get Cassandra Data.");
                        res.status(200).send({ "errorresult": err.message });
                    }
                    else {
                        var newclient = new cassandra.Client({
                            contactPoints: [result.rows[0].servername + ":" + result.rows[0].portnumber], queryOptions: {
                                consistency: cassandra.types.consistencies.localquorum
                            },
                            keyspace: result.rows[0].databasename
                        });

                        var queryOptions = {
                            consistency: cassandra.types.consistencies.localquorum,
                            prepare: true
                        };

                        newclient.connect(function (err) {
                            if (!err) {
                                console.log("Successfully connected to the cassandra database");
                                newclient.execute('Select * from cassandra_conn where id=' + resarray[0]["ConnectionID"] + ' and connectionid=' + resarray[0]["DSId"] + ' allow filtering;', function (err, result) {
                                    if (err) {
                                        res.status(200).send({ "errorresult": err.message });
                                    }
                                    else {
                                        newclient.execute(result.rows[0].query, function (err, result) {
                                            if (err) {
                                                res.send({ "error": err.message });
                                            }
                                            else {
                                                var convertdata = convertdatatoarrays(result.rows);
                                                res.status(200).json({ "tabledata": convertdata });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                res.status(200).send({ "errorresult": err.message });
                            }
                        });
                    }
                });
            }
            else if (connectiontype == "Sql Connection") {
                analytics_client.execute('Select * from Connections where id=?;', [SelcSPId], queryOptions, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to get SQL Data.");
                        res.status(200).send({ "errorresult": err.message });
                    }
                    else {
                        var dbname = result.rows[0].databasename;
                        var config = '';
                        var sql_Type = result.rows[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result.rows[0].userid,
                                password: result.rows[0].password,
                                server: result.rows[0].servername,
                                port: result.rows[0].portnumber,
                                database: result.rows[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result.rows[0].servername,
                                port: result.rows[0].portnumber,
                                database: result.rows[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        var query = "Select * from ParameterConfigs where ConnId=" + SelcSPId + " and Selspname='" + StorePDname + "' and UserName='ASD' allow filtering;";
                        analytics_client.execute(query, queryOptions, function (err, result) {
                            if (err) {
                                res.status(200).send({ "errorresult": err });
                            }
                            else {
                                if (result.rows.length > 0) {
                                    sql.connect(config).then(function () {
                                        var request = new sql.Request();
                                        var Recursive = function (x) {
                                            if (x < result.rows.length) {
                                                request.input((result.rows[x].selparamname).replace('@', ''), result.rows[x].paramdefault);

                                                if (x == result.rows.length - 1) {
                                                    request.execute(StorePDname, function (err, recordsets, returnValue) {
                                                        if (err) {
                                                            res.status(200).json({ "errorresult": err });
                                                        }
                                                        else {
                                                            var convertdata = convertdatatoarrays(recordsets[0]);
                                                            res.status(200).json({ "tabledata": convertdata });
                                                        }
                                                    });
                                                }
                                                Recursive(x + 1);
                                            }
                                        }
                                        Recursive(0);
                                    });
                                }
                                else {
                                    sql.connect(config).then(function () {
                                        new sql.Request().query("select PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from information_schema.parameters where specific_name='" + StorePDname + "' and SPECIFIC_CATALOG='" + dbname + "'").then(function (recordset) {
                                            if (err) {
                                                res.status(200).send({ "errorresult": err.message });
                                            }
                                            else {
                                                if (recordset.length > 0) {
                                                    res.status(200).send({ responsedata: "Show Param Configure" });
                                                }
                                                else {
                                                    sql.connect(config).then(function () {
                                                        var request = new sql.Request();
                                                        request.execute(StorePDname, function (err, recordsets, returnValue) {
                                                            if (err) {
                                                                res.status(200).json({ "errorresult": err });
                                                            }
                                                            else {
                                                                var convertdata = convertdatatoarrays(recordsets[0]);
                                                                res.status(200).json({ "tabledata": convertdata });
                                                            }
                                                        });
                                                    });
                                                }
                                            }
                                        }).catch(function (err) {
                                            res.status(200).send({ "errorresult": err.message });
                                        });
                                    }).catch(function (err) {
                                        res.status(200).send({ "errorresult": err.message });
                                    });
                                }
                            }
                        });
                    }
                });
            }
            else if (connectiontype == "MongoDB Connection") {
                analytics_client.execute('Select * from Connections where id=?;', [SelcSPId], queryOptions, function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to get MongoDB Data.");
                        res.status(200).send({ "errorresult": err.message });
                    }
                    else {
                        var Url = "mongodb://" + result.rows[0].servername + ":" + result.rows[0].portnumber + "/" + result.rows[0].databasename;

                        mongodb.MongoClient.connect(Url, function (err, database) {
                            if (err) {
                                res.status(200).send({ "errorresult": err.message });
                            }
                            else {
                                database.listCollections().toArray(function (err, collInfos) {
                                    var convertdata = convertdatatoarrays(collInfos);
                                    res.status(200).json({ "tabledata": convertdata });
                                });
                            }
                        });
                    }
                });
            }
            else if (connectiontype == "XML Connection") {
                analytics_client.execute('Select uploadedfiles as "UploadedFiles",radiovalue as "RadioValue",fromurl as "FromURL" FROM xml_conn where connectionid=' + resarray[0]["ConnectionID"] + ' allow filtering', function (err, result) {
                    if (err) {
                        console.log(res, err.message, "Failed to get XML Data.");
                        res.status(200).send({ "errorresult": err.message });
                    }
                    else {
                        console.log(result);
                        console.log(result.rows);
                        var radiovalue = result.rows[0].RadioValue;
                        var url = result.rows[0].FromURL;
                        var uploadedfiles = result.rows[0].UploadedFiles;

                        if (radiovalue == "FromUrl") {
                            var url11 = url.toString();
                            var LastSlash = url11.lastIndexOf("/");
                            var FileName = url11.substring(LastSlash + 1, url11.length);
                            path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + FileName + '';
                            //console.log(path11);
                            fs.readFile('' + path11 + '', 'utf8', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                var XMLPath = '' + path11 + '';
                                var rawJSON = loadXMLDoc(XMLPath);
                                function loadXMLDoc(filePath) {
                                    //var fs = require('fs');
                                    //var xml2js = require('xml2js');
                                    var json;

                                    var fileData = fs.readFileSync(filePath, 'ascii');

                                    var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
                                    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                                        json = JSON.stringify(result);
                                        console.log("if" + json);
                                        res.send(json);
                                    });
                                }
                            });
                        }
                        else {
                            path11 = __dirname + '/public/Analytics/uploadedxmlfiles/' + uploadedfiles + '';
                            fs.readFile('' + path11 + '', 'utf8', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                var XMLPath = '' + path11 + '';
                                var rawJSON = loadXMLDoc(XMLPath);
                                function loadXMLDoc(filePath) {
                                    //var fs = require('fs');
                                    //var xml2js = require('xml2js');
                                    var json;
                                    var fileData = fs.readFileSync(filePath, 'ascii');
                                    var parser = new xml2js.Parser({ explicitRoot: false, explicitChildren: false });
                                    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
                                        json = JSON.stringify(result);
                                        console.log("else" + json);
                                        res.send(json);
                                    });
                                }
                            });
                        }
                    }
                });
            }
            else if (connectiontype == "Excel Connection") {

            }
        }
        catch (ex) {
            res.status(200).send({ "errorresult": ex.message });
        }
    });

    /*
     * @summary this method is used to /CassandraConnection/GET_DataForMathOperations
     * @param req.body. will have  connection data.
     * functioncode: /GetAllConnectionData/GET_DataForMathOperations_0142
     */
    app.post('/GetAllConnectionData/GET_DataForMathOperations', function (req, res) {
        try {
            var resarray = JSON.parse(req.body.Get_SPGriddtail);
            var StorePDname = resarray[0]["DSName"];
            var SelcSPId = resarray[0]["DSId"];
            console.log("GetAllConnectionData " + resarray[0]["DSName"]);
            GetData(resarray, resarray[0]["formulea"], function (err, response) {
                console.log("Data : " + response);
                if (!err) {
                    res.status(200).send({ tabledata: response });
                }
                else {
                    res.status(200).send({ errorresult: err });

                }

            });
        }
        catch (ex) {
            res.send(ex.toString());
        }
        //console.log("Seleteed Data : "+selectedcoldata);

        //callBackFunction(data, function (err, response) {
        //    console.log(response)
        //})

        //// callbackfunction 
        //function callBackFuntion(data, callback) {
        //    //write your logic and return your result as
        //    callback("", result) //if not error
        //    callback(error, "") //if error
        //}

    });

    /*
     * @summary this method is used to /CassandraConnection/GET_DataForMathOperations_1
     * @param req.body. will have  connection data.
     * functioncode: /GetAllConnectionData/GET_DataForMathOperations_1_0142
     */
    app.post('/GetAllConnectionData/GET_DataForMathOperations_1', function (req, res) {
        try {

            //console.log("req.body" +JSON.stringify(req.body));
            //console.log("req.body.Get_SPGriddtail" + req.body.Get_SPGriddtail);
            var resarray = JSON.parse(req.body.Get_SPGriddtail);
            //console.log("resarray" + JSON.stringify(resarray));
            var StorePDname = resarray[0]["DSName"];
            var SelcSPId = resarray[0]["DSId"];
            //console.log("GetAllConnectionData " + resarray[0]["DSName"]);       
            //console.log(resarray[0]["formulea"]);
            GetData(resarray, resarray[0]["formulea"], function (err, response) {
                console.log("Data : " + response);
                if (!err) {
                    res.status(200).send({ tabledata: response });
                }
                else {
                    res.status(200).send({ errorresult: err });

                }

            });
        }
        catch (ex) {
            res.send(ex.toString());
        }
        //console.log("Seleteed Data : "+selectedcoldata);

        //callBackFunction(data, function (err, response) {
        //    console.log(response)
        //})

        //// callbackfunction 
        //function callBackFuntion(data, callback) {
        //    //write your logic and return your result as
        //    callback("", result) //if not error
        //    callback(error, "") //if error
        //}

    });
    /*
     * @summary this method is used to GetData
     * @get_spdetails will have slected connection details
     * @formula will have selected column name
     * @callback call back for synchronous
     * functioncode: GetData_0143
     */
    function GetData(get_spdetails, formula, callback) {
        // console.log("ss");
        // app.post('/GaetData/GET_DataForMathOperations', function(req, res) {
        //var data = [{
        //    "ConnectionID": "23648680-12e9-11e7-bcfd-a7c5804b41d2",
        //    "DSConnType": "Sql Connection",
        //    "DSId": "170",
        //    // "DSName" : "Qc_Plan_Actual",
        //    "DSName": "iPortsp_Commodity_Summary_DrillDown",
        //    "DSCnnCretedby": "ADMIN",
        //    "formula": "[Id]"
        //}];

        var data = [{
            "ConnectionID": get_spdetails[0]["DSId"],
            "DSConnType": get_spdetails[0]["DSConnType"],
            "DSId": get_spdetails[0]["ConnectionID"],
            // "DSName" : "Qc_Plan_Actual",
            "DSName": get_spdetails[0]["DSName"],
            "DSCnnCretedby": get_spdetails[0]["DSCnnCretedby"],
            "formula": get_spdetails[0]["formulea"]
        }];

        // var data=req.body[0];
        // console.log(JSON.stringify(data));

        //var ConnectionID = "23648680-12e9-11e7-bcfd-a7c5804b41d2";
        //var DSConnType = "Sql Connection";
        //var DSId = "170";
        //var DSName = "iPortsp_Commodity_Summary_DrillDown";
        //var DSCnnCretedby = "ADMIN";


        var ConnectionID = get_spdetails[0]["ConnectionID"];
        var DSConnType = get_spdetails[0]["DSConnType"];
        var DSId = get_spdetails[0]["DSId"];
        var DSName = get_spdetails[0]["DSName"];
        var DSCnnCretedby = get_spdetails[0]["DSCnnCretedby"];
        var formula = get_spdetails[0]["formulea"];


        //var formula="[Transporation Type]";	
        // console.log("response
        // "+JSON.stringify(response));
        // var formula = "Transporation Type";
        //var formula = "Transporation Type@1";
        //var formula="%Ramcharan%";

        //var formula="%refno$129$@month%";

        // var formula = "SUM([Quantity],data)";
        var finallistarr = [];
        var res1;
        var rowfinalres1 = [];

        if (formula.match(/\%(.*?)\%/)) {
            var pattern = formula.match(/\%(.*?)\%/);
            //formula=(pattern[1]);	

            var varName = pattern[1];
            console.log(varName);
            //if(varName.Contains("refno")){
            if (varName.indexOf("refno") != -1) {
                if (varName.indexOf('$') != -1) {
                    var formulasplit = varName.split('$');
                    var refn = formulasplit[0];
                    var id = formulasplit[1];
                    var param = formulasplit[2];

                    //console.log(param);console.log(id);
                    var refquery = "SELECT paramdefault from ParameterConfigs where Id='" + id + "'";    //get data from db
                    //dt = (new Database().FillDataTable(refquery));
                    //var RefVal = dt.Rows[0]["paramdefault"].ToString();
                    //formula = formula.Replace("%" + varName + "%", RefVal);                        
                }
                else {
                    var formulasplit = varName.split('_');
                    var refn = formulasplit[0];
                    var id = formulasplit[1];
                    var param = formulasplit[2];

                    //console.log(param);console.log(id);

                    var refquery = "SELECT paramdefault from ParameterConfigs where Id='" + id + "'";    //get data from db
                    //dt = (new Database().FillDataTable(refquery));
                    //var RefVal = dt.Rows[0]["paramdefault"].ToString();
                    //formula = formula.Replace("%" + varName + "%", RefVal);
                }
            }
            else {
                var varValue = "";
                if (varName == "@datetimenow") {
                    var datenottime = new Date();
                    var dd = datenottime.getDate();
                    var mm = datenottime.getMonth() + 1; //January is 0!

                    var yyyy = datenottime.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var today = dd + '-' + mm + '-' + yyyy;

                    varValue = today;

                }
                else if (varName == "@yesterday") {
                    //DateTime yesterday = DateTime.Now.Date.AddDays(-1);

                    var yesterday = new Date().AddDays(-1);
                    var dd = yesterday.getDate();
                    var mm = yesterday.getMonth() + 1; //January is 0!

                    var yyyy = yesterday.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var yesterdaydate = dd + '-' + mm + '-' + yyyy;

                    varValue = yesterdaydate;

                    //varValue = yesterday.ToShortDateString();
                }
                else if (varName == "@tomorrow")                            //data like start and end date,year,month
                {
                    //DateTime tomorrow = DateTime.Now.Date.AddDays(+1);
                    //varValue = tomorrow.ToShortDateString();

                    var tomorrow = new Date().AddDays(+1);
                    var dd = tomorrow.getDate();
                    var mm = tomorrow.getMonth() + 1; //January is 0!

                    var yyyy = tomorrow.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var tomorrowdate = dd + '-' + mm + '-' + yyyy;

                    varValue = tomorrowdate;

                }
                else if (varName == "@userlogin") {
                    varValue = User.Identity.Name;
                }
                else if (varName == "@monthstart") {
                    //DateTime strtdate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    //varValue = strtdate.ToShortDateString();

                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var dd = firstDay.getDate();
                    var mm = firstDay.getMonth() + 1; //January is 0!

                    var yyyy = firstDay.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    varValue = dd + '-' + mm + '-' + yyyy;
                }
                else if (varName == "@monthend") {
                    //DateTime endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1).AddDays(-1);
                    //varValue = endDate.ToShortDateString();
                    var date = new Date();
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    var dd = lastDay.getDate();
                    var mm = lastDay.getMonth() + 1; //January is 0!
                    var yyyy = lastDay.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    varValue = dd + '-' + mm + '-' + yyyy;
                }
                else if (varName == "@yearstart") {
                    //DateTime startyear = new DateTime(DateTime.Now.Year, 1, 1);
                    //varValue = startyear.ToShortDateString();

                    var startyear = new Date(new Date().getFullYear(), 1, 1);
                    var dd = startyear.getDate();
                    var mm = startyear.getMonth() + 1; //January is 0!

                    var yyyy = startyear.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var startyeardate = dd + '-' + mm + '-' + yyyy;

                    varValue = startyeardate;


                }
                else if (varName == "@yearend") {
                    //DateTime endyear = new DateTime(DateTime.Now.Year, 12, 31);
                    //varValue = endyear.ToShortDateString();                    	 
                    var endyear = new Date(new Date().getFullYear(), 12, 31);
                    var dd = endyear.getDate();
                    var mm = endyear.getMonth() + 1; //January is 0!
                    var yyyy = endyear.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var endyeardate = dd + '-' + mm + '-' + yyyy;
                    varValue = endyeardate;
                }
                else {
                    //string variablequery = "SELECT DefaultValue from New_Variables where VariableName='" + varName + "'";
                    //dt = (new Database().FillDataTable(variablequery));
                    //varValue = dt.Rows[0]["DefaultValue"].ToString();
                }
                formula = formula.Replace("%" + varName + "%", varValue);
                console.log(varName);
            }
        }
        //else{

        if (ConnectionID == "" && DSConnType == "") {
            if (formula.match(/^[\w\s]*$/)) {
                //var pattern=formula.match(/\%(.*?)\%/);
                //if (Regex.IsMatch(formula, @"^[\w\s]*$"))
                //{
                res1 = formula;
                //console.log("res1 "+res1);
            }
            else if (formula.match(/^[a-zA-Z0-9//%()@$ ]*$/)) {
                res1 = formula;
                //console.log("res11 "+res1);
            }
            else {
                //res1 = sc1.Evaluate(formula);
                res1 = eval(formula);
            }
            rowfinalres1.push(res1);
            //console.log("rowfinalres1 "+rowfinalres1);
            console.log("json rowfinalres1 " + JSON.stringify(rowfinalres1));


            //obj = JsonConvert.SerializeObject(rowfinalres1);
            //return new JsonResult()
            //{
            //   Data = new { coldata = obj.ToString() },
            //   JsonRequestBehavior = JsonRequestBehavior.AllowGet
            //};
        }
        else {
            var recordsets;
            //console.log("ELSE");
            DataConnectivity.connect_cassandra(function (response) {
                // var request = new sql.Request();
                var Data = response;
                //console.log(Data);
                DataConnectivity.cassandra_getData(JSON.stringify(data), function (response) {
                    // console.log(response[0]);
                    recordsets = response;
                    //console.log("recordsets "+recordsets);
                    if (formula.indexOf("SUM(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.indexOf("CUMULATIVE(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.indexOf("MIN(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.indexOf("MAX(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.indexOf("COUNT(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.indexOf("AVERAGE(data)") != -1) {
                        return Data.coldata = "";
                        //          				                        return new JsonResult()
                        //          				                        {
                        //          				                            Data = new { coldata = string.Empty },
                        //          				                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        //          				                        };
                    }
                    else if (formula.match(/SUM(.*?),/g)) {
                        //console.log("sumlist formula "+ formula);
                        var sumlist = [];
                        var reg = new RegExp(/SUM(.*?),/g);
                        var result;
                        while ((result = reg.exec(formula)) !== null) {
                            var columnName = result[1];
                            var colnm = columnName.replace("(", "");
                            colnm = colnm.replace("[", ""); colnm = colnm.replace("]", "");
                            sumlist.push(colnm);
                        }
                        //console.log(JSON.stringify(recordsets));
                        var sumcoldata = 0;
                        for (var col in sumlist) {
                            var colname = sumlist[col];
                            //console.log("colname "+colname);
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(colname)) {
                                    //finallistarr.push(recordsets[item][col]);
                                    //console.log("recordsets[item][col] "+recordsets[item][colname]);
                                    sumcoldata = sumcoldata + recordsets[item][colname];
                                }
                            }
                        }
                        formula = sumcoldata;
                        console.log("sumcoldata " + sumcoldata);
                    }
                    else if (formula.match(/COUNT(.*?),/)) {
                        //console.log("sumlist formula "+ formula);
                        var countlist = [];
                        var reg = new RegExp(/COUNT(.*?),/);
                        var result;
                        while ((result = reg.exec(formula)) !== null) {
                            var columnName = result[1];
                            var colnm = columnName.replace("(", "");
                            colnm = colnm.replace("[", ""); colnm = colnm.replace("]", "");
                            countlist.push(colnm);
                        }
                        //console.log(JSON.stringify(recordsets));
                        var cntcoldata = 0;
                        for (var col in countlist) {
                            var colname = countlist[col];
                            //console.log("colname "+colname);
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(colname)) {
                                    //finallistarr.push(recordsets[item][col]);
                                    //console.log("recordsets[item][col] "+recordsets[item][colname]);
                                    cntcoldata = cntcoldata + 1;
                                }
                            }
                        }
                        formula = cntcoldata;
                        console.log("cntcoldata " + cntcoldata);
                    }
                    else if (formula.match(/MIN(.*?),/)) {
                        //console.log("sumlist formula "+ formula);
                        var minlist = [];
                        var reg = new RegExp(/MIN(.*?),/);
                        var result;
                        while ((result = reg.exec(formula)) !== null) {
                            var columnName = result[1];
                            var colnm = columnName.replace("(", "");
                            colnm = colnm.replace("[", ""); colnm = colnm.replace("]", "");
                            minlist.push(colnm);
                        }
                        //console.log(JSON.stringify(recordsets));
                        var mincoldata = 0;
                        for (var col in minlist) {
                            var colname = minlist[col];
                            //console.log("colname "+colname);
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(colname)) {
                                    //finallistarr.push(recordsets[item][col]);
                                    //console.log("recordsets[item][col] "+recordsets[item][colname]);
                                    var minval = recordsets[item][colname];
                                    if (mincoldata == 0) {
                                        mincoldata = minval;
                                    }
                                    else {
                                        if (mincoldata < minval) {
                                            mincoldata = mincoldata;

                                        }
                                        else {
                                            mincoldata = minval;
                                        }
                                    }
                                }
                            }
                        }
                        formula = mincoldata;
                        console.log("cntcoldata " + mincoldata);
                    }
                    else if (formula.match(/MAX(.*?),/)) {
                        //console.log("sumlist formula "+ formula);
                        var maxlist = [];
                        var reg = new RegExp(/MAX(.*?),/);
                        var result;
                        while ((result = reg.exec(formula)) !== null) {
                            var columnName = result[1];
                            var colnm = columnName.replace("(", "");
                            colnm = colnm.replace("[", ""); colnm = colnm.replace("]", "");
                            maxlist.push(colnm);
                        }
                        //console.log(JSON.stringify(recordsets));
                        var maxcoldata = 0;
                        for (var col in maxlist) {
                            var colname = maxlist[col];
                            //console.log("colname "+colname);
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(colname)) {
                                    //finallistarr.push(recordsets[item][col]);
                                    //console.log("recordsets[item][col] "+recordsets[item][colname]);
                                    var maxval = recordsets[item][colname];
                                    if (maxcoldata == 0) {
                                        maxcoldata = maxval;
                                    }
                                    else {
                                        if (maxcoldata > maxval) {
                                            maxcoldata = maxcoldata;
                                        }
                                        else {
                                            maxcoldata = maxval;

                                        }
                                    }
                                }
                            }
                        }
                        formula = maxcoldata;
                        console.log("cntcoldata " + maxcoldata);
                    }
                    else if (formula.match(/AVERAGE(.*?),/)) {
                        //console.log("sumlist formula "+ formula);
                        var avglist = [];
                        var reg = new RegExp(/AVERAGE(.*?),/);
                        var result;
                        while ((result = reg.exec(formula)) !== null) {
                            var columnName = result[1];
                            var colnm = columnName.replace("(", "");
                            colnm = colnm.replace("[", ""); colnm = colnm.replace("]", "");
                            avglist.push(colnm);
                        }
                        //console.log(JSON.stringify(recordsets));
                        var avgcoldata = 0; var avgcnt = 0;
                        for (var col in avglist) {
                            var colname = avglist[col];
                            //console.log("colname "+colname);
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(colname)) {
                                    //finallistarr.push(recordsets[item][col]);
                                    //console.log("recordsets[item][col] "+recordsets[item][colname]);
                                    var avgval = recordsets[item][colname];
                                    avgcoldata = avgcoldata + avgval;
                                    avgcnt = avgcnt + 1;

                                }
                            }
                        }

                        var avgdata = avgcoldata / avgcnt;
                        formula = avgdata;
                        console.log("cntcoldata " + avgdata);
                    }
                    else {
                        //console.log("formulaa "+formula);
                        if (formula.match(/\w*@\w*/)) {
                            //console.log(formula);
                            var matchwords = formula.split('@')
                            formula = matchwords[0];
                            var wordindex = matchwords[1];
                            for (var item in recordsets) {
                                if (recordsets[item].hasOwnProperty(formula)) {
                                    finallistarr.push(recordsets[item][formula]);
                                }
                            }
                            //console.log(finallistarr);
                            console.log("finallistarr wordindex " + finallistarr[wordindex - 1]);
                            callback(false, finallistarr[wordindex - 1]);
                            //return Data.coldata = finallistarr[wordindex - 1];
                        }
                        else {
                            for (var item in recordsets) {
                                // console.log(recordsets[item].hasOwnProperty('Transporation
                                // Type'));
                                formula = formula.replace('[', "");
                                formula = formula.replace(']', "");
                                // console.log(formula);
                                // console.log(JSON.stringify(recordsets));
                                if (recordsets[item].hasOwnProperty(formula)) {
                                    finallistarr.push(recordsets[item][formula]);
                                }
                            }
                            console.log("finallistarr " + finallistarr);
                            callback(false, finallistarr);
                            //return Data.coldata = finallistarr;
                        }
                    }

                });

            });

            //console.log("recordsets1 "+recordsets);


        }
        //}
        // var data = response;
        // console.log(data);

        // });
    };


    //......... GET_DataForMathOperations ..................//

    /*
     * @summary this method is used to convertdatatoarrays
     * @jsondata will have json convert data
     * functioncode: convertdatatoarrays_0144
     */
    function convertdatatoarrays(jsondata) {
        var keys = _.keys(jsondata[0]);
        var arr = new Array(keys);

        for (data in jsondata) {
            var values = _.values(jsondata[data]);
            arr[arr.length] = values;

        }

        return arr;
    }


    ///Divya
    /*
     * @summary this method is used to /Home/gettreejsonforview
     * @param req.body. will have  dashboards tree json data.
     * functioncode: /Home/gettreejsonforview_0145
     */
    app.get("/Home/gettreejsonforview", function (req, res) {
        try {
            fs.readFile('public/Analytics/Bi360ReportsTree/Dashboardrepository.htm', function (err, html) {
                if (err) {
                    res.send({ "error": err.message });
                }
                else {
                    console.log(html);
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end();
                }
            });
        }
        catch (ex) {
            res.send({ "error": ex.message });
        }
    });

    /*
     * @summary this method is used to /Home/deletedashboardbyid
     * @param req.body. will have  dashboards selected json data.
     * functioncode: /Home/deletedashboardbyid_0147
     */
    app.post("/Home/deletedashboardbyid", function (req, res) {
        var query = "Delete from Dashboards where dashboardid='" + req.body.dashboardid + "'";
        analytics_client.execute(query, queryOptions, function (err, docs) {
            if (err) {
                handleError(res, err.message, "GetDashboardsList: Failed to get Dashboard List");
            }
            else {
                try {
                    var filePath = 'public/Analytics/BIDashboards/' + req.body.dashboardid + '.json';
                    fs.unlinkSync(filePath);
                    res.status(200).json(false);
                }
                catch (Exception) {
                    console.log(Exception.message);
                    res.status(200).json(true);
                }
            }
        });
    });
    /*
     * @summary this method is used to /Home/SaveTreeReport
     * @param req.body. will have  dashboards tree json data.
     * functioncode: /Home/SaveTreeReport_0148
     */
    app.post("/Home/SaveTreeReport", function (req, res) {
        console.log();
        fs.writeFile("public/Analytics/Bi360ReportsTree/Dashboardrepository.htm", req.body.treedata, function (err) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(true);
        });
    });


    //app.get('/ViewReports', function (req, res) {
    //    res.sendfile(__dirname + '/public/Views/Home/ViewReports.html');
    //});
    /*
     * @summary this method is used to /ViewDashboard/gettreejsonforview
     * @param req.body. will have  dashboards tree json data.
     * functioncode: /ViewDashboard/gettreejsonforview_0149
     */
    app.get('/ViewDashboard/gettreejsonforview', function (req, res) {
        try {
            fs.readFile('public/Analytics/Bi360ReportsTree/Dashboardrepository.htm', 'utf8', function (err, html) {
                if (err) {
                    res.send({ "error": err.message });
                }
                else {
                    res.send({ "treejson": html });
                }
            });
        }
        catch (ex) {
            res.send({ "error": ex.message });
        }
    })


    /************************************************************************************Start Kafka************************************************************************************/


    app.get('/KafkaNode_Tree', function (req, res) {
        try {
            var client = new cassandra.Client({
                contactPoints: ['192.168.4.186:9042', '192.168.4.166:9042'], queryOptions: {
                    consistency: cassandra.types.consistencies.local_quorum
                }, keyspace: 'kafka_demo'
            });
            client.connect(function (err) {
                if (err) {
                    console.log("Error in db Connection...............");
                }
                else {
                    console.log("cassnadra db is  Connected....");
                }

                var query = "select * from iarmsmessagner";
                client.execute(query, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //	console.log(result);
                        res.send(result);
                    }

                });
            });

        } catch (e) {
            console.log("Error" + ":" + "\t" + "KafkaNode_Tree" + e.message);
            res.send(e.message);
        }

    });

    app.get("/TopicList", function (req, res) {
        try {

            //var  client = new kafka.Client(''+Host+':'+Port+'');
            var client = new kafka.Client('192.168.4.182:2181');
            client.once('connect', function () {
                client.loadMetadataForTopics([], function (error, results) {
                    if (error) {
                        // return console.error(error);
                        console.log(error);
                    }
                    else { //console.log(results[1].metadata);
                        console.log(results[1].metadata);

                        res.send(results[1].metadata);
                    }
                });
            });
        } catch (e) {
            console.log("Error :" + "\t" + "TopicList" + e.message);
            res.send(e.message);
        }
    });

    app.get("/Replication", function (req, res) {

        try {


            var client = new kafka.Client('192.168.4.182:2181');
            client.once('connect', function () {
                client.loadMetadataForTopics([], function (error, results) {
                    if (error) {
                        // return console.error(error);
                        console.log(error);
                    }
                    else {
                        /*console.log()
                        for(var key in results[0]){
                        console.log(key);
                        }*/
                        res.send(results[0]);
                    }
                });
            });
        } catch (e) {
            console.log("Error :" + "\t" + "Replication" + e.message);
            res.send(e.message);
        }
    });


    app.post("/PData", function (req, res) {
        var CName = req.body.ClusterName;
        var Host = req.body.Host;
        var Port = req.body.Port;
        var Topic = req.body.Topic;
        var Partition = req.body.partition;
        var message = req.body.message;
        console.log(Topic);
        console.log(message);
        var client = new kafka.Client('192.168.4.182:2181');
        var producer = new Producer(client);
        payloads = [
                    { topic: Topic, messages: message, },
        ];
        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                if (!err) {
                    //  console.log(data);
                }
                else {
                    console.log(err);
                }


            });
        });

        producer.on('error', function (err) {
            console.log("inavlid");
        });

        res.send(client);
    });


    /************************************************************************************ Kafka End ************************************************************************************/



    /********************************************************************************** MQTT Start **************************************************************************/



    app.post("/MQTTConnectorSave_Device", function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var client = new cassandra.Client({
                    contactPoints: ['192.168.4.186:9042', '192.168.4.166:9042'], queryOptions: {
                        consistency: cassandra.types.consistencies.local_quorum
                    }, keyspace: 'kafka_demo'
                });
                client.connect(function (err) {
                    if (err) {
                        console.log("Error in db Connection...............");
                    }
                    else {
                        console.log("cassnadra db is  Connected....");
                    }
                    var query = "INSERT INTO kafka_demo.mqttconnector_info(deivceid, devicemodel, devicename, devicetype, host,password,port,topic,username) values('" + req.body.DeviceID + "','" + req.body.DeviceModel + "','" + req.body.DeviceName + "','" + req.body.DeviceType + "','" + req.body.Host + "','" + req.body.PassWord + "','" + req.body.Port + "','" + req.body.Topic + "','" + req.body.UserName + "')";
                    console.log(query);
                    client.execute(query, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send(false);
                        }
                        else {
                            res.send('Successfully Inserted');
                        }
                    });
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        } catch (e) {
            console.log("Error" + "\t" + "MQTTConnectorSave_Device" + e.message);
            res.send(e.message);
        }

    });
    app.get('/MQTT_DeviceList', function (req, res) {
        console.log("MQTT_DeviceList");
        try {
            var client = new cassandra.Client({
                contactPoints: ['192.168.4.186:9042', '192.168.4.166:9042'], queryOptions: {
                    consistency: cassandra.types.consistencies.local_quorum
                }, keyspace: 'kafka_demo'
            });
            client.connect(function (err) {
                if (err) {
                    console.log("Error in db Connection...............");
                }
                else {
                    console.log("cassnadra db is  Connected....");
                }
                // console.log(req.body[0]);
                var query = "select * from kafka_demo.mqttconnector_info";
                client.execute(query, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(result);
                    }

                });

            });

        } catch (e) {
            console.log("Error" + "\t" + "MQTT_DeviceList" + e.message);
            res.send(e.message);
        }

    });
    app.get("/Topics_Mqtt", function (req, res) {

        try {
            var client = new cassandra.Client({
                contactPoints: ['192.168.4.186:9042', '192.168.4.166:9042'], queryOptions: {
                    consistency: cassandra.types.consistencies.local_quorum
                }, keyspace: 'kafka_demo'
            });
            client.connect(function (err) {
                if (err) {
                    console.log("Error in db Connection...............");
                }
                else {
                    console.log("cassnadra db is  Connected....");
                }
                // console.log(req.body[0]);
                var query = "select topic from kafka_demo.mqttconnector_info";
                client.execute(query, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(result);
                    }

                });

            });

        } catch (e) {
            console.log("Error" + "\t" + "MQTT_DeviceList" + e.message);
            res.send(e.message);
        }

    });


    /************************************************************************************end MQTT************************************************************************************/




    /************************************************************************************SOAP Services************************************************************************************/

    var path1;
    app.post("/SaveWSDLfile", function (req, res) {
        try {

            if (req.session.authenticated === true) {

                var myObject = new Object();
                console.log(req.body.formData);
                var url = __dirname + "/public/Analytics/UploadWSDLFiles/" + "" + req.body.formData + "";
                fs.writeFile(url, req.body.formData, function (err, result) {
                    if (err) {
                        return console.log(err);
                        res.send(false);
                    }
                    else {
                        // res.send(result);
                    }
                });

                var form = new formidable.IncomingForm();

                form.multiples = true;

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/public/Analytics/UploadWSDLFiles');

                path1 = form.uploadDir;



                form.parse(req, function (err, fields, files) {

                    path1 = path.join(path1, files.file.name);

                    console.log("path1" + path1);

                    fs.rename(files.file.path, path.join(form.uploadDir, files.file.name), function (err) {
                        if (err) {
                            res.send(err.message);
                        }
                        else {
                            var options = {};
                            var url = 'http://www.webservicex.net/stockquote.asmx?WSDL';
                            var WSDL_arry = [];


                            WSDL.open(path1, options,
                              function (err, wsdl) {
                                  // You should be able to get to any information of this WSDL from this object. Traverse
                                  // the WSDL tree to get  bindings, operations, services, portTypes, messages,
                                  // parts, and XSD elements/Attributes.
                                  console.log(wsdl);
                                  var WSDL_service = wsdl.definitions;

                                  var WSDL_ser = WSDL_service;
                                  WSDL_arry.push(wsdl.definitions);
                                  var serialized = CircularJSON.stringify(WSDL_arry);

                                  // console.log(serialized);
                                  res.json(serialized);
                              });

                            //soap.createClient(url, options, function (err, client) {


                            //    var description = client.describe();
                            //    var serialized = CircularJSON.stringify(description);

                            //    console.log(serialized);
                            //    res.json(serialized);
                            //});
                        }
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
    app.post("/WSDL_MethodSelect", function (req, res) {

        try {

            var url = 'http://www.webservicex.net/stockquote.asmx?WSDL';
            var options = {};
            var WSDL_arry_res = [];
            var MyWSDL_Port = [];
            soap.createClient(path1, options, function (err, client) {
                var Service_Name = req.body.parents;
                var MethodName = req.body.seletednode;
                var description = client.describe();
                console.log(description);
                console.log(Service_Name + "_" + MethodName);
                var method = description['' + Service_Name[0] + ''];
                console.log(method);
                for (var key in method) {
                    MyWSDL_Port.push(key);
                    WSDL_arry_res.push(method[key]['' + MethodName + ''].input.body);
                }

                res.send({ description: WSDL_arry_res, Service_Name_resp: Service_Name[0], MethodName: MethodName, MyWSDL_Port: MyWSDL_Port });
            });

        } catch (e) {
            console.log("Error" + "\t" + "WSDL_MethodSelect" + e);
        }


    });
    app.post("/Response_SOAP", function (req, res) {


        var MyTxt_Result_Requset = req.body.MyTxt_Result;
        var ReqName_req = req.body.ReqName;
        var requestArgs = req.body.ReqName2[0];

        console.log("requestArgs" + "\t" + requestArgs);
        var options = {};
        soap.createClient(path1, options, function (err, client) {
            try {
                var method = client['' + req.body.serviceName + '']['' + req.body.PortName + '']['' + req.body.methodname + ''];
                //var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
                method(requestArgs, function (err, result, envelope, soapHeader) {
                    if (!err) {
                        res.send(result);
                    }
                    else {
                        res.send(false);
                    }

                });
            } catch (e) {
                console.log("Error" + "\t" + e.message);
                res.send(e.message);
            }
        });

    });

    /************************************************************************************ Start OnlineUrl Data************************************************************************************/
    app.post("/WSDL_MethodSelectFromUrl", function (req, res) {

        try {

            var options = {};
            var WSDL_arry_res = [];
            var MyWSDL_Port = [];
            soap.createClient(url, options, function (err, client) {
                var Service_Name = req.body.parents;
                var MethodName = req.body.seletednode;
                var description = client.describe();
                // console.log("ASD" + description);
                console.log(Service_Name + "_" + MethodName);
                var method = description['' + Service_Name[0] + ''];
                // console.log(method);
                for (var key in method) {
                    MyWSDL_Port.push(key);
                    WSDL_arry_res.push(method[key]['' + MethodName + ''].input.body);
                }

                res.send({ description: WSDL_arry_res, Service_Name_resp: Service_Name[0], MethodName: MethodName, MyWSDL_Port: MyWSDL_Port });
            });

        } catch (e) {
            console.log("Error" + "\t" + "WSDL_MethodSelect" + e);
        }


    });

    var url;
    app.post("/GetResponseform_WSDLUrl", function (req, res) {

        try {
            if (req.session.authenticated === true) {


                url = req.body.myurl;
                var options = {};
                var WSDL_arry = [];
                WSDL.open(url, options,
                                 function (err, wsdl) {
                                     console.log(wsdl);

                                     if (!err) {

                                         var WSDL_service = wsdl.definitions;

                                         var WSDL_ser = WSDL_service;
                                         WSDL_arry.push(wsdl.definitions);
                                         var serialized = CircularJSON.stringify(WSDL_arry);

                                         res.json(serialized);
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
            console.log("Error" + "\t" + e.message);
            res.send(e.message);
        }

    });

    app.post("/Response_SOAP_Url", function (req, res) {

        if (req.session.authenticated === true) {

            var MyTxt_Result_Requset = req.body.MyTxt_Result;
            var ReqName_req = req.body.ReqName;
            var requestArgs = req.body.ReqName2[0];
            var options = {};
            console.log("requestArgs" + requestArgs);

            var Response = req.body.Path_Url_Speration;
            // console.log("path1" + req.body.Path_Url_Speration);

            if (Response == 'frompath') {

                soap.createClient(path1, options, function (err, client) {
                    try {
                        var method = client['' + req.body.serviceName + '']['' + req.body.PortName + '']['' + req.body.methodname + ''];
                        //var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
                        method(requestArgs, function (err, result, envelope, soapHeader) {
                            if (!err) {
                                res.send(result);
                            }
                            else {
                                res.send(false);
                            }

                        });
                    } catch (e) {
                        console.log("Error" + "\t" + e.message);
                        res.send(false);
                    }
                });
            }
            else {
                soap.createClient(url, options, function (err, client) {
                    try {
                        var method = client['' + req.body.serviceName + '']['' + req.body.PortName + '']['' + req.body.methodname + ''];
                        //var method = client['StockQuote']['StockQuoteSoap']['GetQuote'];
                        method(requestArgs, function (err, result, envelope, soapHeader) {
                            if (!err) {
                                res.send(result);
                            }
                            else {
                                res.send(false);
                            }

                        });
                    } catch (e) {
                        console.log("Error" + "\t" + e.message);
                        res.send(e.message);
                    }
                });
            }
        }

        else {

            res.send({ "isauthenticated": false });

        }
    });

    /************************************************************************************end OnlineUrl  Data************************************************************************************/



    /************************************************************************************ SOAP Services************************************************************************************/






    /*********************************************************************************** Socket Operations *****************************************************************************/


    socket.on('request', function (request) {

        // console.log("welcome");
        var connection = request.accept(null, request.origin);
        connection.on('message', function (message) {
            // console.log("selectedTopic" + message.utf8Data);
            var str = message.utf8Data;
            var res = str.split("_");

            if (res[0] == "Kafka") {
                var Topic = res[1];
                var client = new kafka.Client('192.168.4.182:2181');
                //console.log("client.connected"+client.connected);

                var consumer = new Consumer(client, [{ topic: Topic, partition: 0 }],

                        { autoCommit: false });

                consumer.on('message', function (message) {

                    console.log(message.value);

                    //socket.broadcast.emit('msgvalue', message.value);
                    //socket.emit('msgvalue', message.value);

                    connection.sendUTF(message.value);
                });


            }
            else {
                var Topic = message.utf8Data;
                var client = mqtt.connect('mqtt://192.168.4.112', { username: 'mac', password: 'admin' });

                console.log("client.connected" + client.connected);

                // if (client.connected == false || client.connected == "false") {

                // res.send();
                // console.log("message.toString()" + message.toString());
                // connection.sendUTF(message.toString());
                // }
                // else {
                client.on('connect', function () {
                    client.subscribe(Topic);
                });
                client.on('error', function () {
                    console.log("ERROR")
                    client.end()
                });
                client.on('offline', function () {
                    console.log("offline");
                    connection.sendUTF("offline");

                });
                client.on('message', function (topic, message) {
                    if (topic === Topic) {

                        //socket.emit('msgvalue', message.toString());
                        connection.sendUTF(message.toString());
                        // connection.close();
                    }
                });
                //}

            }
            connection.on('close', function (connection) {
                console.log('connection closed');
            });
            //setTimeout(function () {
            //    connection.sendUTF('this is a websocket example');
            //}, 1000);
        });




    });

    /********************************************************************* Socket Operations End ***************************************************************************/

    //// ************************************* Analytics Server Code ********************************************//
    //***********************************************************************************************************//

    //***********************************************Divya***************************************************
    //*****************************************SQL Server in POSTGRE*****************************************

    /*
     * @Summary      : Method to get Existing SQL Connections
     * Function Code : GetSqlConnList
     */
    app.get('/SqlConnection/GetSqlConnList', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Select connectionname as "ConnectionName",id as "Id" from "Analytics_M_Connections" where username=$1 and connectiontype=$2';
                postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, 'Sql Connection'], function (err, result) {
                    if (!err) {
                        res.json(result);
                    }
                    else {
                        console.log("Error Getting Data in GetSqlConnList");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetSqlConnList: " + ex.message);
            res.send({ "error": "Exception in GetSqlConnList: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get Databases List for selected SQL Connection
     * Params        : SQL Connection Data
     * Function Code : GetDatabaseList
     */
    app.post('/SqlConnection/GetDatabaseList', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var json = JSON.parse(req.body.Conndata);
                var config = '';
                var sql_Type = json[0]["sql_Type"];
                if (sql_Type == "Sql") {
                    config = {
                        user: json[0]["User"],
                        password: json[0]["Password"],
                        server: json[0]["ServerName"],
                        port: json[0]["PortNumber"],
                        options: {
                            encrypt: true
                        }
                    };
                }
                else {
                    config = {
                        server: json[0]["ServerName"],
                        port: json[0]["PortNumber"],
                        options: {
                            encrypt: true
                        }
                    };
                }

                sql.close();
                sql.connect(config).then(function () {
                    new sql.Request().query('Select name from sys.databases').then(function (recordset) {
                        res.send({ "Result": recordset.recordset });
                    }).catch(function (err) {
                        console.log("Error Getting Data in GetDatabaseList");
                        res.send({ "error": err.message });
                    });
                }).catch(function (err) {
                    console.log("Error Connecting to SQL in GetDatabaseList");
                    res.send({ "error": err.message });
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetDatabaseList: " + ex.message);
            res.send({ "error": "Exception in GetDatabaseList: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to save SQL Connection
     * Params        : SQL Connection Data
     * Function Code : SaveSql_Connection
     */
    app.post('/SqlConnection/SaveSql_Connection', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                if (req.body[0].operation == "save") {
                    var query = 'Select Count(*) from "Analytics_M_Connections" where connectionname=$1 and connectiontype=$2';
                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].ConnectionName, 'Sql Connection'], function (err, result) {
                        if (!err) {
                            if (result[0].count > 0) {
                                res.send({ "Exists": "Duplicate" });
                            }
                            else {
                                query = 'Insert into public."Analytics_M_Connections"(connectas, connectionname, connectiontype, databasename, password, portnumber,';
                                query += 'servername, service, sqltype, userid, username, "Role")values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
                                var Data = [req.body[0].Connectas, req.body[0].ConnectionName, req.body[0].ConnectionType, req.body[0].databasename, req.body[0].Password, req.body[0].PortNumber, req.body[0].ServerName, '', req.body[0].sqlType, req.body[0].Userid, req.session.myemail, req.session.RoleId];

                                postgresqlDBManager.PSQL_InsertData(query, Data, function (err, response) {
                                    if (!err) {
                                        query = 'Select connectionname as "ConnectionName",id as "Id" from "Analytics_M_Connections" where username=$1 and connectiontype=$2';
                                        postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, 'Sql Connection'], function (err, result) {
                                            if (!err) {
                                                res.json(result);
                                            }
                                            else {
                                                console.log("Error Getting Data in SaveSql_Connection");
                                                res.send({ "error": err.message });
                                            }
                                        });
                                    }
                                    else {
                                        console.log("Error Inserting Data in SaveSql_Connection");
                                        res.send({ "error": err.message });
                                    }
                                });
                            }
                        }
                        else {
                            console.log("Error Getting Data in SaveSql_Connection");
                            res.send({ "error": err.message });
                        }
                    });
                }
                else {
                    var query = 'Select Count(*) from "Analytics_M_Connections" where connectionname=$1 and connectiontype=$2 and id!=$3';
                    postgresqlDBManager.PSQL_getdata(query, [req.body[0].ConnectionName, 'Sql Connection', req.body[0].operation], function (err, result) {
                        if (!err) {
                            if (result[0].count > 0) {
                                res.send({ "Exists": "Duplicate" });
                            }
                            else {
                                query = 'Update public."Analytics_M_Connections" Set connectas=$1, connectionname=$2, connectiontype=$3, databasename=$4, password=$5, portnumber=$6, servername=$7, service=$8, sqltype=$9, userid=$10, username=$11, "Role"=$12 where id=$13;'
                                var Data;
                                if (req.body[0].sqlType == "Sql") {
                                    Data = [req.body[0].Connectas, req.body[0].ConnectionName, req.body[0].ConnectionType, req.body[0].databasename, req.body[0].Password, req.body[0].PortNumber, req.body[0].ServerName, '', req.body[0].sqlType, req.body[0].Userid, req.session.myemail, req.session.RoleId, req.body[0].operation];
                                }
                                else {
                                    Data = [req.body[0].Connectas, req.body[0].ConnectionName, req.body[0].ConnectionType, req.body[0].databasename, '', req.body[0].PortNumber, req.body[0].ServerName, '', req.body[0].sqlType, '', req.session.myemail, req.session.RoleId, req.body[0].operation];
                                }

                                postgresqlDBManager.PSQL_InsertData(query, Data, function (err, response) {
                                    if (!err) {
                                        query = 'Select connectionname as "ConnectionName",id as "Id" from "Analytics_M_Connections" where username=$1 and connectiontype=$2';
                                        postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, 'Sql Connection'], function (err, result) {
                                            if (!err) {
                                                res.json(result);
                                            }
                                            else {
                                                console.log("Error Getting Data in SaveSql_Connection");
                                                res.send({ "error": err.message });
                                            }
                                        });
                                    }
                                    else {
                                        console.log("Error Updating Data in SaveSql_Connection");
                                        res.send({ "error": err.message });
                                    }
                                });
                            }
                        }
                        else {
                            console.log("Error Getting Data in SaveSql_Connection");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in SaveSql_Connection: " + ex.message);
            res.send({ "error": "Exception in SaveSql_Connection: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get details of selected SQL Connection
     * Params        : Connection Id
     * Function Code : EditSql_Connection
     */
    app.post('/SqlConnection/EditSql_Connection', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [req.body.Edit_Conn], function (err, result) {
                    if (!err) {
                        res.send({ "Result": result });
                    }
                    else {
                        console.log("Error Getting Data in EditSql_Connection");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in EditSql_Connection: " + ex.message);
            res.send({ "error": "Exception in EditSql_Connection: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Delete SQL Connection
     * Params        : Connection Id
     * Function Code : RemoveSql_Connection
     */
    app.post('/SqlConnection/RemoveSql_Connection', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Delete from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_InsertData(query, [req.body.ConnId], function (err, response) {
                    if (!err) {
                        res.send("Deleted");
                    }
                    else {
                        console.log("Error Deleting Connection in RemoveSql_Connection");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in RemoveSql_Connection: " + ex.message);
            res.send({ "error": "Exception in RemoveSql_Connection: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Create Stored Procedure for the selected SQL Connection
     * Params        : SQL Connection Id and Stored Procedure Query
     * Function Code : SPobjCreate_Query
     */
    app.post('/SqlConnection/SPobjCreate_Query', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var json = JSON.parse(req.body.SPobjCreate_Query)

                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [json[0].ConnIdhidespedit], function (err, result) {
                    if (!err) {
                        var dbname = result[0].databasename;
                        var config = '';
                        var sql_Type = result[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result[0].userid,
                                password: result[0].password,
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        sql.close();
                        sql.connect(config).then(function () {
                            new sql.Request().query(json[0].SPCreateQuery).then(function (recordset) {
                                res.status(200).send({ "Result": "Stored Procedure has been created Successfully!!" });
                            }).catch(function (err) {
                                console.log("Error Creating Stored Procedure in SPobjCreate_Query");
                                res.send({ "error": err.message });
                            });
                        }).catch(function (err) {
                            console.log("Error Connecting to SQL in SPobjCreate_Query");
                            res.send({ "error": err.message });
                        });
                    }
                    else {
                        console.log("Error Getting Data from Connections in SPobjCreate_Query");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in SPobjCreate_Query: " + ex.message);
            res.send({ "error": "Exception in SPobjCreate_Query: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get available/already added Stored Procedures of selected SQL Connection
     * Params        : Connection Id
     * Function Code : GetSqlAvailSP
     */
    app.post('/SqlConnection/GetSqlAvailSP', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Select "Selected_sp" as "name", "Checked" as "_checked", "Id" as id from "DataConnectors_M_Sqlconn" where "ConnectionId"=$1';
                postgresqlDBManager.PSQL_getdata(query, [req.body.selectedConnId], function (err, result) {
                    if (!err) {
                        res.send({ "Result": result });
                    }
                    else {
                        console.log("Error Getting Data in GetSqlAvailSP");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetSqlAvailSP: " + ex.message);
            res.send({ "error": "Exception in GetSqlAvailSP: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get all Stored Procedures of selected SQL Connection
     * Params        : Connection Id
     * Function Code : GetSqlSPList
     */
    app.post('/SqlConnection/GetSqlSPList', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [req.body.selectedConnId], function (err, result) {
                    if (!err) {
                        var config = '';
                        var sql_Type = result[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result[0].userid,
                                password: result[0].password,
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        sql.close();
                        sql.connect(config).then(function () {
                            new sql.Request().query("Select SPECIFIC_NAME as 'name',(Select Convert(Bit, 'false')) as '_checked' from " + result[0].databasename + ".information_schema.routines").then(function (recordset) {
                                res.send(recordset.recordset);
                            }).catch(function (err) {
                                console.log("Error Getting Stored Procedures in GetSqlSPList");
                                res.send({ "error": err.message });
                            });
                        }).catch(function (err) {
                            console.log("Error Connecting to SQL in GetSqlSPList");
                            res.send({ "error": err.message });
                        });
                    }
                    else {
                        console.log("Error Getting Data in GetSqlSPList");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetSqlAvailSP: " + ex.message);
            res.send({ "error": "Exception in GetSqlAvailSP: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to add Selected Stored Procedure to POSTGRE
     * Params        : Connection Id and Selected Stored Procedure
     * Function Code : SaveSql_SPConnection
     */
    app.post('/SqlConnection/SaveSql_SPConnection', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Insert into "DataConnectors_M_Sqlconn"("ConnectionId", "Selected_sp", "Checked")values($1,$2,$3)';
                postgresqlDBManager.PSQL_InsertData(query, [req.body[0].ConnectionId, req.body[0].Selected_SP, req.body[0].checked], function (err, response) {
                    if (!err) {
                        query = 'Select "Selected_sp" as "name", "Checked" as "_checked", "Id" as id from "DataConnectors_M_Sqlconn" where "ConnectionId"=$1';
                        postgresqlDBManager.PSQL_getdata(query, [req.body[0].ConnectionId], function (err, result) {
                            if (!err) {
                                res.send({ "Result": result });
                            }
                            else {
                                console.log("Error Getting Data in SaveSql_SPConnection");
                                res.send({ "error": err.message });
                            }
                        });
                    }
                    else {
                        console.log("Error Inserting Data in SaveSql_SPConnection");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in SaveSql_SPConnection: " + ex.message);
            res.send({ "error": "Exception in SaveSql_SPConnection: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to remove Selected Stored Procedure from POSTGRE
     * Params        : Connection Id and Selected Stored Procedure
     * Function Code : RemoveSql_SPConnection
     */
    app.post('/SqlConnection/RemoveSql_SPConnection', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var data1 = JSON.parse(req.body.Remove_ConnSPdata);

                var query = 'Delete from "DataConnectors_M_Sqlconn" where "ConnectionId"=$1 and "Selected_sp"=$2';
                postgresqlDBManager.PSQL_InsertData(query, [data1[0].ConnIdhide, data1[0].SelectedSPS], function (err, response) {
                    if (!err) {
                        query = 'Select "Selected_sp" as "name", "Checked" as "_checked", "Id" as id from "DataConnectors_M_Sqlconn" where "ConnectionId"=$1';
                        postgresqlDBManager.PSQL_getdata(query, [data1[0].ConnIdhide], function (err, result) {
                            if (!err) {
                                res.send({ "Result": result });
                            }
                            else {
                                console.log("Error Getting Data in RemoveSql_SPConnection");
                                res.send({ "error": err.message });
                            }
                        });
                    }
                    else {
                        console.log("Error Deleting Data in RemoveSql_SPConnection");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in RemoveSql_SPConnection: " + ex.message);
            res.send({ "error": "Exception in RemoveSql_SPConnection: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get Selected Stored Procedure Details
     * Params        : Connection Id and Stored Procedure Name
     * Function Code : GET_SPdtails
     */
    app.post('/SqlConnection/GET_SPdtails', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var resarray = JSON.parse(req.body.GET_SPdtail);
                var StorePDname = resarray[0]["StorePDname"];
                var ConnectionId = resarray[0]["SelcSPId"];

                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [ConnectionId], function (err, result) {
                    if (!err) {
                        var dbname = result[0].databasename;
                        var config = '';
                        var sql_Type = result[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result[0].userid,
                                password: result[0].password,
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        query = 'Select "ConnectionId", "Selspname", "SelParamname" as selparamname, "UserName", "Connname", "DataSource", "DataType", "Id", "ParamDefault" as paramdefault from "DataConnectors_M_Paramsconfig"';
                        query += ' where "ConnectionId"=$1 and "Selspname"=$2 and "UserName"=$3';
                        postgresqlDBManager.PSQL_getdata(query, [ConnectionId, StorePDname, req.session.myemail], function (err, result) {
                            if (!err) {
                                if (result.length > 0) {
                                    sql.close();
                                    sql.connect(config).then(function () {
                                        var request = new sql.Request();
                                        var Recursive = function (x) {
                                            if (x < result.length) {
                                                request.input((result[x].selparamname).replace('@', ''), result[x].paramdefault);
                                                if (x == result.length - 1) {
                                                    request.execute(StorePDname, function (err, recordsets, returnValue) {
                                                        if (err) {
                                                            console.log("Error Getting Data in GET_SPdtails");
                                                            res.send({ "error": err.message });
                                                        }
                                                        else {
                                                            res.send({ "ResponseData": recordsets.recordset });
                                                        }
                                                    });
                                                }
                                                Recursive(x + 1);
                                            }
                                        }
                                        Recursive(0);
                                    });
                                }
                                else {
                                    sql.close();
                                    sql.connect(config).then(function () {
                                        new sql.Request().query("select PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from information_schema.parameters where specific_name='" + StorePDname + "' and SPECIFIC_CATALOG='" + dbname + "'").then(function (recordset) {
                                            if (err) {
                                                console.log("Error Getting Data in GET_SPdtails");
                                                res.send({ "error": err.message });
                                            }
                                            else {
                                                if (recordset.recordset.length > 0) {
                                                    res.send({ "ResponseData": "Show Param Configure" });
                                                }
                                                else {
                                                    sql.close();
                                                    sql.connect(config).then(function () {
                                                        var request = new sql.Request();
                                                        request.execute(StorePDname, function (err, recordsets, returnValue) {
                                                            if (err) {
                                                                console.log("Error Executing Stored Procedure in GET_SPdtails");
                                                                res.send({ "error": err.message });
                                                            }
                                                            else {
                                                                res.send({ "Result": recordsets.recordset });
                                                            }
                                                        });
                                                    });
                                                }
                                            }
                                        }).catch(function (err) {
                                            console.log("Error Getting Data in GET_SPdtails");
                                            res.send({ "error": err.message });
                                        });
                                    }).catch(function (err) {
                                        console.log("Error Connecting to SQL in GET_SPdtails");
                                        res.send({ "error": err.message });
                                    });
                                }
                            }
                            else {
                                console.log("Error Getting Data in GET_SPdtails");
                                res.send({ "error": err.message });
                            }
                        });
                    }
                    else {
                        console.log("Error Getting Data from Connections in GET_SPdtails");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GET_SPdtails: " + ex.message);
            res.send({ "error": "Exception in GET_SPdtails: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get Selected Stored Procedure Query
     * Params        : Connection Id and Stored Procedure Name
     * Function Code : Get_SPforEdit
     */
    app.post('/SqlConnection/Get_SPforEdit', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var data = JSON.parse(req.body.GetSPforedit);
                var SelectedSPName = data[0].Editspitem;

                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [data[0].ConnIdhidespedit], function (err, result) {
                    if (!err) {
                        var dbname = result[0].databasename;
                        var config = '';
                        var sql_Type = result[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result[0].userid,
                                password: result[0].password,
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        sql.close();
                        sql.connect(config).then(function () {
                            new sql.Request().query("Select definition from sys.sql_modules where [object_id] = OBJECT_ID('" + SelectedSPName + "')", function (err, recordset) {
                                if (err) {
                                    console.log("Error Getting Stored Procedures in Get_SPforEdit");
                                    res.send({ "error": err.message });
                                }
                                else {
                                    res.send({ "Result": recordset.recordset });
                                }
                            });
                        });
                    }
                    else {
                        console.log("Error Getting Data from Connections in Get_SPforEdit");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in Get_SPforEdit: " + ex.message);
            res.send({ "error": "Exception in Get_SPforEdit: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to update Selected Stored Procedure Query
     * Params        : Connection Id and Stored Procedure Query
     * Function Code : SPobjEdit_Query
     */
    app.post('/SqlConnection/SPobjEdit_Query', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var data = JSON.parse(req.body.SPobjEdit_Query);
                var query = 'Select * from "Analytics_M_Connections" where id=$1';
                postgresqlDBManager.PSQL_getdata(query, [data[0].ConnIdhidespedit], function (err, result) {
                    if (!err) {
                        var dbname = result[0].databasename;
                        var config = '';
                        var sql_Type = result[0].sqltype;
                        if (sql_Type == "Sql") {
                            config = {
                                user: result[0].userid,
                                password: result[0].password,
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }
                        else {
                            config = {
                                server: result[0].servername,
                                port: result[0].portnumber,
                                database: result[0].databasename,
                                options: {
                                    encrypt: true
                                }
                            };
                        }

                        sql.close();
                        sql.connect(config).then(function () {
                            new sql.Request().query(data[0].SPEditQuery, function (err, recordset) {
                                if (err) {
                                    console.log("Error Updating Stored Procedure in SPobjEdit_Query");
                                    res.send({ "error": err.message });
                                }
                                else {
                                    res.send({ "Result": "Stored Procedure Successfully Updated" });
                                }
                            });
                        });
                    }
                    else {
                        console.log("Error Getting Data from Connections in SPobjEdit_Query");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in SPobjEdit_Query: " + ex.message);
            res.send({ "error": "Exception in SPobjEdit_Query: " + ex.message });
        }
    });

    //******************************************Configure Parameters*****************************************

    /*
     * @Summary      : Method to Get SQL Connections List
     * Params        : Connection Type like SQL or Cassandra
     * Function Code : GetConnList
     */
    app.post('/CreateParameter/GetConnList', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var ConnectionType = req.body.Get_Connlist;

                if (ConnectionType == "Sql Connection") {
                    var query = 'Select connectionname as "ConnectionName",id as "Id" from "Analytics_M_Connections" where username=$1 and connectiontype=$2';
                    postgresqlDBManager.PSQL_getdata(query, [req.session.myemail, 'Sql Connection'], function (err, result) {
                        if (!err) {
                            res.send({ "Result": result });
                        }
                        else {
                            console.log("Error Getting Data in GetConnList");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetConnList: " + ex.message);
            res.send({ "error": "Exception in GetConnList: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Get available Stored Procedures to the Selected Connection
     * Params        : Selected Connection Details
     * Function Code : GetAvailSP
     */
    app.post('/CreateParameter/GetAvailSP', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var json = JSON.parse(req.body.SelectedConn);
                var datasource = json[0].datasource;
                var SelectedSPList = [];

                if (datasource == "Sql Connection") {
                    var query = 'Select * from "Analytics_M_Connections" where id=$1';
                    postgresqlDBManager.PSQL_getdata(query, [json[0].Id], function (err, result) {
                        if (!err) {
                            var dbname = result[0].databasename;
                            var config = '';
                            var sql_Type = result[0].sqltype;
                            if (sql_Type == "Sql") {
                                config = {
                                    user: result[0].userid,
                                    password: result[0].password,
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }
                            else {
                                config = {
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }

                            query = 'Select "Selected_sp" as selected_sp from "DataConnectors_M_Sqlconn" where "ConnectionId"=$1';
                            postgresqlDBManager.PSQL_getdata(query, [json[0].Id], function (err, result) {
                                if (!err) {
                                    if (result.length > 0) {
                                        var ProcessItem = function (i) {
                                            if (i < result.length) {
                                                sql.close();
                                                sql.connect(config).then(function () {
                                                    new sql.Request().query("Select PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from information_schema.parameters where specific_name='" + result[i].selected_sp + "' and SPECIFIC_CATALOG='" + dbname + "'").then(function (recordset) {
                                                        if (recordset.recordset.length > 0) {
                                                            SelectedSPList.push({ "Selected_SP": result[i].selected_sp });
                                                        }
                                                        if (i == result.length - 1) {
                                                            res.status(200).send({ "ParamsList": SelectedSPList });
                                                        }
                                                        ProcessItem(i + 1);
                                                    }).catch(function (err) {
                                                        console.log("Error Getting Parameters Data in GetAvailSP");
                                                        res.send({ "error": err.message });
                                                    });
                                                }).catch(function (err) {
                                                    console.log("Error Connecting to SQL in GetAvailSP");
                                                    res.send({ "error": err.message });
                                                });
                                            }
                                        }
                                        ProcessItem(0);
                                    }
                                    else {
                                        res.status(200).json(SelectedSPList);
                                    }
                                }
                                else {
                                    console.log("Error Getting Data from DataConnectors_M_Sqlconn in GetAvailSP");
                                    res.send({ "error": err.message });
                                }
                            });
                        }
                        else {
                            console.log("Error Getting Data in GetAvailSP");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetAvailSP: " + ex.message);
            res.send({ "error": "Exception in GetAvailSP: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Get Parameters of selected Stored Procedure
     * Params        : Selected Stored Procedure Details
     * Function Code : GetAvailSPParams
     */
    app.post('/CreateParameter/GetAvailSPParams', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var json = JSON.parse(req.body.SelectedSP);
                var ConnectionType = json[0].datasource;

                if (ConnectionType == "Sql Connection") {
                    var query = 'Select * from "Analytics_M_Connections" where id=$1';
                    postgresqlDBManager.PSQL_getdata(query, [json[0].Id], function (err, result) {
                        if (!err) {
                            var dbname = result[0].databasename;
                            var config = '';
                            var sql_Type = result[0].sqltype;
                            if (sql_Type == "Sql") {
                                config = {
                                    user: result[0].userid,
                                    password: result[0].password,
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }
                            else {
                                config = {
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }

                            query = 'Select * from "DataConnectors_M_Paramsconfig" where "ConnectionId"=$1 and "Selspname"=$2 and "UserName"=$3';
                            postgresqlDBManager.PSQL_getdata(query, [json[0].Id, json[0].spname, req.session.myemail], function (err, result) {
                                if (!err) {
                                    if (result.length > 0) {
                                        query = 'Select "SelParamname" as "PARAMETER_NAME","DataType" as "DATA_TYPE","ParamDefault" as "Value" from "DataConnectors_M_Paramsconfig" where "ConnectionId"=$1 and "Selspname"=$2 and "UserName"=$3';
                                        postgresqlDBManager.PSQL_getdata(query, [json[0].Id, json[0].spname, req.session.myemail], function (err, result) {
                                            if (!err) {
                                                res.send({ "ParamsList": result });
                                            }
                                            else {
                                                console.log("Error Getting Data from DataConnectors_M_Paramsconfig in GetAvailSPParams");
                                                res.send({ "error": err.message });
                                            }
                                        });
                                    }
                                    else {
                                        sql.close();
                                        sql.connect(config).then(function () {
                                            new sql.Request().query("Select PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from information_schema.parameters where specific_name='" + json[0].spname + "' and SPECIFIC_CATALOG='" + dbname + "'").then(function (recordset) {
                                                res.send({ "ParamsList": recordset.recordset });
                                            }).catch(function (err) {
                                                console.log("Error Getting Data from information_schema in GetAvailSPParams");
                                                res.send({ "error": err.message });
                                            });
                                        }).catch(function (err) {
                                            console.log("Error Connecting to SQL in GetAvailSPParams");
                                            res.send({ "error": err.message });
                                        });
                                    }
                                }
                                else {
                                    console.log("Error Getting Data from DataConnectors_M_Sqlconn in GetAvailSPParams");
                                    res.send({ "error": err.message });
                                }
                            });
                        }
                        else {
                            console.log("Error Getting Data in GetAvailSPParams");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetAvailSPParams: " + ex.message);
            res.send({ "error": "Exception in GetAvailSPParams: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Configure Parameters to the selected Stored Procedure
     * Params        : Selected Stored Procedure and Parameters Details
     * Function Code : Save_paramdefault
     */
    app.post('/CreateParameter/Save_paramdefault', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var json = JSON.parse(req.body.Save_paramobj);

                var datasource = json[0].param_dsname;
                var paramsjson = json[0].param_data;
                var ConName = json[0].param_connname;
                var spname = json[0].param_spname;
                var ConnId = json[0].param_connid;
                var paramsarray = JSON.parse(json[0].param_data);
                var paramcnt = paramsarray.length;

                if (datasource != "QueryBuilder") {
                    query = 'Select "ConnectionId" from "DataConnectors_M_Paramsconfig" where "ConnectionId"=$1 and "Selspname"=$2 and "UserName"=$3';
                    postgresqlDBManager.PSQL_getdata(query, [ConnId, spname, req.session.myemail], function (err, result) {
                        if (!err) {
                            var InsertQuery = function (x) {
                                if (x < paramsarray.length) {
                                    var Data;
                                    if (result.length > 0) {
                                        query = 'Update "DataConnectors_M_Paramsconfig" set "ParamDefault"=$1 where "ConnectionId"=$2 and "SelParamname"=$3 and "Selspname"=$4 and "UserName"=$5';
                                        Data = [paramsarray[x].Value, ConnId, paramsarray[x].PARAMETER_NAME, spname, req.session.myemail];
                                    }
                                    else {
                                        query = 'Insert into public."DataConnectors_M_Paramsconfig"("ConnectionId", "Connname", "DataSource", "DataType", "ParamDefault", "SelParamname", "Selspname", "UserName")values($1, $2, $3, $4, $5, $6, $7, $8)';
                                        Data = [ConnId, ConName, datasource, paramsarray[x].DATA_TYPE, paramsarray[x].Value, paramsarray[x].PARAMETER_NAME, spname, req.session.myemail];
                                    }

                                    postgresqlDBManager.PSQL_InsertData(query, Data, function (err, response) {
                                        if (!err) {
                                            InsertQuery(x + 1);
                                            if (x == paramsarray.length - 1) {
                                                res.send({ "Success": "Parameters Configured Successfully!!" });
                                            }
                                        }
                                        else {
                                            console.log("Error Inserting/Updating Data in Save_paramdefault");
                                            res.send({ "error": err.message });
                                        }
                                    });
                                }
                            }
                            InsertQuery(0);
                        }
                        else {
                            console.log("Error Getting Data in Save_paramdefault");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in Save_paramdefault: " + ex.message);
            res.send({ "error": "Exception in Save_paramdefault: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to Get Data of the Stored Procedure Configured Parameters
     * Params        : Selected Stored Procedure and Parameters Details
     * Function Code : GET_paramdata
     */
    app.post('/CreateParameter/GET_paramdata', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var resarray = JSON.parse(req.body.Paramdata_obj);
                var SelectedSPName = resarray[0]["param_spname"];
                var Parameters = resarray[0]["param_data"];
                var ParameterArr = JSON.parse(resarray[0]["param_data"]);
                var ConnectionType = resarray[0]["param_dsname"];
                var ConnectionId = resarray[0]["param_connid"];

                if (ConnectionType == "Sql Connection") {
                    var query = 'Select * from "Analytics_M_Connections" where id=$1';
                    postgresqlDBManager.PSQL_getdata(query, [ConnectionId], function (err, result) {
                        if (!err) {
                            var dbname = result[0].databasename;
                            var config = '';
                            var sql_Type = result[0].sqltype;
                            if (sql_Type == "Sql") {
                                config = {
                                    user: result[0].userid,
                                    password: result[0].password,
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }
                            else {
                                config = {
                                    server: result[0].servername,
                                    port: result[0].portnumber,
                                    database: result[0].databasename,
                                    options: {
                                        encrypt: true
                                    }
                                };
                            }

                            sql.close();
                            sql.connect(config).then(function () {
                                var request = new sql.Request();
                                var Recursive = function (x) {
                                    if (x < ParameterArr.length) {
                                        request.input((ParameterArr[x].PARAMETER_NAME).replace('@', ''), ParameterArr[x].Value);
                                        if (x == ParameterArr.length - 1) {
                                            request.execute(SelectedSPName, function (err, recordsets, returnValue) {
                                                if (err) {
                                                    console.log("Error Executing Stored Procedure in GET_paramdata");
                                                    res.send({ "error": err.message });
                                                }
                                                else {
                                                    console.log(recordsets.recordset);
                                                    console.log(returnValue);
                                                    res.send({ "Result": recordsets.recordset });
                                                }
                                            });
                                        }
                                        Recursive(x + 1);
                                    }
                                }
                                Recursive(0);
                            });
                        }
                        else {
                            console.log("Error Getting Data from Analytics_M_Connections in GET_paramdata");
                            res.send({ "error": err.message });
                        }
                    });
                }
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GET_paramdata: " + ex.message);
            res.send({ "error": "Exception in GET_paramdata: " + ex.message });
        }
    });

    //*******************************************Dashboard Creation******************************************
    /*
     * @Summary      : Method to Save Dashboard Details
     * Params        : Dashboard Details
     * Function Code : SaveDashboard
     */
    app.post('/SaveDashboard', function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Insert into "Analytics_M_Dashboards"("DashboardId", "DashboardName", "Description", "RoleId", "Access", "CreatedBy", "CreatedDate")values($1, $2, $3, $4, $5, $6, current_timestamp)';
                postgresqlDBManager.PSQL_InsertData(query, [req.body.dashboardid, req.body.dashboardname, req.body.desc, req.session.RoleId, req.body.AccessedBy, req.session.myemail], function (err, response) {
                    if (!err) {
                        fs.writeFile('./public/Analytics/BIDashboards/' + req.body.dashboardid + '.json', req.body.dashboardconfig, function (err) {
                            if (err) {
                                console.log("Error Getting Data from Dashboard JSON File in SaveDashboard");
                                res.send({ "error": err.message });
                            }
                            else {
                                res.send({ success: true, dashboardid: req.body.dashboardid });
                            }
                        });
                    }
                    else {
                        console.log("Error Inserting Data in SaveDashboard");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in SaveDashboard: " + ex.message);
            res.send({ "error": "Exception in SaveDashboard: " + ex.message });
        }
    });

    /*
     * @Summary      : Method to get List of Existing Dashboards     
     * Function Code : GetDashboard
     */
    app.post("/Home/GetDashboard", function (req, res) {
        try {
            if (req.session.authenticated === true) {
                var query = 'Select "DashboardId" as "Dashboardid", "DashboardName" as "Dashboard_name", "Description", "RoleId", "Access", "CreatedBy", "CreatedDate" from "Analytics_M_Dashboards"';
                postgresqlDBManager.PSQL_getdata(query, null, function (err, result) {
                    if (!err) {
                        res.status(200).json({ "Result": result });
                    }
                    else {
                        console.log("Error Getting Data in GetDashboard");
                        res.send({ "error": err.message });
                    }
                });
            }
            else {
                res.send({ "isauthenticated": false });
            }
        }
        catch (ex) {
            console.log("Exception in GetDashboard: " + ex.message);
            res.send({ "error": "Exception in GetDashboard: " + ex.message });
        }
    });

    /*
     * @summary this method is used to /home/getdashboardbyid
     * @param req.body. will have  dashboards tree json data id.
     * functioncode: /home/getdashboardbyid_0150
     */
    app.post('/home/getdashboardbyid', function (req, res) {
        try {

            var qry = "SELECT dashboardid,dashboard_name,description,UserId,access FROM Dashboards where dashboardid='" + req.body.dashboardid + "'";


            analytics_client.execute(qry, queryOptions, function (err, result) {
                if (!err) {
                    fs.readFile('public/Analytics/BIDashboards/' + req.body.dashboardid + '.json', 'utf8', function (err, result1) {
                        if (!err) {
                            //console.log(result.rows[0].dashboard_name);
                            res.status(200).json({
                                Dashboardid: req.body.dashboardid,
                                Dashboard_name: result.rows[0].dashboard_name,
                                Description: result.rows[0].description,
                                Access: result.rows[0].access,
                                dashboardconfig: result1
                            });

                        }
                        else {
                            res.send({ "error": err.message });
                        }
                    });
                }
                else {
                    res.send({ "error": err.message });
                }
            })


        }
        catch (ex) {
            console.log(ex.message);
        }
    })
};
