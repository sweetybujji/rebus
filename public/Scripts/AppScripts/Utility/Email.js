/**
 * @author Narendra Created 09/10/2017
 *
 */
var sendmail = require('sendmail')();
var CronJob = require('cron').CronJob;
/**
 * @summary Send Email from Without Scheduled time
 * @param FormMail Means SenderMail address
 * @param ToEMail Means Receiver Email address
 * @param Subject Means textName 
 * @param Message Means textmessage Ex:Helloworld
 * @param callback (function call)
 * functioncode:Rubus_SendMail_0001
 */
exports.SendEmail = function (FromMail, ToEmail, Subject, Message, callback) {
    try {
        sendmail({
            from: FromMail,
            to: ToEmail,
            subject: Subject,
            html: Message,
        }, function (err, reply) {
            if (err) {
                callback(err, "");
            }
            else {
                callback(false, reply);
            }
            //console.dir(reply);
        });
    } catch (e) {
        console.log("Error:" + "\t" + "SendEmail" + "\t" + e);
    }

};

/**
 * @summary Send Email from With Scheduled time
 * @param secs Means set Time in Seconds Ex:05(5 sec)
 * @param minutes Means set Time in Minutes Ex:06(6 min)
 * @param hours Means set Time in Hours Ex:17(17 hour) Here 24 hour format
 * @param month Means MonthName Year in Month Ex:January,September,etc..,
 * @param dayofmonth Means day of the week Ex:Monday,sunday, etc..,
 * @param dayofweek Means day of the week Ex:Monday,sunday, etc..,
 * @param FormMail Means SenderMail address
 * @param ToEMail Means Receiver Email address
 * @param Subject Means textName 
 * @param Message Means textmessage Ex:Helloworld
 * @param callback (function call)
 * functioncode:Rubus_SendEmail_Schedule_0002
 */
exports.SendEmail_Schedule = function (secs, minutes, hours, dayofmonth, month, day_of_week, FromMail, ToEmail, Subject, Message, callback) {
    try {
        var job = new CronJob({
            cronTime: secs + ' ' + minutes + ' ' + hours + ' * * * ',
            onTick: function () {
                //Send Email
                function SendEmail(ToEmail, Subject, Message) {
                    sendmail({
                        from: FromMail,
                        to: ToEmail,
                        subject: Subject,
                        html: Message,
                    }, function (err, reply) {
                        if (err) {
                            console.log(err);
                        }
                        console.dir(reply);
                    });
                }

            },
            start: false,
            timeZone: 'Asia/Kolkata'
        });
        job.start();
    } catch (e) {
        console.log("Error:" + "\t" + "SendEmail_Schedule" + "\t" + e);
    }

}