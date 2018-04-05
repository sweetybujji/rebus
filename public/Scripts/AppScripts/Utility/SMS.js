/**
 * @author Narendra Created 09/10/2017
 *
 */
var request = require('request');
var CronJob = require('cron').CronJob;

/**
 * @summary SendSMS from SMS Service
 * @param URl:It Should contains Method Name. Eg:http://bhashsdsms.com/api/sendmsg.php?user=b@matrimony&pass=b@matrimony&sender=BYAAHA&phone=mobilenumber&text=textmessage&priority=ndnd&stype=normal
 * @param callback (function call)
 * functioncode:Rubus_SendSMS_0001
 */

//exports.SendSMS = function (mobilenumber, textmessage) {
exports.SendSMS = function (url, callback) {
    try {
        //request('http://bhashsms.com/api/sendmsg.php?user=b@matrimony&pass=b@matrimony&sender=BYAAHA&phone=mobilenumber&text=textmessage&priority=ndnd&stype=normal',
        request('' + url + '',
           function (error, response, body) {
               if (!error && response.statusCode === 200) {
                   console.log(body); // Print the google web page.
               }
               else {
                   console.log(error);
               }
           });
    } catch (e) {
        console.log("Error:" + "\t" + "SendSMS" + "\t" + e);
    }

}

/**
 * @summary SendSMS from SMS Service
 * @param secs Means set Time in Seconds Ex:05(5 sec)
 * @param minutes Means set Time in Minutes Ex:06(6 min)
 * @param hours Means set Time in Hours Ex:17(17 hour) Here 24 hour format
 * @param month Means MonthName Year in Month Ex:January,September,etc..,
 * @param dayofmonth Means day of the week Ex:Monday,sunday, etc..,
 * @param dayofweek Means day of the week Ex:Monday,sunday, etc..,
 * @param URl:It Should contains Method Name. Eg:http://bhashsdsms.com/api/sendmsg.php?user=b@matrimony&pass=b@matrimony&sender=BYAAHA&phone=mobilenumber&text=textmessage&priority=ndnd&stype=normal
 * @param callback (function call)
 * functioncode:Rubus_SendSMS_Schedule_0002
 */
//exports.SendSMS_Schedule = function (secs, minutes, hours, dayofmonth, month, day_of_week, mobilenumber, textmessage) {
exports.SendSMS_Schedule = function (secs, minutes, hours, dayofmonth, month, day_of_week, url, callback) {
    try {
        var job = new CronJob({
            cronTime: secs + ' ' + minutes + ' ' + hours + ' * * * ',
            onTick: function () {
                //Send SMS
                // request('http://bhashsms.com/api/sendmsg.php?user=b@matrimony&pass=b@matrimony&sender=BYAAHA&phone=mobilenumber&text=textmessage&priority=ndnd&stype=normal',
                request('' + url + '',
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body); // Print the google web page.
            }
            else {
                console.log(error);
            }
        });
            },
            start: false,
            timeZone: 'Asia/Kolkata'
        });
        job.start();
    } catch (e) {
        console.log("Error:" + "\t" + "SendSMS_Schedule" + "\t" + e);
    }

}