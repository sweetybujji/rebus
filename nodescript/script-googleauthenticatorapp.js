/**
 * @author Srikanth
 * @created date 09/11/2017
 * @Modified By tejasree
 * @Modified Date 21/04/2018
 */

module.exports = function (app, postgresqlDBManager, AuthanticatorFactor) {
    app.post('/google', function (req, res) {
        var key = req.body.key;
        var uname = req.body.username;
        var qry = 'select "SecretId"  from "Admin_M_Users" where "EmailId"=$1';
        var PolicyData = [req.body.username];
        postgresqlDBManager.psql_getdata(qry, PolicyData, function (err, response) {
            console.log(response[0].SecretId);
            var result = AuthanticatorFactor.verifyToken('' + response[0].SecretId + '', key);
            res.send(result);
        });



    });

    app.post('/deleteloginuserdetails', function (req, res) {


        var querytext = 'DELETE FROM public."Admin_T_UserLoginDetails"';
        querytext += 'WHERE "UserName"=$1 and "BrowserId"=$2 and "IPAddress"=$3';


        var PolicyData = [req.body.username, req.body.browserid, req.body.id];
        postgresqlDBManager.PSQL_getdata(querytext, PolicyData, function (err, response) {
            if (!err) {

                res.send(response);
            }
            else {
                res.send(false);

            }
        });
    });

};
