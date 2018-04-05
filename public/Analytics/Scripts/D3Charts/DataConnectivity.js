/**
 * New node file
 */
var sql = require('mssql');
var cassandra = require('cassandra-driver');

var Analytics_Data_client = new cassandra.Client({
    contactPoints: ['192.168.4.186:9042', '192.168.4.222:9042'], queryOptions: {
        consistency: cassandra.types.consistencies.quorum
    }, keyspace: 'iarms360'
});


var queryOptions = {
    consistency: cassandra.types.consistencies.quorum,
    prepare: true
};

// Connect to the cassandra database before starting the application server.
exports.connect_cassandra = function (cb) {
    Analytics_Data_client.connect(function (err) {
        // assert.ifError(err);
        if (!err) {
            // console.log("Successfully connected to the cassandra database");
            cb("connection established successfully...");
        }
        else {
            console.log("ERROR : " + err);
        }

    });
}
exports.cassandra_getData = function (resarray, cb) {
    var response1 = JSON.parse(resarray);

    //console.log(res);


    /*
     * var selcSPName = resarray[0]["DSName"]; var SPparams =
     * resarray[0]["param_data"]; var datasource = resarray[0]["DSConnType"]; var
     * selcConSPId = resarray[0]["ConnectionID"];
     */

    var formula = response1[0]["formula"];
    var StorePDname = response1[0]["DSName"];
    var SelcSPId = response1[0]["ConnectionID"];
    var datasource = response1[0]["DSConnType"];

     console.log(SelcSPId);

    /*var resarray=JSON.parse(req.body.GET_SPdtail);
    var StorePDname = resarray[0]["StorePDname"];
    var SelcSPId = resarray[0]["SelcSPId"];*/

    var query = 'select * from Connections where id=?;';

    Analytics_Data_client.execute(query, [SelcSPId], queryOptions, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to get Conndata.");
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



            /* " + Session["UserName"]. + " */

            var query = "select * from ParameterConfigs where ConnId=" + SelcSPId + " and Selspname='" + StorePDname + "' and UserName='ASD' allow filtering;";



            Analytics_Data_client.execute(query, queryOptions, function (err, result) {
                if (err) {
                    //handleError(res, err.message, "Failed to delete data.");
                    //res.status(200).send({"errorresult":err});
                }
                else {
                    if (result.rows.length > 0) {
                        sql.close();
                        sql.connect(config).then(function () {

                            var request = new sql.Request();

                            var Recursive = function (x) {
                                if (x < result.rows.length) {

                                    request.input((result.rows[x].selparamname).replace('@', ''), result.rows[x].paramdefault);

                                    if (x == result.rows.length - 1) {
                                        request.execute(StorePDname, function (err, recordsets, returnValue) {
                                            // ... error checks 

                                            if (err) {
                                                //res.status(200).json({"errorresult":err});
                                                console.log(err);
                                            }
                                            else {
                                                //res.status(200).json({"responsedata":recordsets[0]});
                                                //console.log(recordsets);
                                                cb(recordsets);
                                            }

                                        });
                                    }
                                    Recursive(x + 1);
                                }
                            }
                            Recursive(0);

                        });
                        //res.status(200).send({responsedata : "Show Param Configure"});
                    }
                    else {
                        // sql.close();
                        sql.connect(config).then(function () {
                            // Query

                            new sql.Request().query("select PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from information_schema.parameters where specific_name='" + StorePDname + "' and SPECIFIC_CATALOG='" + dbname + "'").then(function (recordset) {

                                if (err) {
                                    //res.status(200).send({"errorresult":err.message});
                                    console.log(err);
                                }
                                else {
                                    if (recordset.length > 0) {
                                        console.log("Show Param Configure");

                                        //res.status(200).send({responsedata : "Show Param Configure"});
                                    }
                                    else {
                                        sql.close();
                                        sql.connect(config).then(function () {

                                            var request = new sql.Request();
                                            request.execute(StorePDname, function (err, recordsets, returnValue) {
                                                // ... error checks 

                                                if (err) {
                                                    //res.status(200).json({"errorresult":err});
                                                    console.log(err);
                                                }
                                                else {
                                                    //res.status(200).json({"data":recordsets[0]});
                                                    cb(recordsets[0]);
                                                   // console.log(recordsets[0]);
                                                }

                                            });
                                        });
                                    }
                                }

                            }).catch(function (err) {

                                //res.status(200).send({"errorresult":err.message});
                                console.log(err);
                            });

                        }).catch(function (err) {
                            //res.status(200).send({"errorresult":err.message});
                            console.log(err);
                        });
                    }


                }
            });

        }
    });
}
