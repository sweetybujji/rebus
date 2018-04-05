/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By Manikanta
 * @Modified Date 12/10/2017
 */

var Pool = require("pg-pool");
//psql connection string---  "pg://Username:Password@HostIP/localhost:port/Databasename"
//var conString = "pg://postgres:admin@123@192.168.4.92:5432/Test";
//var psqlclient = new pg.Client(conString);


var psqlclient = new Pool({
    user: 'postgres',
    host: 'localhost',
    //database: 'ELogSheet',
    database: 'policy',
    password: 'memory',
    port: 5432,
});
/**
 * @summary this method is used to get data from PostGRE
 * @param query--command to perform select operation on database eg:select * from "table";
 * @param retrunresult--return result or error
 * functioncode:PSQL_getdata
 */
//note table name should be in double quotes
exports.PSQL_getdata = function (query, data, returnresult) {
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
                }
            });
        }
        else {
            done();
            returnresult(err, "");
        }
    });
}

/**
 * @summary this method is used to Insert/update/delete/Alter/create data in Postgre
 * @param query--command to perform some operation on database Update "Admin_T_PasswordPolicy" set "PolicyName"=$1,"Status"=$2 where Id=$3;
 * @param data-- data in array format for insertion/deletion/updation like [PolicyName, Status, Id]
 * @param retrunresult--return result or error
 * functioncode:PSQL_InsertData_0002
 */

//note table name should be in double quotes
exports.PSQL_InsertData = function (query, data, callback) {
    psqlclient.connect(function (err, client, done) {
        if (!err) {
            // console.log("Success");
            psqlclient.query(query, data, function (err, res) {
                if (!err) {
                    done();
                    callback(false, "Successfully Inserted");
                }
                else {
                    console.log("error at query level : " + err);
                    done();
                    callback(err, "");
                }
            })
        }
        else {
            console.log("error at connection : " + err);
            done();
            callback(err, "");
        }
    });
}

//note table name should be in double quotes
exports.PSQL_InsertAndGetData = function (query, data, callback) {
    psqlclient.connect(function (err, client, done) {
        if (!err) {
            // console.log("Success");
            psqlclient.query(query, data, function (err, res) {
                if (!err) {
                    done();
                    callback(false, res);
                }
                else {
                    console.log("error at query level : " + err);
                    done();
                    callback(err, "");
                }
            })
        }
        else {
            console.log("error at connection : " + err);
            done();
            callback(err, "");
        }
    });
}

/**
 * @summary this method is used to Open Connection to PostGRE without Closing Connection
 * @param retrunresult--return error,client,done
 * functioncode:PSQL_Connect
 */
exports.PSQL_Connect = function (returnresult) {
    psqlclient.connect(function (err, client, done) {
        if (!err) {
            returnresult(false, client, done);
        }
        else {
            console.log("Error in PSQL_Connect: " + err);
            returnresult(err, "", "");
        }
    });
}

/**
 * @summary this method is used to Execute PostGRE Query
 * @param query--command to perform operations on database;
 * @param retrunresult--return result or error
 * functioncode:PSQL_ExecuteQuery
 */
exports.PSQL_ExecuteQuery = function (client, query, data, returnresult) {
    client.query(query, data, function (err, res) {
        if (!err) {
            returnresult(false, res);
        }
        else {
            console.log("Error in PSQL_ExecuteQuery: " + err);
            returnresult(err, "");
        }
    })
}

/**
 * @summary this method is used to get data from table in PostGRE
 * @param query--select command to get data;
 * @param retrunresult--return result or error
 * functioncode:PSQL_ExecuteSelectQuery
 */
exports.PSQL_ExecuteSelectQuery = function (client, query, data, returnresult) {
    client.query(query, data, function (err, res) {
        if (!err) {
            returnresult(false, res.rows);
        }
        else {
            console.log("Error in PSQL_ExecuteSelectQuery: " + err);
            returnresult(err, "");
        }
    })
}

/**
 * @summary this method is used to perform ROLLBACK to the PostGRE transaction
 * @param retrunresult--return result or error
 * functioncode:PSQL_RollBackQuery
 */
exports.PSQL_RollBackQuery = function (client, done, returnresult) {
    client.query("ROLLBACK", function (err, res) {
        if (!err) {
            done();
            returnresult(false, res);
        }
        else {
            console.log("Error in PSQL_RollBackQuery: " + err);
            done();
            returnresult(err, "");
        }
    })
}

/**
 * @summary this method is used to perform COMMIT to the PostGRE transaction
 * @param retrunresult--return result or error
 * functioncode:PSQL_CommitQuery
 */
exports.PSQL_CommitQuery = function (client, done, returnresult) {
    client.query("COMMIT", function (err, res) {
        if (!err) {
            done();
            returnresult(false, res);
        }
        else {
            console.log("Error in PSQL_CommitQuery: " + err);
            done();
            returnresult(err, "");
        }
    })
}


//note table name should be in double quotes
exports.PSQL_InsertDataReturnSerial = function (query, data, callback) {
    psqlclient.connect(function (err, client, done) {
        if (!err) {
            // console.log("Success");
            psqlclient.query(query, data, function (err, res) {
                if (!err) {
                    done();
                    callback(false, res.rows);
                }
                else {
                    console.log("error at query level : " + err);
                    done();
                    callback(err, "");
                }
            })
        }
        else {
            console.log("error at connection : " + err);
            done();
            callback(err, "");
        }
    });
}
