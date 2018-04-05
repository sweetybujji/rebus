
/**
 * @author Manikanta
 * @created date 12/10/2017
 * @Modified By Manikanta
 * @Modified Date 12/10/2017
 *
 */

/**
 * @summary fn_errorNotification to show error alerts
 * @param status eg:400,404,500,00
 * @param ajax error callback jqXHR
 * @param exception 
 * @param error message 
 * @param type(type of notification to show) 
 * @param transitiontime 
 * @param alertid--dynamic id for validation alerts
 * functioncode:fn_errorNotification_0001
 */

function fn_errorNotification(status,jqXHR, exception, errmsg,type,transitiontime,alertid) {
    var msg = '';
    if (status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (status == "400") {
        msg = "Server understood the request, but request content was invalid.";
    }
    else if (status == "401") {
        msg = "Unauthorized access.";
    }
    else if (status == "403") {
        msg = "Forbidden resource can't be accessed.";
    }
    else if (status == "404") {
        msg = "Requested page not found. [404]";
    }
    else if (status == "500") {
        msg = "Internal Server Error [500].";
    }
    else if (status == "503") {
        msg = "Service unavailable.";
    }

    else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = exception ;
    }
    msg += "\n" + errmsg;

 
    CustomAlerts("Error", msg, type, transitiontime, alertid)

   // CustomAlerts("Success", "Data has been saved", "success_notification", "5000", "almessage");

   // alert(msg);
}





/**
 * @summary fn_SuccessNotification to show success alerts
 * @param msg 
 * @param type
 * @param transitiontime 
 * @param alertid--dynamic id for validation alerts
 * functioncode:fn_SuccessNotification_0001
 */

function fn_SuccessNotification(Msg, type, transitiontime, alertid) {
    
    CustomAlerts("Success", Msg, type, transitiontime, alertid)

}

