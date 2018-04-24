/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

//... all required packeges.....//
var ldap = require('ldapjs');
var assert = require('assert');
var generator = require('generate-password');
var htmlToPdf = require('html-to-pdf');
var cassandra = require('cassandra-driver'); //---- used to connect cassandra database
var fs = require('fs'); ///------ for file operations.
var _ = require("underscore"); //---- to filter data
var session = require('express-session'); //------ for maintaining session
var GoogleStrategy = require('passport-google-oauth2').Strategy; ////////
var LocalStrategy = require('passport-local').Strategy;/////
var cookieParser = require('cookie-parser');
var formidable = require("formidable"); //----
var cql = require('node-cassandra-cql');// ---
var Guid = require('guid');
var uuid = cassandra.types.TimeUuid.now();
var flash = require('connect-flash');
var passport = require('passport'); //---- for authentication and autherization
var bcrypt = require('bcryptjs');
var AuthanticatorFactor = require('node-2fa');
var Config = require('Config.json');
//... all required packeges.....//

//......... Analytics npm Required Packages .........//
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var sql = require('mssql');
var XMLbuilder = require('xmlbuilder');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitRoot: true });
var jsonxml = require('jsontoxml');
var XLSX = require('xlsx');
var bodyparser = require('body-parser');
var download = require('download-file');
//var DataConnectivity = require('./public/Analytics/Scripts/D3Charts/DataConnectivity.js');
global.paths = require('./config/components/script-path.js'); //Routing Configuration Narendra
var postgresqlDBManager = require('./models/script-postgremodel.js');
//var sqlserverDBManager = require('./public/Scripts/AppScripts/Utility/SqlServerAPI.js');

//var SQLDataAdaptor = require('./public/ELogsheet/Scripts/DBScripts/Sqlserverscripts.js');
//var CassandraDataAdaptor = require('./public/ELogsheet/Scripts/DBScripts/CassandraScripts.js');             //line added By SWAMY on 16-Feb-2018
//var PostGreSqlDataAdaptor = require('./public/ELogsheet/Scripts/DBScripts/PostgreScript.js');               //line added By SWAMY on 16-Feb-2018
//var MongoDBDataAdaptor = require('./public/ELogsheet/Scripts/DBScripts/MongoDBScript.js');                  //line added By SWAMY on 16-Feb-2018

//var SqlServerDBManager = require('./public/ELogsheet/Scripts/DBScripts/Sqlserverscripts.js');             //line added By SWAMY on 09-Feb-2018
//var RubusDataAdaptorFile = require('./public/ELogsheet/Scripts/DBScripts/DataAdaptor.js');                  //line added By SWAMY on 21-Feb-2018
//var RubusDataAdaptor = new RubusDataAdaptorFile(SQLDataAdaptor, CassandraDataAdaptor, PostGreSqlDataAdaptor, MongoDBDataAdaptor, postgresqlDBManager);


var Email = require('./public/utility/script-email.js');
//var logfile = require('./public/Scripts/serverscripts/Logs.js');

//var logcreation = new logfile(__dirname, fs);

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;

var server = require('websocket').server;

var socket = new server({
    httpServer: http.createServer().listen(1337)
});


var mqtt = require('mqtt');

var soap = require('strong-soap').soap;
var WSDL = soap.WSDL;
var XMLHandler = soap.XMLHandler;
var xmlHandler = new XMLHandler();
var util = require('util');
var CircularJSON = require('circular-json');


//......... Analytics npm Required Packages .........//
var salt = bcrypt.genSaltSync(10);

//session time in minutes declaration
var User_SessionTime = 20;

// all environments
app.set('port', process.env.PORT || 8086);


//cassandra db connection
// Connect to the cassandra database before starting the application server.
//var KeySpaceName = "iarms_rad_banglore_lt";
//var client = new cassandra.Client({
//    contactPoints: ['192.168.4.222:9042', '192.168.4.186:9042'], queryOptions: {
//        consistency: cassandra.types.consistencies.quorum
//    },
//    keyspace: 'iarms_rad_banglore_lt'
//});
var cassandradata = Config.cassandra;


var client = new cassandra.Client({
   contactPoints: [cassandradata.contactPoints],
    keyspace: cassandradata.keyspace
    //keyspace: 'rubuscore'
});

//var client = new cassandra.Client({
   // contactPoints: ['192.168.4.187:9042'],
   // keyspace: 'elogsheet'
//    //keyspace: 'rubuscore'
//});

client.connect(function (err) {
    if (!err) {
        console.log("Successfully connected to the Rubus Cassandra database");
        // logcreation.LogFile("", "Cassandra", "Successfully connected to the Rubus Cassandra database")
    }
    else {
        console.log("ERROR : " + err);
        // logcreation.LogFile("ERROR", "Cassandra", err.message)

    }
});
// Connect to the cassandra database before starting the application server.

app.configure(function () {
    app.use(session({
        secret: 'RUBUSAPP',
        resave: true,
        cookie: { maxAge: parseInt(User_SessionTime) * 60 * 1000 }, // 60*20*1000
        // cookie: { maxAge: 10000 },
        rolling: true,     //Reset the cookie Max-Age on every request
        saveUninitialized: true, //Don't create a session for anonymous users

    }));

    app.use(flash());
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(passport.initialize());
    //app.use(session(sess));
    app.use(passport.session());
    //app.use(express.bodyParser());
    app.use(bodyparser.json());
    app.use(express.methodOverride());
    app.use(checkAuth);
    //app.use(app.router);
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'resourceFiles/side_topmenu')));
});


//..... checkAuth
function checkAuth(req, res, next) {
    try {
        sess = req.session;
        if (req.url === '/Home' && (!req.session || !req.session.authenticated) && req.user == undefined && req.session == undefined) {
            res.sendfile(__dirname + '/public/views/login/loginform.htm');
            return;
        }
        else {
            if (req.session.myemail != undefined) {
                req.session.touch();
            }
        }
    }
    catch (e) {
        console.log("Error:" + "\t" + "CheckSession" + "\t" + e);
    }
    next();
}

////....... Utility Data Connectivity ....... ////

//var rest_Custom = require('./public/Scripts/AppScripts/Utility/rubus-rest.js');
//var rest_Custom = require('./public/Scripts/AppScripts/Utility/rubus-soap.js');
var CassandraDBManager = require('./models/script-cassandramodel.js');

////....... Server app scripts ....... ////
//var client=require('./public/Scripts/serverscripts/CassandraConApp.js')(cassandra);
//require('./public/Scripts/serverscripts/PasswordPolicyApp.js')(app, postgresqlDBManager);
//require('./public/Scripts/serverscripts/RoleBasedFormAccessApp.js')(app, postgresqlDBManager);


//require('./public/Scripts/serverscripts/AnalyticsApp.js')(app, cassandra, mongodb, XLSX, fs, jsonxml, parser, XMLbuilder, xml2js, download, __dirname, sql, path, formidable, _, DataConnectivity, kafka, Producer, Consumer, socket, mqtt, soap, XMLHandler, xmlHandler, util, CircularJSON, WSDL, postgresqlDBManager, logcreation, sqlserverDBManager);
require('./nodescript/script-googlestrategyapp.js')(app, passport, GoogleStrategy, postgresqlDBManager);
require('./nodescript/script-passportlocalapp.js')(app, passport, postgresqlDBManager, LocalStrategy, bcrypt);
require('./nodescript/script-user.js')(app, postgresqlDBManager, bcrypt, AuthanticatorFactor, Email, generator, salt);
require('./nodescript/script-employee.js')(app, postgresqlDBManager);
require('./nodescript/script-dynamicmenu.js')(app, postgresqlDBManager, fs, path, __dirname);
//require('./public/js/scripts/serverscripts/DomainModelApp.js')(app, cassandra, fs, client, _, postgresqlDBManager);
//require('./public/js/scripts/serverscripts/MicroflowApp.js')(app, cassandra, fs, client, postgresqlDBManager);
//require('./public/js/scripts/serverscripts/SampleCrudApp.js')(app, postgresqlDBManager, CassandraDBManager);
require('./nodescript/script-changepwdapp.js')(app, postgresqlDBManager, bcrypt, Email, salt);
require('./nodescript/script-captchaapp.js')(app);
require('./nodescript/script-forgotpwdapp.js')(app, postgresqlDBManager, Email, generator, bcrypt, salt);
//require('./public/js/scripts/serverscripts/LDAPApp.js')(app, ldap, assert);
//require('./public/js/scripts/serverscripts/ExcelApp.js')(app, fs);
//require('./public/js/scripts/serverscripts/PDFApp.js')(app, htmlToPdf);
require('./nodescript/script-passwrdpolicyfunctionalityapp.js')(app, postgresqlDBManager, __dirname);
require('./nodescript/script-logoutapp.js')(app, postgresqlDBManager);
require('./nodescript/script-googleauthenticatorapp.js')(app, postgresqlDBManager, AuthanticatorFactor);
//require('./public/Scripts/serverscripts/ELogsheetApp.js')(app, fs, postgresqlDBManager, SqlServerDBManager, CassandraManager, PostGreSqlManager, MongoDBManager, __dirname, path, formidable, XLSX);
//require('./public/Scripts/serverscripts/ELogsheetApp.js')(app, fs, postgresqlDBManager, SqlServerDBManager, RubusDataAdaptor, __dirname, path, formidable, XLSX);
//require('./public/Scripts/serverscripts/ELogsheetApp.js')(app, fs, postgresqlDBManager, RubusDataAdaptor, __dirname, path, formidable, XLSX);
//require('./public/Scripts/serverscripts/LabelsApp.js')(app, fs, postgresqlDBManager, __dirname, path, formidable, XLSX);

// development only
if ('development' == app.get('env')) {

    app.use(express.errorHandler());
}

//.... redirect to login page .... ///
app.get('/', function (req, res) {

    res.sendfile(__dirname + '/public/views/login/loginform.htm');
    // res.sendfile(__dirname + '/public/Views/Login/LDap_LoginForm.html');
});

//Authentication check base on session
app.get('/Home', function (req, res) {
    try {

        //Here getting responce from google authentication Only
        if (req.user == undefined) {

            //  res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
            if (req.session.myemail != undefined) {
                res.sendfile(__dirname + '/public/layout.html');
            }
            else {
                res.sendfile(__dirname + '/public/views/login/loginform.htm');
                // res.sendfile(__dirname + '/public/Views/Login/LDap_LoginForm.html');
            }

        }
        else if (req.user != undefined) {
            if (JSON.stringify(req.user.emails) != undefined) {
                sess = req.session;
                sess.myemail = req.user.emails[0]['value'];
                sess.displayName = req.user.displayName;
                if (sess.RoleId == undefined || sess.RoleId == "undefined") {
                    req.session.authenticated = true;
                    sess.RoleId = 2;
                }
            }
            res.sendfile(__dirname + '/public/layout.html');

        }
    } catch (e) {
        console.log("Error:" + "\t" + "Home" + "\t" + e);
    }
    //Here getting responce from google authentication
})

//.... redirect to unauthorised page .... ///
app.get('/unauthorised', function (req, res) {
    res.sendfile(__dirname + '/public/Views/Home/unauthorised.html');
});

//.... redirect to SecurityData page .... ///
app.get('/SecurityData', function (req, res) {
    res.sendfile(__dirname + '/public/Views/Security/Security.html');
});


//addedNarendra


app.post("/Sidebar_Changes", function (req, res) {

    var url = __dirname + "/public/AceMasterLayout/assets/css/rubuspropert.txt";
    var skincolor = req.body.skincolor;
    var sidemenuHover = req.body.sidemenuHover;


    //if (skincolor == "undefined" || skincolor == undefined) {


    //}
    //fs.writeFile(url, '{"key1":"' + req.body.skincolor + ',"Key2:"' + req.body.sidemenuHover + '"""}', function (err, result) {
    fs.writeFile(url, '{"key":"' + req.body.skincolor + '"}', function (err, result) {
        if (err) {
            return console.log(err);
            res.send(false);
        }
        else {
            res.send(result);
        }
    });
});

app.post("/Sidebar_Changes_Submenu", function (req, res) {


    var url = __dirname + "/public/AceMasterLayout/assets/css/rubussubmenu.txt";
    var skincolor = req.body.skincolor;
    var sidemenuHover = req.body.sidemenuHover;



    fs.writeFile(url, '{"key":"' + req.body.sidemenuHover + '"}', function (err, result) {
        if (err) {
            return console.log(err);
            res.send(false);
        }
        else {
            res.send(result);
        }
    });


});

app.get("/getskincolor", function (req, res) {

    var url = __dirname + "/public/AceMasterLayout/assets/css/rubuspropert.txt";
    fs.readFile(url, function (err, data) {
        if (err) {

            res.send(false);
        }
        else {
            res.send(data);
        }
    });

});

app.get("/Get_Submenu", function (req, res) {
    var url = __dirname + "/public/AceMasterLayout/assets/css/rubussubmenu.txt";
    fs.readFile(url, function (err, data) {
        if (err) {

            res.send(false);
        }
        else {
            res.send(data);
        }
    });

});


/************************************************************************************Sockets For Kafka & MQTT************************************************************************************/

var appdata = Config.app;

////listening port
//http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));

//   // console.log(logfile.__dirname);

//    logcreation.LogFile("", "Server start", 'Express server listening on port ' + app.get('port'))

//});



global.AnalyticsData = new Array();

http.createServer(app).listen(appdata.port, function () {
    console.log('Express server listening on port ' + appdata.port);

    var qry = 'SELECT "id", "connectas", "connectionname", "connectiontype", "databasename", "password", "portnumber", "servername","service", "sqltype", "userid", "username", "Role" FROM "Analytics_M_Connections" ';
    postgresqlDBManager.psql_getdata(qry, null, function (err, response) {
        if (!err) {
            //console.log("Response : " + JSON.stringify(response));
            global.AnalyticsData = response;
            //console.log("Response : " + JSON.stringify(global.AnalyticsData));
        }
        else {
            console.log("Error Reading AnalyticsData : " + err);
        }
    });
});


app.post('/getDatabaseNames', function (req, res) {

    console.log(req.body.dbtype);
});




app.post('/create_Entitymodel_Database', function (req, res) {

    console.log(req.body.dbtype);
    if (req.body.dbtype == "postgre") {

    }
    else {

    }

});
