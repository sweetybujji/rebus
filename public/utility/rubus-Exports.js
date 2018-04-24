
/**
 * @summary ExportToExcel
 * @param tableId
 * functioncode:rubus-Exports_0001
 */

function ExportToExcel(tableId) {
    StartPageLoader();
    try {
        var HtmlData = "<table border='1' style='border-collapse: collapse;'>";
        HtmlData += $("#" + tableId).html();
        HtmlData += "</table>";
        $.ajax({
            url: "/ExportExcel",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ data: HtmlData }),
            success: function (response) {
                StopPageLoader();
                if (response == "true") {
                    window.open("../../download");
                }
                else {
                    fn_errorNotification("200", response, response, "error occured at ExportToExcel", "error_alert", "", "");
                }
            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at ExportToExcel", "error_alert", "", "");
            }
        });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification("200", e, e, "error occured at ExportToExcel", "error_alert", "", "");
    }

}

/**
 * @summary ExportToPdf
 * @param tableId
 * functioncode:rubus-Exports_0002
 */
function ExportToPdf(tableId) {
    StartPageLoader();
    try {
        var HtmlData = "<table border='1' style='border-collapse: collapse;font-size:10px;'>";
        HtmlData += $("#" + tableId).html();
        HtmlData += "</table>";
        $.ajax({
            url: "/ExportPdf",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ data: HtmlData }),
            success: function (response) {
                StopPageLoader();
                if (response == "true") {
                    window.open("../../downloadPdf");
                }
                else {
                    fn_errorNotification("200", response, response, "error occured at ExportToPdf", "error_alert", "", "");
                }
            },
            error: function (jqXHR, exception) {
                StopPageLoader();
                fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at ExportToPdf", "error_alert", "", "");
            }
        });
    } catch (e) {
        StopPageLoader();
        fn_errorNotification("200", e, e, "error occured at ExportToPdf", "error_alert", "", "");
    }
}