/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By Hanumanth
 * @Modified Date 09/11/2017
 */

module.exports = function (app, postgresqlDBManager, Email, generator, bcrypt,salt) {
    /**
 * @summary Checking User details exists or not
 * @return res
 * @return cb
 */
    app.post('/authsendpassword', function (req, res) {
        try {

            var query = 'select * from "Admin_M_Users"';
            query += ' where "EmailId"=';
            query += "'" + req.body.Email + "'";

            postgresqlDBManager.psql_getdata(query, null, function (err, response) {

                if (!err) {
                    if (response != "" && response != "[]" && response != [] && response != "null" && response != null) {

                        //generator password
                        var Password = generator.generate({
                            length: 8,
                            numbers: true
                        });
                        //    console.log("Password: " + Password);
                        var passwordToSave = bcrypt.hashSync(Password, salt);

                        var query = ' UPDATE public."Admin_M_Users"';
                        query += ' SET "Password"=$1 WHERE "EmailId"=$2';

                        var PolicyData = [passwordToSave, req.body.Email];
                        var HtmlData = '<b>Hi User,</b><br/>';
                        HtmlData += "<br/>";
                        HtmlData += ' Your password Has been Updated Sucessfully....!<br/>';
                        HtmlData += "<br/>";
                        HtmlData += "<br/>";
                        HtmlData += ' User Name :' + req.body.Email + '<br/>';
                        HtmlData += ' Password :' + Password + '<br/>';
                        HtmlData += "<br/>";
                        HtmlData += "<br/>";
                        HtmlData += "<br/>";
                        HtmlData += "Thanks & Regards,<br/>";
                        HtmlData += "Envision Enterprise Solutions Pvt Ltd,<br/>";
                        HtmlData += "Hyderabad<br/>";

                        //Send Email To Use

                        Email.SendEmail('enterprise360@envisionesl.com', req.body.Email, 'Password Reset', HtmlData, function (error, result) {
                       if(!error){

                         postgresqlDBManager.psql_insertdata(query, PolicyData, function (err, response) {
                             if (!err) {
                                console.log(req.body.Email)

                             }
                             else {

                                 res.end("false");
                             }
                         });


                          }
                          else {
                            res.send("false");
                          }

                        });


                    }
                    else {
                        res.end("false");
                    }
                }
            });
        }
        catch (er) {
            res.end(er.message);
        }
    });

};
