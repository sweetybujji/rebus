/**
 * which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
 */
var http = require('http');

/**
 * @summary Get the data from Rest Service
 * @param URl:It Should contains Method Name. Eg:http://xxx:223/dropdowns/getafluencelevel
 * @param callback (function call)
 * @returns response (or) error
 * functioncode:rubus-rest_0001
 */
exports.GetDataFromRestservice = function (URl, callback) {

    try {
        var reqGet = http.request(URl, function (res) {
            res.on('data', function (response) {
                callback(false, process.stdout.write(response));
            });
        });

        reqGet.end();

        reqGet.on('error', function (e) {
            callback(e, e.message);
        });

    }
    catch (error) {
        callback(error, error.message);
    }

}

/**
 * @summary Post data to Rest Service
 * @param URl:It Should contains http or https. Eg:xxx
 * @param Port Eg:80
 * @param Path Eg:/dropdowns/getafluencelevel
 * @param Data Eg:{"RegId": "BY100000000"}
 * @param callback (function call)
 * @returns response (or) error
 * functioncode:rubus-rest_0002
 */

exports.PostDataToRestservice = function (URl, Port, Path, Data, callback) {
    try {
        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(Data, 'utf8')
        };

        // the post options
        var optionspost = {
            host: URl,
            port: Port,
            path: Path,
            method: "POST",
            headers: postheaders
        };

        // do the POST call
        var reqPost = http.request(optionspost, function (res) {
            res.on('data', function (response) {
                callback(false, process.stdout.write(response));
            });
        });
        // write the json data
        reqPost.write(Data);
        reqPost.end();
        reqPost.on('error', function (e) {
            callback(e, e.message);
        });
    }
    catch (error) {
        callback(error, error.message);
    }
}

/**
 * @summary Put data to Rest Service
 * @param URl:It Should contains http or https. Eg:xxx
 * @param Port Eg:80
 * @param Path Eg:/dropdowns/getafluencelevel
 * @param Data Eg:{"RegId": "BY100000000"}
 * @param callback (function call)
 * @returns response (or) error
 * functioncode:rubus-rest_0003
 */
exports.PutDataToRestservice = function (URl, Port, Path, Data, callback) {
    try {
        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(Data, 'utf8')
        };

        // the post options
        var optionspost = {
            host: URl,
            port: Port,
            path: Path,
            method: "POST",
            headers: postheaders
        };

        // do the POST call
        var reqPost = http.request(optionspost, function (res) {
            res.on('data', function (response) {
                callback(false, process.stdout.write(response));
            });
        });
        // write the json data
        reqPost.write(Data);
        reqPost.end();
        reqPost.on('error', function (e) {
            callback(e, e.message);
        });
    }
    catch (error) {
        callback(error, error.message);
    }
}

/**
 * @summary Delete data from Rest Service
 * @param URl:It Should contains http or https. Eg:xxx
 * @param Port Eg:80
 * @param Path Eg:/dropdowns/getafluencelevel
 * @param Data Eg:{"RegId": "BY100000000"}
 * @param callback (function call)
 * @returns response (or) error
 * functioncode:rubus-rest_0004
 */
exports.DeleteDataToRestservice = function (URl, Port, Path, Data, callback) {
    try {
        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(Data, 'utf8')
        };

        // the post options
        var optionspost = {
            host: URl,
            port: Port,
            path: Path,
            method: "POST",
            headers: postheaders
        };

        // do the POST call
        var reqPost = http.request(optionspost, function (res) {
            res.on('data', function (response) {
                callback(false, process.stdout.write(response));
            });
        });
        // write the json data
        reqPost.write(Data);
        reqPost.end();
        reqPost.on('error', function (e) {
            callback(e, e.message);
        });
    }
    catch (error) {
        callback(error, error.message);
    }
}



////...........  Restful Services Connectivity sample methods and input parameters........///

////.................................................................  Rest Start  .........................................................................................................

////rest_Custom.GetDataFromRestservice("http://192.168.4.66:223/dropdowns/getafluencelevel",function (err,res) {
////console.log(res);
////});

//var jsonObject = JSON.stringify({
//    "RegId": "BY100000000",
//    "Id": "",
//    "AfluenceLevel": "Upper Middle Class",
//    "OldValue": "",
//    "IPAddress": "192.168.4.98"
//});

////rest_Custom.PostDataToRestservice("192.168.4.66", "223", "/Masters/SaveAfluenceLevel",jsonObject, function (err, res) {
////    console.log(res);
////});

//var jsonObject = JSON.stringify({
//    "RegId": "BY100000000",
//    "Id": "",
//    "AfluenceLevel": "Upper Middle Class",
//    "OldValue": "",
//    "IPAddress": "192.168.4.98"
//});

////rest_Custom.PutDataToRestservice("192.168.4.66", "223", "/Masters/SaveAfluenceLevel",jsonObject, function (err, res) {
////    console.log(res);
////});

//var jsonObject = JSON.stringify({
//    "RegId": "BY100000000",
//    "Id": "",
//    "AfluenceLevel": "Upper Middle Class",
//    "OldValue": "",
//    "IPAddress": "192.168.4.98"
//});

////rest_Custom.DeleteDataToRestservice("192.168.4.66", "223", "/Masters/SaveAfluenceLevel",jsonObject, function (err, res) {
////    console.log(res);
////});


////.................................................................  Rest End  .........................................................................................................
