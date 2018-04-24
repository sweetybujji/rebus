/**
 * @author Hanumanth
 * @created date 09/11/2017
 * @Modified By Hanumanth
 * @Modified Date 09/11/2017
 */

module.exports = function (app) {


    /**
     * @summary Loading Captcha Images in Login screen
     */

    var captchapng = require('captchapng');

    app.get('/LoadLoginCaptcha', function (req, res) {

        var rn = parseInt(Math.random() * 9000 + 1000);
        var p = new captchapng(80, 30, rn);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255);

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        var valicode = new Buffer(imgbase64).toString('base64');

        res.status(200).json({
            "validcode": valicode,
            "number": rn
        });
    })


};
