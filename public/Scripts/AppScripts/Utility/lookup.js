
////////////////////////////////////Narendra Lookup Scripts//////////////////////////////////////////////

/**
* @summary textbox lookup using parameters
* @param data Means ajax call responce
* @param tableid Means  Creation tableid
* @param colname Means form query Slected Columnname
* functioncode:Rubus_fn_Lookup_Utility_textbox_0001
*/

function fn_Lookup_Utility_textbox(data, tableid, colname, textboxId,fn_name) {
    try {
        
        alert("welcome");
        var html = '<div class="col-sm-12 table-header visible_list" style="background-color: #438eb9;">';
        html += '<label style="color: white; font: bold;">List of Master table</label>';
        html += '</div>';
        html += '<table id=' + tableid + ' class="table table-bordered" style=""><thead><tr>';
        var j = 0;
        $.each(data, function (key, value) {
            if (j == 0) {
                $.each(value, function (key, value) {
                    html += '<th>' + key + '</th>';
                });
                j++;
            }
            else {
                return true;
            }
        });


        html += '</tr></thead>';
        html += '<tbody>';
        $.each(data, function (key, value) {
            html += '<tr col=' + colname + ' name="' + textboxId + '" fn_name="' + fn_name + '"  onclick="fn_getdata(this)" style="cursor:pointer;" >';
            $.each(value, function (Key, value) {
                html += '<td>' + value + '</td>';
            });
            html += "</tr>";
        });
        html += '</tbody></table>';

        bootbox.prompt("Master List", function (result) {
            if (result === null) {

            } else {

            }
        });

        $(".bootbox ").css("display", "block");
        $(".btn-primary").css("display", "none");

        $("#div_" + tableid).empty();
        $("#div_" + tableid).append(html);
        $(".bootbox-body").empty();
        $(".bootbox-body").append(html);



        var colindex;

        $(" thead tr th").each(function () {
            // alert($(this).html());
            if ($(this).html() == colname) {
                colindex = $(this).index() + 1;

            }

        });
        $("#" + tableid).find('td:nth-child(' + colindex + ')').css("background-color", "lavender");
        $("#" + tableid).find('td:nth-child(' + colindex + ')').addClass("arr");

        var table = $("#" + tableid).DataTable();
        table.destroy();

        $("#" + tableid).DataTable({

            "scrollX": true,
            //"width": "100%"

        });

    } catch (e) {
        alert("Error :" + "\t" + "fn_Lookup_Utility_textbox" + e);
    }
}

/**
* @summary textbox lookup using parameters
* @param data Means ajax call responce
* @param tableid Means  Creation tableid
* @param colname Means form query Slected Columnname
* functioncode:Rubus_fn_Lookup_Utility_textbox_td_0002
*/
function fn_Lookup_Utility_textbox_table_td(data, tableid, colname, textboxId) {
    try {
        var html = '<div class="col-sm-12 table-header visible_list" style="background-color: #438eb9; margin-top: -24px;">';
        html += '<label style="color: white; font: bold;">List of Form  </label>';
        html += '</div><table id=' + tableid + ' class="table table-bordered"><thead><tr>';
        var j = 0;
        $.each(data, function (key, value) {
            if (j == 0) {
                $.each(value, function (key, value) {

                    html += '<th>' + key + '</th>';
                });
                j++;
            }
            else {
                return true;
            }
        });


        html += '</tr></thead>';
        html += '<tbody>';
        $.each(data, function (key, value) {
            html += '<tr col=' + colname + ' >';
            $.each(value, function (Key, value) {
                html += '<td  td_val=' + value + ' name="' + textboxId + '"  onclick=fn_tdSelect(this)>' + value + '</td>';
            });
            html += "</tr>";
        });
        html += '</tbody></table>';

        bootbox.dialog({
            message: '<div class="row" id=div_data></div>',
            buttons:
            {

                "button":
                {
                    "label": "Close",
                    "className": "btn-sm"
                }
            }


        });
        $('.modal-dialog').addClass('modal-lg');
        $("#div_data").append(html);
        $("#" + tableid).DataTable().destroy();
        // $("#" + tableid).find('td:nth-child(' + colname + ')').css("background-color", "lavender");
        $("#" + tableid).find('td:nth-child(' + colname + ')').addClass("view overlay hm-blue-light");


        $("#" + tableid).DataTable({
            "bdestroy": true,
            "aaSorting": [],
            "scrollX": true
        });

    } catch (e) {
        alert("Error :" + "\t" + "fn_Lookup_Utility_textbox" + e);
    }
}

/**
* @summary DropDown lookup using parameters
* @param data Means ajax call responce
* @param selectid Means  Bind dropdown id
* @param colname Means form query Slected Columnname
* functioncode:Rubus_fn_Lookup_Utility_Dropdown_0003
*/
function fn_Lookup_Utility_Dropdown(data, selectid, colname) {
    try {
        var Drp_Option = '<option value=""> Select</option>';
        for (var i = 0; i < data.length; i++) {
            Drp_Option += '<option>' + data[i]['' + colname + ''] + '</option>';
            $("#" + selectid).append(Drp_Option);
        }
    } catch (e) {
        alert("Error:" + "\t" + "fn_Lookup_Utility_Dropdown" + e);
    }
}

/**
* @summary above fn_Lookup_Utility_textbox datatable td click
* functioncode:fn_getdata_0004
*/
function fn_tdSelect(obj, id) {
    var txt_value = $(obj).attr("td_val");
    var txt_id = $(obj).attr("name");
    //$("#txt_id").val(txt_value);

    alert(txt_id);
    $("#" + id).val(txt_value);
    //$(".bootbox ").fadeOut();
    bootbox.hideAll();
}

/**
* @summary above fn_Lookup_Utility_textbox datatable tr click
* functioncode:fn_getdata_0005
*/
function fn_getdata(obj) {

   
    var txt_value = $(obj).attr("col");
    var txt_id = $(obj).attr("name");
    var fn_name = $(obj).attr("fn_name");
    var myindex = $(obj).find('.arr').html();

  
    $("#" + txt_id).val(myindex);
    //alert(fn_name);
  

    // $("#Drp_val").append("<option>" + txt_value + "</option>")
    // $(".bootbox ").fadeOut();
    // $(".bootbox ").css("display","none");
    //obj.preventDefault();
    //$(".bootbox").close();
    bootbox.hideAll();
   // fn_name();
    if (fn_name == undefined || fn_name == 'undefined') {

    }
    else {
        window[fn_name]();
    }
}

////////////////////////////////////Narendra Lookup Scripts//////////////////////////////////////////////