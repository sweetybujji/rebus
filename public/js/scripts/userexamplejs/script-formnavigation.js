

//..... navigation usage example .............///
//<!-- <button class="btn btn-lg btn-info" style="margin-left: 20px; margin-top: 20px;" onclick="navigation('#MicroFlow','inpage')">Navigation</button>-->
//..... navigation usage example .............///

//..... navigation usage popup html code.............///
//<div id="Confirm_Modal" class="modal fade" role="dialog">
//    <div class="modal-dialog">
//        <div class="modal-content">
//            <div class="modal-body">
//                <button aria-hidden="true" data-dismiss="modal" class="bootbox-close-button close" type="button" style="margin-top: -10px;">×</button><div class="bootbox-body">Are you sure?</div>
//            </div>
//            <div class="modal-footer">
//                <button class="btn btn-default" type="button" data-dismiss="modal" data-bb-handler="cancel">Cancel</button>
//                <button class="btn btn-primary" id="confirmok" data-dismiss="modal" type="button" data-bb-handler="confirm">OK</button>
//            </div>
//        </div>
//    </div>
//</div>
//..... navigation usage popup html code.............///


/* Function for type of form navigation,pass two parameters url,type.
    url:-Navigation path
    type:-inpage,newtab,pop-up.
 */

function navigation(url, type) {
    if (type == "inpage") {
        window.location.href = url;
    }
    if (type == "newtab") {
        window.open(url);
    }
    if (type == "modelpopup") {
        $('#' + url).modal('show');
    }
}

/* Function to disable right click in forms*/
function disableRightClick() {
    $(document).bind("contextmenu", function (e) {
        return false;
    });
}