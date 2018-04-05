/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By Manikanta
 * @Modified Date 12/10/2017
 *
 */

var cassandra = require('cassandra-driver');

var queryOptions = {
    consistency: cassandra.types.consistencies.quorum,
    prepare: true
};

/**
 * @summary this method is used to get data from  Cassandra
 * @param query--command to perform select operation on database eg:select * from table;
 * @param retrunresult--return result or error
 * functioncode:cassandra_getData_0001
 */

exports.cassandra_getData = function(query, returnresult) {	
    try {
        //contactPoints--array of host to replicate data,keyspace--database name
        var cassandraclient = new cassandra.Client({
          contactPoints : [ '192.168.4.187', '192.168.4.222','192.168.4.186','192.168.4.182' ],keyspace : 'iarms_rad'
      });
        cassandraclient.connect(function (err) {
            if(!err) {
                // console.log("Successfully comnnected");
                cassandraclient.execute(query, function (err, recordset) {
                    if (!err) {			
                        returnresult(false,recordset.rows);				
                    } else {
                        returnresult(err,"");
                    }
                });

                // cb("connection established successfully...");
            }
            else
            {			
                //cb(err);
                returnresult(err,"");
                //console.log("cassandra connection err :"+err);
            }
        });	 

    }catch(ex)
    {
        console.log("Exception at Getting data from cassandra : "+ex);
    }
};


/**
 * @summary this method is used to get data from  Cassandra based on parameters
 * @param query--command to perform select operation on database eg: select * from table where name=? and empid=?;
 * @param parameters--it should be in array of values/strings/both eg: ['manikanta',669]
 * @param retrunresult--return result or error
 * functioncode:cassandra_getdata_parameterizedquery_0002
 */

exports.cassandra_getdata_parameterizedquery=function(query,parameters,returnresult){

    try{
        //contactPoints--array of host to replicate data,keyspace--database name
        var cassandraclient = new cassandra.Client({
          contactPoints : [ '192.168.4.187', '192.168.4.222','192.168.4.186','192.168.4.182' ],keyspace : 'iarms_rad'
      });
        cassandraclient.connect(function (err) {
            if(!err) {
                //console.log(query);
                cassandraclient.execute(query, parameters, function (err, recordset) {
                    if (!err) {			
                        returnresult(false,recordset.rows);				
                    } else {
                        returnresult(err,"");
                    }
                });

                // cb("connection established successfully...");
            }
            else
            {			
                //cb(err);
                returnresult(err,"");

                console.log("Exception at Getting data from cassandra parameterized operation : "+ex);

            }
        });	 
    }
    catch(exp)
    {
        console.log(exp);
    }
};



/**
 * @summary this method is used to Insert/update/delete/Alter/create data in Cassandra
 * @param query--command to perform some operation on database 
 * @param retrunresult--return result or error
 * functioncode:cassandra_InsertData_0003
 */

exports.cassandra_InsertData = function(query, returnresult) {	
    try {
        //contactPoints--array of host to replicate data,keyspace--database name
        var cassandraclient = new cassandra.Client({
	          contactPoints : [ '192.168.4.187', '192.168.4.222','192.168.4.186','192.168.4.182' ],keyspace : 'iarms_rad_test'
	      });
	      cassandraclient.connect(function (err) {	    
            if(!err) {
                //console.log(query);
                cassandraclient.execute(query,function (err, recordset) {		
                    if (!err) {			
                        returnresult(false,"Successfully Inserted");				
                    } else {
                        //console.log(err);
                        returnresult(err,"");
                    }
                });

                // cb("connection established successfully...");
            }
            else
            {			
                //cb(err);
                //console.log("cassandra connection err :"+err);
                returnresult(err,"");
               
            }
        });	 
    }
    catch(ex)
    {
        console.log("Exception at Inserting data Into cassandra : "+ex.message);
    }
};
