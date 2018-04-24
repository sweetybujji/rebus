/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By tejasree
 * @Modified Date 17/04/2018
 *
 */

var cassandra = require('cassandra-driver');
/**
 @summary based on diplication it automatically calculate 
    how may system alive

 */
var queryOptions = {
    consistency: cassandra.types.consistencies.quorum,
    prepare: true
};

var cassandraconnection = require(global.paths.cassandradbmodel);
/**
 * @summary this method is used to get data from  Cassandra
 * @param query--command to perform select operation on database eg:select * from table;
 * @param retrunresult--return result or error
 * functioncode:cassandra_getData_0001
 */
 exports.cassandra_getData = function (query, returnresult) {
     try {
         var cassandraclient = new cassandra.Client(cassandraconnection);
         cassandraclient.connect(function (err) {
             if (!err) {
                 cassandraclient.execute(query, function (err, recordset) {
                     if (!err) {
                         returnresult(false, recordset.rows);
                     }
                     else {
                         returnresult(err, "");
                         console.log("error occured at cassandra_getData_0001: " + err);
                     }
                 });
             }
             else {
                 returnresult(err, "");
                 console.log("error occured at cassandra_getData_0001: " + err);
             }
         });
     }
     catch (ex) {
         returnresult(ex, "");
         console.log("error occured at cassandra_getData_0001: " + ex);
     }
 };

/**
 * @summary this method is used to get data from  Cassandra based on parameters
 * @param query--command to perform select operation on database eg: select * from table where name=? and empid=?;
 * @param parameters--it should be in array of values/strings/both eg: ['manikanta',669]
 * @param retrunresult--return result or error
 * functioncode:cassandra_getdata_parameterizedquery_0002
 */
exports.cassandra_getdata_parameterizedquery = function (query, parameters, returnresult) {
    try {
        var cassandraclient = new cassandra.Client(cassandraconnection);
        cassandraclient.connect(function (err) {
            if (!err) {
                cassandraclient.execute(query, parameters, function (err, recordset) {
                    if (!err) {
                        returnresult(false, recordset.rows);
                    }
                    else {
                        returnresult(err, "");
                        console.log("error occured at cassandra_getdata_parameterizedquery_0002 " + err);
                    }
                });
            }
            else {
                returnresult(err, "");
                console.log("error occured at cassandra_getdata_parameterizedquery_0002 : " + err);
            }
        });
    }
    catch (exp) {
        returnresult(exp, "");
        console.log("error occured at cassandra_getdata_parameterizedquery_0002: " + exp);
    }
};

/**
 * @summary this method is used to Insert/update/delete/Alter/create data in Cassandra
 * @param query--command to perform some operation on database
 * @param retrunresult--return result or error
 * functioncode:cassandra_insertdata_0003
 */
exports.cassandra_insertdata = function (query, returnresult) {
    try {
        var cassandraclient = new cassandra.Client(cassandraconnection);
        cassandraclient.connect(function (err) {
            if (!err) {
                cassandraclient.execute(query, function (err, recordset) {
                    if (!err) {
                        returnresult(false, "Successfully Inserted");
                    }
                    else {
                        returnresult(err, "");
                        console.log("error occured at cassandra_insertdata_0003: " + err);
                    }
                });
            }
            else {
                returnresult(err, "");
                console.log("error occured at cassandra_insertdata_0003 " + err);
            }
        });
    }
    catch (ex) {
       returnresult(ex, "");
       console.log("error occured at cassandra_insertdata_0003:" + ex);
    }
};
