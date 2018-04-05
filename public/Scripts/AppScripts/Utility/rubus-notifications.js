
/**
 * @author Hanumanth
 * @created date:12-oct-2017
 * @modified by:
 * @modified date:
 */
//.... Usage Example ....///

//CustomAlerts("Success", "Data has been saved", "info_alert", "5000", "almessage");


/**
 * @summary CustomAlerts
 * @param Title 
 * @param Message
 * @param AlertType
 * @param Timetohide
 * @param Id
 * functioncode:rubus-notifications_0001
 */


function CustomAlerts(Title, Message, AlertType, Timetohide, Id) {

    try {
        //needs jquery.gritter.min.css, jquery.gritter.min.js and rubus-gritter.css
        if (AlertType == "success_notification") {
            $.gritter.add({
                title: Title,
                text: Message,
                class_name: 'gritter-success  gritter-light'
            });
        }
        else if (AlertType == "error_notification") {
            $.gritter.add({
                title: Title,
                text: Message,
                class_name: 'gritter-error  gritter-light'
            });
        }

        else if (AlertType == "warning_notification") {

            $.gritter.add({
                title: Title,
                text: Message,
                class_name: 'gritter-warning gritter-light'
            });
        }
        else if (AlertType == "info_notification") {

            $.gritter.add({
                title: Title,
                text: Message,
                class_name: 'gritter-info  gritter-light'
            });
        }
        else if (AlertType == "alert") {
            //needs bootboxmin.js
            bootbox.alert(Message);

        }
        else if (AlertType == "success_alert") {

            bootbox.alert({
                title: Title,
                message: Message
            });

            $(".bootbox-alert").find('.modal-header').css("background-color", "#DFF0D8");
        }
        else if (AlertType == "error_alert") {
            bootbox.alert({
                title: Title,
                message: Message
            });

            $(".bootbox-alert").find('.modal-header').css("background-color", "#F2DEDE");
        }
        else if (AlertType == "info_alert") {

            bootbox.alert({
                title: Title,
                message: Message
            });

            $(".bootbox-alert").find('.modal-header').css("background-color", "#D9EDF7");
        }
        else if (AlertType == "warning_alert") {

            bootbox.alert({
                title: Title,
                message: Message
            });

            $(".bootbox-alert").find('.modal-header').css("background-color", "#8A6D3B");
        }
        else if (AlertType == "confirmation") {
            //needs bootboxmin.js
            bootbox.confirm(Message, function (result) {
                if (result) {

                }
            });

        }
            //<div class="row">
            //               <div class="col-xs-12 col-sm-12 center bold">
            //                   <strong id="almessage" hidden></strong>
            //               </div>
            //           </div>
        else if (AlertType == "success_validation") {
            $("#" + Id).removeClass().addClass('lighter green');
            $("#" + Id).empty().append(Message);
            $("#" + Id).show();
            $("#" + Id).fadeOut(parseInt(Timetohide));
        }
        else if (AlertType == "error_validation") {
            $("#" + Id).removeClass().addClass('lighter red');
            $("#" + Id).empty().append(Message);
            $("#" + Id).show();
            $("#" + Id).fadeOut(parseInt(Timetohide));
        }
        else if (AlertType == "warning_validation") {
            $("#" + Id).removeClass().addClass('lighter orange');
            $("#" + Id).empty().append(Message);
            $("#" + Id).show();
            $("#" + Id).fadeOut(parseInt(Timetohide));
        }
        else if (AlertType == "info_validation") {
            $("#" + Id).removeClass().addClass('lighter blue');
            $("#" + Id).empty().append(Message);
            $("#" + Id).show();
            $("#" + Id).fadeOut(parseInt(Timetohide));
        }

    }
    catch (error) {

    }
}