/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By Manikanta
 * @Modified Date 12/10/2017
 */

var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'admin@123',
    server: '192.168.4.49',
    database: 'BI360',
    port: 1434,
    options: {
        encrypt: true
    }
};

/**
 * @summary this method is used to test connection of sql server database
 * @param retrunresult--return result or error
 * functioncode:sql_connection_0001
 */
exports.sql_connection = (function (cb) {
    try {
        sql.close();
        sql.connect(config, function (err) {
            if (err) {
                console.log(err);
                cb(err);
            }
            else {
                //var request = new sql.Request();
                cb("connection established successfully...");
            }
        });
    }
    catch (ex) {
        cb(err);
    }
});

/**
 * @summary this method is used to get data from  sql server database
 * @param query--command to perform select operation on database eg:select * from table;
 * @param retrunresult--return result or error
 * functioncode:sql_getData_0001
 */
exports.sql_getData = function (query, retrunresult) {
    try {
        sql.close();
        sql.connect(config).then(function () {
            new sql.Request().query(query).then(function (recordset) {
                retrunresult(false, recordset[0]);
            }).catch(function (err) {
                retrunresult(err, "");
            });
        }).catch(function (err) {
            retrunresult(err, "");
        });
    }
    catch (ex) {
        console.log("Exception at Getting Data from Sql server : " + ex);
        retrunresult(ex, "");
    }
}

/**
 * @summary this method is used to execute stored procedure in sql server
 * @param StorePDname  
 * @param parameternames--array of parameternames eg:['Customer','Commodity']
 * @param parametervalues--Default values for the parameternames eg:['RINL','coal']
 * @param retrunresult--return result or error
 * functioncode:sql_ExecuteStoredprocedure_0002
 */
//note if no parameters you have to pass empty array eg:[],[]
exports.sql_ExecuteStoredprocedure = function (StorePDname, parameternames, parametervalues, retrunresult) {
    try {
        sql.close();
        sql.connect(config).then(function () {
            request = new sql.Request();
            var recursive = function (x) {
                if (x < parameternames.length) {
                    request.input(parameternames[x], parametervalues[x]);
                    recursive(x + 1);
                }
                else {
                    request.execute(StorePDname, function (err, recordsets, returnValue) {
                        if (err) {
                            retrunresult(err, "");
                        }
                        else {
                            retrunresult(false, recordsets[0]);
                        }
                    });
                }
            }
            recursive(0);

        }).catch(function (err) {
            retrunresult(err, "");
        });
    }
    catch (ex) {
        retrunresult(ex, "");
    }
}

/**
 * @summary this method is used to Insert/update/delete/Alter/create data in sql server
 * @param query--command to perform some operation on database 
 * @param retrunresult--return result or error
 * functioncode:sql_Insert_Data_0003
 */
exports.sql_Insert_Data = function (query, retrunresult) {
    try {
        sql.close();
        sql.connect(config).then(function () {
            new sql.Request().query(query).then(function (recordset) {
                retrunresult(false, "Successfully Inserted");
            }).catch(function (err) {
                retrunresult(err, "");
            });
        }).catch(function (err) {
            retrunresult(err, "");
        });
    }
    catch (ex) {
        retrunresult(ex, "");
    }
}



/**
 * @summary this method is used to execute stored procedure in sql server
 * @param connectioncnfg  
 * @param query-- query to be execution
 * @param retrunresult--return result or error
 * functioncode:sql_Executequery_withcnfg_0004
 */
//note if no parameters you have to pass empty array eg:[],[]
exports.sql_Executequery_withcnfg = function (connectioncnfg, query, retrunresult) {
    try {

        var pool = new sql.ConnectionPool(connectioncnfg, function (err) {
            if (!err) {
                var request = pool.request();
                request.query(query, function (err, recordsets) {
                    if (!err) {
                        retrunresult(false, recordsets.recordset);
                    }
                    else {
                        console.log("Error Getting Data in sql_Executequery_withcnfg");
                        retrunresult(err, null);

                    }
                });
            }
            else {
                retrunresult(err, null);
            }
        });

        pool.on('error', function (err) {
            retrunresult(err, null);
        });

    }
    catch (ex) {
        retrunresult(ex, "");
    }
};


/**
 * @summary this method is used to execute stored procedure in sql server
 * @params connectioncnfg
 * @param StorePDname  
 * @param parameternames--array of parameternames eg:['Customer','Commodity']
 * @param parametervalues--Default values for the parameternames eg:['RINL','coal']
 * @param retrunresult--return result or error
 * functioncode:sql_ExecuteStoredprocedure_withcnfg_0005
 */
//note if no parameters you have to pass empty array eg:[],[]
exports.sql_ExecuteStoredprocedure_withcnfg = function (connectioncnfg,StorePDname, parameternames, parametervalues, retrunresult) {
    try {
        var pool = new sql.ConnectionPool(connectioncnfg, function (err) {
            if (!err) {
                var request = pool.request();
                var recursive = function (x) {
                    if (x < parameternames.length) {
                        request.input(parameternames[x], parametervalues[x]);
                        recursive(x + 1);
                    }
                    else {
                        request.execute(StorePDname, function (err, recordsets, returnValue) {
                            if (err) {
                                retrunresult(err, "");
                            }
                            else {
                                retrunresult(false, recordsets.recordset);
                            }
                        });
                    }
                }
                recursive(0);
            }
            else {
                retrunresult(err, null);
            }

        })

        pool.on('error', function (err) {
            retrunresult(err, null);
        });


    }
    catch (ex) {
        retrunresult(ex, "");
    }
}







