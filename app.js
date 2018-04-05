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
var bcrypt = require('bcrypt');
var AuthanticatorFactor = require('node-2fa');0
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
var postgresqlDBManager = require('./public/Scripts/AppScripts/Utility/PostgresqlAPI.js');
var Email = require('./public/Scripts/AppScripts/Utility/Email.js');



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

var client = new cassandra.Client({
    contactPoints: ['192.168.4.187:9042'],
    keyspace: 'elogsheet'
    //keyspace: 'rubuscore'
});

client.connect(function (err) {
    if (!err) {
        console.log("Successfully connected to the Rubus Cassandra database");
    }
    else {
        console.log("ERROR : " + err);
    }
});
// Connect to the cassandra database before starting the application server.

app.configure(function () {
    app.use(session({
        secret: 'RUBUSAPP',
        resave: false,
        cookie: { maxAge: parseInt(User_SessionTime) * 60 * 1000 }, // 60*20*1000
        // cookie: { maxAge: 10000 },
        rolling: true,     //Reset the cookie Max-Age on every request
        saveUninitialized: true, //Don't create a session for anonymous users

    }));

    app.use(flash());
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(express.bodyParser());
    app.use(bodyparser.json());
    app.use(express.methodOverride());
    //app.use(checkAuth);
    //app.use(app.router);
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'Side_Top_Menu')));
});


//..... checkAuth
//function checkAuth(req, res, next) {
//    try {
//        sess = req.session;
//        if (req.url === '/Home' && (!req.session || !req.session.authenticated) && req.user == undefined && req.session == undefined) {
//            res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
//            return;
//        }
//        else {
//            if (req.session.myemail != undefined) {
//                req.session.touch();
//            }
//        }
//    }
//    catch (e) {
//        console.log("Error:" + "\t" + "CheckSession" + "\t" + e);
//    }
//    next();
//}

////....... Utility Data Connectivity ....... ////

//var rest_Custom = require('./public/Scripts/AppScripts/Utility/rubus-rest.js');
//var rest_Custom = require('./public/Scripts/AppScripts/Utility/rubus-soap.js');
//var CassandraDBManager = require('./public/Scripts/AppScripts/Utility/CassandraAPI.js');

////....... Server app scripts ....... ////
//var client=require('./public/Scripts/ServerScripts/CassandraConApp.js')(cassandra);
//require('./public/Scripts/ServerScripts/PasswordPolicyApp.js')(app, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/RoleBasedFormAccessApp.js')(app, postgresqlDBManager);


//require('./public/Scripts/ServerScripts/AnalyticsApp.js')(app, cassandra, mongodb, XLSX, fs, jsonxml, parser, XMLbuilder, xml2js, download, __dirname, sql, path, formidable, _, DataConnectivity, kafka, Producer, Consumer, socket, mqtt, soap, XMLHandler, xmlHandler, util, CircularJSON, WSDL, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/GoogleStrategyApp.js')(app, passport, GoogleStrategy, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/PassportlocalApp.js')(app, passport, postgresqlDBManager, LocalStrategy, bcrypt);
require('./public/Scripts/ServerScripts/UsersApp.js')(app, postgresqlDBManager, bcrypt, AuthanticatorFactor, Email, generator, salt);
//require('./public/Scripts/ServerScripts/DynamicMenuApp.js')(app, postgresqlDBManager, fs, path, __dirname);
//require('./public/Scripts/ServerScripts/DomainModelApp.js')(app, cassandra, fs, client, _, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/MicroflowApp.js')(app, cassandra, fs, client, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/SampleCrudApp.js')(app, postgresqlDBManager, CassandraDBManager);
//require('./public/Scripts/ServerScripts/ChangePwdApp.js')(app, postgresqlDBManager, bcrypt, Email, salt);
//require('./public/Scripts/ServerScripts/CaptchaApp.js')(app);
//require('./public/Scripts/ServerScripts/ForgotpwdaApp.js')(app, postgresqlDBManager, Email, generator, bcrypt, salt);
//require('./public/Scripts/ServerScripts/LDAPApp.js')(app, ldap, assert);
//require('./public/Scripts/ServerScripts/ExcelApp.js')(app, fs);
//require('./public/Scripts/ServerScripts/PDFApp.js')(app, htmlToPdf);
//require('./public/Scripts/ServerScripts/EmployeeApp.js')(app, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/PasswrdpolicyfunctionalityApp.js')(app, postgresqlDBManager, __dirname);
//require('./public/Scripts/ServerScripts/LogoutApp.js')(app, postgresqlDBManager);
//require('./public/Scripts/ServerScripts/GoogleAuthenticatorApp.js')(app, postgresqlDBManager, AuthanticatorFactor);
//require('./public/Scripts/ServerScripts/ELogsheetApp.js')(app, fs, postgresqlDBManager, __dirname, path, formidable);

// development only
if ('development' == app.get('env')) {

    app.use(express.errorHandler());
}

//.... redirect to login page .... ///
app.get('/', function (req, res) {

    res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
    // res.sendfile(__dirname + '/public/Views/Login/LDap_LoginForm.html');
});

//Authentication check base on session
app.get('/Home', function (req, res) {
    try {

        //Here getting responce from google authentication Only
        if (req.user == undefined) {
            //  res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
            if (req.session.myemail != undefined) {

            }
            else {
                //  res.sendfile(__dirname + '/public/Views/Login/LoginForm.html');
                // res.sendfile(__dirname + '/public/Views/Login/LDap_LoginForm.html');
                res.sendfile(__dirname + '/public/Views/Layout.html');
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
            res.sendfile(__dirname + '/public/Views/Layout.html');

        }
    } catch (e) {
        console.log("Error:" + "\t" + "Home" + "\t" + e);
    }
    //Here getting responce from google authentication
})




//addedNarendra






app.post("/Login_Details", function (req, res) {

    try {
        console.log(req.body);
        if (req.body.username == "envision@admin.com" && req.body.password == "memory@123") {

            res.send(true);

        }
        else {
            res.send(false);

        }

    } catch (e) {
        console.log("Error:" + "\t" + "Auth_login" + "\t" + e);
    }



});


app.get("/logout", function (req, res) {

    res.send(true);

});



app.post('/Savepolicydetails',function(req,res){

console.log(req.body);
//console.log(JSON.stringify(newSecret.secret));


var qry = 'Insert into "policy" ("policyname","status","minimumnoofcharaters","maxnoofcharaters","passwordexpirydays","sessionexpirytime","allowspecialcharaters","specialcharaters","number","uppercase","lowercase","setpassword","Multiple","checkboxcheck","checkboxchecked")';
qry += "values('" + req.body.policyname + "','" + req.body.status + "','" + req.body.minimumcharaters + "','" + req.body.maxmumcharaters + "','" + req.body.passwordexp + "','" + req.body.Session + "','" + req.body.allow + "','" + req.body.SpecialCharater + "','" + req.body.Numberrequire + "','" + req.body.UpperCase + "','" + req.body.LowerCase + "','" + req.body.SetPassword + "','" + req.body.MultipleSession + "','" + req.body.checkactive + "','" + req.body.checkactiveed + "')";
console.log("Saved Query"+qry);

postgresqlDBManager.PSQL_InsertData(qry,"",function (err, response) {
    if (!err) {
        res.send("User Successfully Created");

    }
    else {
        console.log("Error Inserting Data in SaveUserDetails");
        res.status(200).json({ "error": err.message });
    }
});
});
app.post("/updatepolicy", function (req, res) {

    try {
        // if (req.session.authenticated === true) {
        var query = ' UPDATE public."policy"';
        query += ' SET "policyname"=$1, "status"=$2,  "minimumnoofcharaters"=$3, "maxnoofcharaters"=$4, "passwordexpirydays"=$5, "sessionexpirytime"=$6, "allowspecialcharaters"=$7, "specialcharaters"=$8,"number"=$9, "uppercase"=$10,"lowercase"=$11,"setpassword"=$12,"Multiple"=$13 ,"checkboxcheck"=$14 ,"checkboxcheck"=$15 WHERE "policyname"=$16';
        console.log(query)
      var PolicyData = [req.body.policyname, req.body.status, req.body.minimumcharaters, req.body.maxmumcharaters, req.body.passwordexp, req.body.Session, req.body.allow,  req.body.SpecialCharater, req.body.Numberrequire,req.body.UpperCase,req.body.LowerCase,req.body.SetPassword,req.body.MultipleSession,req.body.checkactive,req.body.checkactiveed,req.body.policyname];

      console.log(PolicyData)
        postgresqlDBManager.PSQL_InsertData(query,PolicyData, function (err, response) {
            if (!err) {
                res.send("User Updated Successfully");
            }
            else {
                res.send(false);
            }
        });
        // }

        //  else {
        //  res.send({ "isauthenticated": false });

        //}
    } catch (e) {
        console.log("Error:" + "\t" + "Update" + e);
    }


});
app.get("/policy_list", function (req, res) {
    try {
        //     if (req.session.authenticated === true) {
         var qry = 'select * from "policy"';

      //  var qry = 'SELECT amu."Id",amu."EmployeeId",amu."Firstname",amu."Lastname", amu."EmailId",amu."chk_active","Admin_T_Roles"."RoleName","Admin_T_Roles"."RoleId" as "Role"  FROM "Admin_M_Users" as amu INNER JOIN "Admin_T_Roles"  ON CAST (amu."Role" as Integer) = "Admin_T_Roles"."RoleId";';

        console.log(qry);
        postgresqlDBManager.PSQL_getdata(qry, "", function (err, response) {
            if (!err) {
                res.send(response);
            }
            else {
                res.send(false);
            }
        });
        // }

        //else {
        // res.send({ "isauthenticated": false });


        // }
    } catch (e) {
        console.log("Error:" + "\t" + "User_List" + e);
    }



});
app.post("/Deletepolicy", function (req, res) {
  console.log("hiii");
    //try {
        //  if (req.session.authenticated === true) {
        var data = req.body[0];
    console.log(data.id)


        var query = 'Delete from "policy"';
           query += ' where "policyname"=';
          query += "'" + data.id + "'";
          console.log(query)
        postgresqlDBManager.PSQL_getdata(query, "", function (err, response) {
            if (!err) {
                res.send("User Deleted Successfully");
            }
            else {
                res.send(false);
            }
        });
        // }

        // else {
        //    res.send({ "isauthenticated": false });

        // }

  //  } catch (ex) {
      //  res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
  //  }
});
app.post('/getpolicydata', function (req, res) {
  //console.log("hiii")
 try {
       //console.log("hiii")
        //  if (req.session.authenticated === true) {
        var data = req.body[0];
        //console.log(data.id);
        var query = 'select * from "policy"';
        query += ' where "policyname"=';
        query += "'" + data.id + "'";

       console.log(query);
        postgresqlDBManager.PSQL_getdata(query, null, function (err, response) {
            if (!err) {
                res.send(response);
                console.log(response);
            }
            else {
                res.send(false);
            }
        });
        // }

        //  else {
        //res.send({ "isauthenticated": false });

        // }
    } catch (ex) {

        res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
    }

});
app.post("/updatedrg", function (req, res) {
 console.log(req.body.textdata);
 console.log("mydata : " + req.body.data);


 var qry='INSERT INTO public.myfirstexample(formname, jsonarray)';
	qry +="VALUES ('"+req.body.textdata+"','"+req.body.data+"')";

  //var qry= 'Insert into "myfirstexample"("formname","jsonarray")';
  //qry += "values('"+req.body.textdata+"', '"+req.body.data+"')"
 //  var qry = 'Insert into "policy" ("policyname","status","minimumnoofcharaters","maxnoofcharaters","passwordexpirydays","sessionexpirytime","allowspecialcharaters","specialcharaters","number","uppercase","lowercase","setpassword","Multiple","checkboxcheck","checkboxchecked")';
 //  qry += "values('" + req.body.policyname + "','" + req.body.status + "','" + req.body.minimumcharaters + "','" + req.body.maxmumcharaters + "','" + req.body.passwordexp + "','" + req.body.Session + "','" + req.body.allow + "','" + req.body.SpecialCharater + "','" + req.body.Numberrequire + "','" + req.body.UpperCase + "','" + req.body.LowerCase + "','" + req.body.SetPassword + "','" + req.body.MultipleSession + "','" + req.body.checkactive + "','" + req.body.checkactiveed + "')";
 // // console.log("Saved Query"+qry);
 //

 console.log(qry);
  postgresqlDBManager.PSQL_InsertData(qry,"",function (err, response) {
      if (!err) {
          res.send("User Successfully Created");
 //
      }
      else {
          console.log("Error Inserting Data in SaveUserDetails");
          res.status(200).json({ "error": err.message });
      }
  });



});

app.get("/drag_list", function (req, res) {
  console.log("get")
    try {
        //     if (req.session.authenticated === true) {
         var qry = 'select * from "myfirstexample"';

      //  var qry = 'SELECT amu."Id",amu."EmployeeId",amu."Firstname",amu."Lastname", amu."EmailId",amu."chk_active","Admin_T_Roles"."RoleName","Admin_T_Roles"."RoleId" as "Role"  FROM "Admin_M_Users" as amu INNER JOIN "Admin_T_Roles"  ON CAST (amu."Role" as Integer) = "Admin_T_Roles"."RoleId";';
        //console.log('hii')
        //console.log(qry);
        postgresqlDBManager.PSQL_getdata(qry, "", function (err, response) {
            if (!err) {
                res.send(response);
            }
            else {
                res.send(false);
            }
        });
        // }

        //else {
        // res.send({ "isauthenticated": false });


        // }
    } catch (e) {
        console.log("Error:" + "\t" + "User_List" + e);
    }

})
app.post("/deletedrag", function (req, res) {
  console.log("hiii");
    //try {
        //  if (req.session.authenticated === true) {
        var data = req.body[0];
    console.log(data.id)


        var query = 'Delete from "myfirstexample"';
           query += ' where "formname"=';
          //query += "'" + data.id + "'";
          console.log(query)
        postgresqlDBManager.PSQL_getdata(query, "", function (err, response) {
            if (!err) {
                res.send("User Deleted Successfully");
            }
            else {
                res.send(false);
            }
        });
        // }

        // else {
        //    res.send({ "isauthenticated": false });

        // }

  //  } catch (ex) {
      //  res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
  //  }
});

app.post('/getdropdata', function (req, res) {
  console.log("hiii")
 try {
       //console.log("hiii")
        //  if (req.session.authenticated === true) {
        var data = req.body[0];
      console.log(req.body)
        //console.log(data.id);
        var query = 'select * from "myfirstexample"';
        query += ' where "formname"=';
        query += "'" + data.id + "'";

       console.log(query);
        postgresqlDBManager.PSQL_getdata(query, null, function (err, response) {
            if (!err) {
                res.send(response);
                console.log(response);
            }
            else {
                res.send(false);
            }
        });
        // }

        //  else {
        //res.send({ "isauthenticated": false });

        // }
    } catch (ex) {

        res.status(200).json({ "error": "error at Userupdatedata : " + ex.message });
    }

});


//listening port
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
