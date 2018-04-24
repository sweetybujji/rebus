/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By tejasree
 * @Modified Date 17/04/2018
 */
//note table name should be in double quotes

var Pool = require("pg-pool");
var Postgreconnection = require(global.paths.postgredbmodel);
var psqlclient = new Pool(Postgreconnection);
/**
 * @summary this method is used to get data from PostGRE
 * @param query--command to perform select operation on database eg:select * from "table";
 * @param retrunresult--return result or error
 * functioncode:psql_getdata_0001
 */
 exports.psql_getdata = function (query, data, returnresult) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {
                client.query(query, data, function (err, res) {
                    if (!err) {
                        done();
                        returnresult(false, res.rows);
                    }
                    else {
                        done();
                        returnresult(err, "");
                        console.log("error occured at psql_getdata_0001: " + err);
                    }
                });
            }
            else {
                done();
                returnresult(err, "");
                console.log("error occured at psql_getdata_0001: " + err);
            }
        });
    }
    catch (ex) {
        returnresult(ex, "");
        console.log("error occured at psql_getdata_0001: " + ex);
    }
}
/**
 * @summary this method is used to Insert/update/delete/Alter/create data in Postgre
 * @param query--command to perform some operation on database Update "Admin_T_PasswordPolicy" set "PolicyName"=$1,"Status"=$2 where Id=$3;
 * @param data-- data in array format for insertion/deletion/updation like [PolicyName, Status, Id]
 * @param retrunresult--return result or error
 * functioncode:psql_insertdata_0002
 */
 exports.psql_insertdata = function (query, data, callback) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {
                psqlclient.query(query, data, function (err, res) {
                    if (!err) {
                        done();
                        callback(false, "Successfully Inserted");
                    }
                    else {
                        done();
                        callback(err, "");
                        console.log("error occured at psql_insertdata_0002:" + err);
                    }
                });
            }
            else {
                done();
                callback(err, "");
                console.log("error occured at psql_insertdata_0002: " + err);
            }
        });
    }
    catch (ex) {
      callback(ex, "");
      console.log("error occured at psql_insertdata_0002: " + ex);
    }
}
/**
 * @summary this method is used to Insert/update/alter/delete and finally it returns response/result back to us in Postgre
 * @param query--command to perform some operation on database Update "Admin_T_PasswordPolicy" set "PolicyName"=$1,"Status"=$2 where Id=$3;
 * @param data-- data in array format for insertion/deletion/updation like [PolicyName, Status, Id]
 * @param callback--return result or error
 * functioncode:psql_insertandgetdata_0003
 */


exports.psql_insertandgetdata = function (query, data, callback) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {
                psqlclient.query(query, data, function (err, res) {
                    if (!err) {
                        done();
                        callback(false, res);
                    }
                    else {
                       done();
                       callback(err, "");
                       console.log("error occured at psql_insertandgetdata_0003: " + err);
                    }
                });
            }
            else {
                done();
                callback(err, "");
                console.log("error occured at psql_insertandgetdata_0003: " + err);
            }
        });
    }
    catch (ex) {
     callback(ex, "");
     console.log("error occured at psql_insertandgetdata_0003: " + ex);
    }
}

/**
 * @summary this method is used to Open Connection to PostGRE without Closing Connection
 * @param retrunresult--return error,client,done
 * functioncode:psql_connect_0004
 */
exports.psql_connect = function (returnresult) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {
                returnresult(false, client, done);
            }
            else {
              returnresult(err, "", "");
              console.log("error occured at psql_connect_0004: " + err);
            }
        });
    }
    catch (ex) {
     returnresult(ex, "");
     console.log("error occured at psql_connect_0004: " + ex);
    }
}

/**
 * @summary this method is used to Execute PostGRE Query
 * @param query--command to perform operations on database;
 * @param retrunresult--return result or error
 * functioncode:psql_executequery_0005
 */
exports.psql_executequery = function (client, query, data, returnresult) {
    try {
        client.query(query, data, function (err, res) {
            if (!err) {
                returnresult(false, res);
            }
            else {
                returnresult(err, "");
                console.log("error occured at psql_executequery_0005: " + err);
            }
        });
    }
    catch (ex) {
      returnresult(ex, "");
      console.log("error occured at psql_executequery_0005: " + ex);
    }
}

/**
 * @summary this method is used to get data from table in PostGRE
 * @param query--select command to get data;
 * @param retrunresult--return result or error
 * functioncode:psql_executeselectquery_0006
 */
exports.psql_executeselectquery = function (client, query, data, returnresult) {
    try {
        client.query(query, data, function (err, res) {
            if (!err) {
                returnresult(false, res.rows);
            }
            else {
                returnresult(err, "");
                console.log("error occured at psql_executeselectquery_0006: " + err);
            }
        });
    }
    catch (ex) {
      returnresult(ex, "");
      console.log("error occured at psql_executeselectquery_0006:" + ex);
    }
}

/**
 * @summary this method is used to perform ROLLBACK to the PostGRE transaction
 * @param retrunresult--return result or error
 * functioncode:psql_rollbackquery_0007
 */
exports.psql_rollbackquery = function (client, done, returnresult) {
    try {
        client.query("ROLLBACK", function (err, res) {
            if (!err) {
                done();
                returnresult(false, res);
            }
            else {
                done();
                returnresult(err, "");
                console.log("error occured at psql_rollbackquery_0007: " + err);
            }
        });
    }
    catch (ex) {
      returnresult(ex, "");
      console.log("error occured at psql_rollbackquery_0007: " + ex);
    }
}

/**
 * @summary this method is used to perform COMMIT to the PostGRE transaction
 * @param retrunresult--return result or error
 * functioncode:psql_commitquery_0008
 */
exports.psql_commitquery = function (client, done, returnresult) {
    try {
        client.query("COMMIT", function (err, res) {
            if (!err) {
                done();
                returnresult(false, res);
            }
            else {
                done();
                returnresult(err, "");
                console.log("error occured at psql_commitquery_0008: " + err);
            }
        });
    }
    catch (ex) {
       returnresult(ex, "");
       console.log("error occured at psql_commitquery_0008: " + ex);
    }
}


/**
 * @summary this method is used to Insert/update/alter/delete and finally it returns response/result back to us in Postgre
 * @param query--command to perform some operation on database Update "Admin_T_PasswordPolicy" set "PolicyName"=$1,"Status"=$2 where Id=$3;
 * @param data-- data in array format for insertion/deletion/updation like [PolicyName, Status, Id]
 * @param callback--return result or error
 * functioncode:psql_insertdatareturnserial_0009
 */

exports.psql_insertdatareturnserial = function (query, data, callback) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {

                psqlclient.query(query, data, function (err, res) {
                    if (!err) {
                        done();
                        callback(false, res.rows);
                    }
                    else {
                        done();
                        callback(err, "");
                        console.log("error occured at psql_insertdatareturnserial_0009: " + err);
                    }
                })
            }
            else {
                  done();
                  callback(err, "");
                  console.log("error occured at psql_insertdatareturnserial_0009: " + err);
            }
        });
    }
    catch (ex) {
        callback(ex, "");
        console.log("error occured at psql_insertdatareturnserial_0009:" + ex);
    }
}

/**
 * @summary this method is used to open Connection, Execute Batch Querries in a loop and Commit(if Success)/Rollback(if failed) the transaction
 * @param queryloop--List of queries in array format
 * @param data--data in array format
 * @param retrunresult--return result or error
 * functioncode:psql_batchexecution_0010
 */
exports.psql_batchexecution = function (queryloop, data, callback) {
    try {
        psqlclient.connect(function (err, client, done) {
            if (!err) {
                var QueryLoop = function (i) {
                    if (i == queryloop.length) {
                        psqlclient.query("COMMIT", function (err, res) {
                            if (!err) {
                                console.log("Commit Success");
                                done();
                                callback(false, res);
                            }
                            else {
                                psqlclient.query("ROLLBACK", function (err, res) {
                                    if (!err) {
                                        done();
                                        callback(false, res);
                                    }
                                    else {
                                        done();
                                        callback(err, "");
                                        console.log("error occured at psql_batchexecution_0010: " + err);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        psqlclient.query(queryloop[i], data[i], function (err, res) {
                            if (!err) {
                                QueryLoop(i + 1);
                            }
                            else {
                                psqlclient.query("ROLLBACK", function (err, res) {
                                    if (!err) {
                                        done();
                                        callback(false, res);
                                    }
                                    else {
                                        done();
                                        callback(err, "");
                                        console.log("error occured at psql_batchexecution_0010: " + err);
                                    }
                                });
                            }
                        });
                    }
                }
                QueryLoop(0);
            }
            else {
                done();
                callback(err, "");
                console.log("error occured at psql_batchexecution_0010:: " + err);
            }
        });
    }
    catch (ex) {
        callback(ex, "");
        console.log("error occured at psql_batchexecution_0010: " + ex);
    }
}


/**
 * @summary this method is used to open Connection, Execute  Query based on dynamic connection
 * @param config--it is the json object it contains host,port,username,Password
 * @param query--List of queries in array format
 * @param data--data in array format
 * @param retrunresult--return result or error
 * functioncode:psql_executedataconnectors_0011
 */
exports.psql_executedataconnectors = function (config, query, data, callback) {
    try {

        var psqlclient_dataconnectors = new Pool({
            user: config.user,
            host: config.server,
            database: config.database,
            password: config.password,
            port: config.port,
        });

        psqlclient_dataconnectors.connect(function (err, client, done) {
            if (!err) {
                client.query(query, function (err, res) {
                    if (!err) {
                        done();
                        callback(false, res);
                    }
                    else {
                        done();
                        callback(err, "");
                        console.log("error occured at psql_executedataconnector_0011:  " + err);
                    }
                });
            }
            else {
                done();
                callback(err, "");
                console.log("error occured at psql_executedataconnector_0011: " + err);
            }
        });
    }
    catch (ex) {
        callback(ex, "");
        console.log("error occured at psql_executedataconnector_0011: " + ex);
    }
}
