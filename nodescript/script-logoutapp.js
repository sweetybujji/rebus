/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By Hanumanth
 * @Modified Date 09/11/2017
 */

module.exports = function (app, postgresqlDBManager) {


    app.post('/UpdateUserLogOut', function (req, res) {
    
        try {

            var Ip = req.body.Ip;
            var BrowserId = req.body.BrowserId;
            var datetime = req.body.datetime;
            var query = 'INSERT INTO public."Admin_T_UserLoginDetails"("BrowserId", "IPAddress", "Count", "LoginTime", "UserName","BrowserName","Description") VALUES ($1, $2, $3, $4, $5,$6,$7);';

            var PolicyData = [BrowserId, Ip, "true", datetime, req.session.myemail, req.body.browser_version[0] + "_" + req.body.browser_version[1], "Logout"];

            postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {

                if (!err) {

                    res.end("Success");
                }
                else {

                    res.end(err.message);
                }
            });
        }
        catch (er) {
            res.end(er.message);
        }
    });
};
