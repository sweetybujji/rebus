//initializing backbone model


var Table = Backbone.Model.extend({
    initialize: function () {
    }
});
var Tables = Backbone.Collection.extend({
    initialize: function () {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.bind('change', this.onModelUpdate, this);
    },
    //Assigning variable to model

    model: Table,
    onModelAdded: function (model, collection, options) {
        //creating table template and appending
        var target = model.get("target");
        var $targetref;
        var tabletamplate = '<div class="bi-widget-item"  style="margin-bottom: 10px;padding:5px;width: 100%"><div id="' + model.get("id") + '" style="width:' + (parseInt(model.get("Table_Style").TableWidth)) + '" class="tablescope"><div id="expanddiv_' + model.get("id") + '" style="float: right;width: 5%;display:block;"><button id="expand_' + model.get("id") + '" class="borderless expand" dataexpand-id="' + model.get("id") + '" style=" font-size: 10pt;margin: 0;padding: 0 0 10px;display:none;" title="Chart Full Screen"><i class="icon-fullscreen"></i></button></div><br/><table class="cx-table tblheaders" style="width:100%;border-right-width:1px;"><tbody></tbody></table><table class="cx-table overview tbloverview"   style="width:100%;border-right-width:1px;border-bottom-width:1px;height:' + model.get("Table_Style").TableHeight + "px" + ';"><thead style="display:none"></thead><tbody></tbody></table><table class="cx-table tblfooter" style="width:100%;border-right-width:1px;display:' + model.get("Table_Style").ResultVisibility + ';"><tbody></tbody></table></div></div>';
        if (model.get("type") != "widget") {
            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
                $targetref.append(tabletamplate);
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
            if (typeof $targetref.find('.ui-draggable-bi').html() == "undefined") {
                $targetref.append(tabletamplate);
            }
            else {
                $targetref.find('.ui-draggable-bi').replaceWith(tabletamplate);
            }
        }
        var element = $(document.getElementById(model.get("id"))).parent();
        if (model.get("viewer") != true) {
            $(element).click(function (e) {
                e.stopPropagation();
                if (model.get("type") == "widget") {
                    $(".widget-body").sortable("option", "disabled", false);
                }
                $(".widget-drag-handle").remove();
                $(".selectedwidget").removeClass("selectedwidget");
                $(this).addClass("selectedwidget");
                $(this).append('<div class="widget-drag-handle"></div>');

                $("#settingsmenu").attr("data-controlid", model.get("id"));
                $("#settingsmenu").attr("data-controltype", model.get("controltype"));
                $("#deletewidget,#widgetsettings").removeAttr("disabled");
            });
            $(element).click();
            if (model.get("type") == "widget") {

            }
            else {

                $targetref.data("data-controlid", model.get("id"));
                $targetref.data("data-controltype", model.get("controltype"));
                $(element).parent().height(parseInt($targetref.height() - 5));
                $(element).height(parseInt($targetref.height()) - 5);
                var selecteditem = table.byId(table, $("#settingsmenu").attr("data-controlid"));
                var table1 = selecteditem.get("Table_Style");
                table1.TableHeight = parseInt($targetref.height()) - 40;
                selecteditem.unset("Table_Style", { silent: true });
                selecteditem.set({ "Table_Style": table1 }, { silent: true });
            }
        }
        else {
            $(element).find("#expand_" + model.get("id")).show();
        }
        updatetablestructure($(document.getElementById(model.get("id"))), model, "add");
    },
    onModelRemoved: function (model, collection, options) {
        console.log("options = ", options);

    },
    onModelUpdate: function (model, collection, options) {
        var Table_Style = []; var coldata = model.get("columns"); var colobject = ""; var temp = 0; Table_Style = model.get("Table_Style");

        var element = document.getElementById(model.get("id"));
        var target = model.get("target");
        var $targetref;
        if (model.get("type") != "widget") {

            if (target != null) {
                var tableobj = document.getElementById(target.split("@")[0]);
                $targetref = $(tableobj.rows[parseInt(target.split("@")[1])].cells[parseInt(target.split("@")[2])]).find('.layout-cell');
            }
        }
        else {
            $targetref = $(document.getElementById(target)).find('.widget-body');
        }

        Table_Style.TableWidth = $targetref.width() - 15;
        for (var i = 0; i < coldata.length; i++) {
            colobject = coldata[i];
            if ((colobject.width).indexOf("%") == -1) {
                temp = temp + parseInt(colobject.width);

            }
            else {
                temp = temp + (Table_Style.TableWidth * parseInt(colobject.width) / 100);

            }
        }
        Table_Style.TableWidth = temp;
        $("#tablewidth").val(Table_Style.TableWidth);
        $(element).css({ "width": Table_Style.TableWidth });
        $(element).parent().css({ "width": temp + 10 });
        $(element).find(".tbloverview").css({ "height": parseInt(Table_Style.TableHeight) + "px" });
        updatetablestructure(element, model, "update");
        $(element).find(".tblfooter").css({ "display": Table_Style.ResultVisibility });
        $("#previewobject").empty();
        $("#previewobject").parent().css({ "display": "block", "overflow": "auto", "height": "35%" });
        $(element).clone(true).removeAttr('id').appendTo($("#previewobject"));
    },

    byName: function (name) {
        filtered = this.filter(function (Table) {
            return Table.get("name") === name;
        });
        return new Table(filtered);
    },
    byId: function (table, id) {
        return table.find(function (model) { return model.get('id') == id });
    }

});
var table = new Tables();
function updatetablestructure(element, model, type) {

    var Column_Style = [];
    Column_Style = model.get("columns");
    var thftr = ""; var coldata = model.get("columns"); var thstr = ""; var tdstr = ""; var colobject = ""; var minimum = 0; var maximum = 0; var minmaxval = [];
    var tempfont = 0; var templineheight = 0; var htempfont = 0; var htemplineheight = 0;
    var datalist = new Object();
    for (var i = 0; i < coldata.length; i++) {
        colobject = coldata[i];

        if (colobject.formula != "underfined") {
            var values = [];
            var connectionid = colobject.connectionid; var connectiontype = colobject.connectiontype;
            var dsId = colobject.DSId;
            var dsName = colobject.DSName;
            var formula = colobject.formula;
            var DSCnnCretedby = colobject.DSCnnCretedby;
            var _data = new Object(); _data.ConnectionID = connectionid; _data.DSConnType = connectiontype;
            _data.DSId = dsId; _data.DSName = dsName; _data.DSCnnCretedby = DSCnnCretedby;
            _data.formulea = formula;
            var slcSPgridobj = new Array(); slcSPgridobj.push(_data);
            var params = { Get_SPGriddtail: JSON.stringify(slcSPgridobj) };            
            var Data_d = JSON.stringify(params);
            $.ajax({
                url: "../../GetAllConnectionData/GET_DataForMathOperations",
                method: 'POST',
                async: false,               
                contentType: "application/json",                
                data: Data_d
            }).success(function (data) {
                if (data.errorresult) {
                }
                else {                    
                    //values = JSON.parse(data.tabledata);
                    values = (data.tabledata);
                    //alert(JSON.stringify(values));
                    datalist[colobject.id] = values;
                }
            });

        }

        if (colobject.HFontSizeVal == "Small") {
            htempfont = parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght);
        }
        else if (colobject.HFontSizeVal == "Medium") {
            htempfont = 1.2;
            htemplineheight = parseInt(colobject.HLinehieght) - 19;
        }
        else if (colobject.HFontSizeVal == "Large") {
            htempfont = 1.9 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 30;
        }
        else if (colobject.HFontSizeVal == "Very Large") {
            htempfont = 2.3 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 26;
        }
        thstr += '<th class="cx-table" data-thid="' + colobject.id + '" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: ' + colobject.Hallignment + ';line-height:' + htemplineheight + '% ;border-bottom-width: 1px;border-right-width: ' + colobject.RightColumnBorder + ';border-top-width:1px;border-left-width: ' + colobject.LeftColumnBorder + ';border-color:' + colobject.HeaderBorderColor + ';font-size: ' + htempfont + 'em;font-weight: ' + colobject.HFontweight + ';font-style: ' + colobject.HFontstyle + ';text-decoration: ' + colobject.HTextDecoration + ';color: ' + colobject.HFontcolor + ';display: ' + colobject.Visibility + ';background: ' + colobject.HeaderBackground + ';width: ' + colobject.width + ';height: 23px;vertical-align: middle;"><div class="cell align-0 fmt-txt" style="display: block;">' + colobject.columnname + '</div></th>';
        $(element).find(".tblheaders tbody").empty();
        var $thelement = $(element).find('.tblheaders tbody');
        $thelement.append("<tr>" + thstr + "</tr>");


    }


    if (Object.keys(datalist).length > 0) {

        var maxtd = 0;
        for (key in datalist) {
            var data = datalist[key];
            if (data.length > maxtd)
                maxtd = data.length;
        }

        $(element).find(".tbloverview tbody").empty();

        var $tdelement = $(element).find('.tbloverview tbody');
        for (var t = 0; t < maxtd; t++) {

            var row = $('<tr>');
            for (var c = 0; c < coldata.length; c++) {
                if (coldata[c].FontSizeVal == "Small") {
                    tempfont = parseFloat(coldata[c].FontSize);
                    templineheight = 140;
                }
                else if (coldata[c].FontSizeVal == "Medium") {
                    tempfont = 1.2;
                    templineheight = parseInt(coldata[c].Linehieght) - 19;
                }
                else if (coldata[c].FontSizeVal == "Large") {
                    tempfont = 1.9 + parseFloat(coldata[c].FontSize);
                    templineheight = parseInt(coldata[c].Linehieght) - 30;
                }
                else if (coldata[c].FontSizeVal == "Very Large") {
                    tempfont = 2.3 + parseFloat(coldata[c].FontSize);
                    templineheight = parseInt(coldata[c].Linehieght) - 26;
                }

                row.append($('<td  style="overflow: hidden;text-overflow: ellipsis;border-bottom-style:' + coldata[c].Rowborderstyle + ';border-bottom-width: ' + coldata[c].Rowborderwidth + "px" + ';white-space: nowrap;text-align: ' + coldata[c].allignment + '; border-bottom-color: ' + coldata[c].RowBordercolor + '; font-size: ' + tempfont + 'em; line-height: ' + templineheight + '%;font-weight: ' + coldata[c].Fontweight + ';border-right-width: ' + coldata[c].RightColumnBorder + ';border-left-color: ' + coldata[c].BorderColor + ';border-right-color: ' + coldata[c].BorderColor + ';border-left-width: ' + coldata[c].LeftColumnBorder + ';font-style: ' + coldata[c].Fontstyle + ';display: ' + coldata[c].Visibility + ';vertical-align:middle;background: ' + coldata[c].BodyBackground + ';text-decoration: ' + coldata[c].TextDecoration + ';color: ' + coldata[c].Fontcolor + ';width: ' + coldata[c].width + ';" >').text(""));
                $tdelement.append(row);
            }
        }

        $(element).find(".tbloverview tbody").find("tr").css({ "display": "none" });

        for (key in datalist) {

            var Column_Style = model.get("columns"); var totalvalue = 0;
            var Table_Style = model.get("Table_Style");
            var index = $(".tblheaders").find("[data-thid='" + key + "']").index();
            index++; var data = datalist[key]; var dlength = Table_Style.TableRows;
            minmaxval.length = 0;
            $(element).find(".tbloverview td:nth-child(" + index + ")").each(function (count) {
                $(this).parent().show();
                if (dlength > count) {
                    var tddata = data[count];

                    tddata = Column_Style[index - 1].FormatAs == "Number" ? parseFloat(tddata).toFixed(Column_Style[index - 1].Decimals) : tddata;

                    if (Column_Style[index - 1].ShowDrilldownlink == "show") {
                        var modelid = model.get("id");
                        var drillid = Column_Style[index - 1].id;
                        $(this).html(Column_Style[index - 1].Prefix + '<a onclick=\drilldownconfigtbl("' + modelid + '","' + drillid + '",this);\>' + tddata + '</a>' + Column_Style[index - 1].Suffix);
                    }
                    else {
                        $(this).html(Column_Style[index - 1].Prefix + tddata + Column_Style[index - 1].Suffix);

                    }
                    totalvalue = totalvalue + parseInt($(this).text());

                    minmaxval.push(parseInt($(this).text()));
                    if ((Column_Style[index - 1].ResultRow) == "Min") {
                        minimum = Math.min.apply(null, minmaxval);
                    }
                    else if ((Column_Style[index - 1].ResultRow) == "Max") {
                        maximum = Math.max.apply(null, minmaxval);
                    }

                }
                else {

                    return false;
                }

            });
            var index1 = $(element).find(".tblheaders").find("[data-thid='" + key + "']").index();
            if (index1 != -1) {
                if (Column_Style[index1].formula != "underfined") {

                    if ((Column_Style[index1].ResultRow) == "Sum") {
                        Column_Style[index1].Total = totalvalue;
                    }
                    else if ((Column_Style[index1].ResultRow) == "Average") {
                        if ($(element).find(".tbloverview tbody").find("tr:visible").length <= 5) {
                            Column_Style[index1].Total = totalvalue / $(element).find(".tbloverview tbody").find("tr:visible").length;


                        }
                        else {
                            Column_Style[index1].Total = totalvalue / ($(element).find(".tbloverview tbody").find("tr:visible").length - 1);

                        }

                    }
                    else if ((Column_Style[index1].ResultRow) == "Count") {
                        if ($(element).find(".tbloverview tbody").find("tr:visible").length <= 5) {
                            Column_Style[index1].Total = $(element).find(".tbloverview tbody").find("tr:visible").length;
                        }
                        else {
                            Column_Style[index1].Total = $(element).find(".tbloverview tbody").find("tr:visible").length - 1;
                        }

                    }
                    else if ((Column_Style[index1].ResultRow) == "Min") {
                        Column_Style[index1].Total = minimum;
                    }
                    else if ((Column_Style[index1].ResultRow) == "Max") {
                        Column_Style[index1].Total = maximum;
                    }
                    else if ((Column_Style[index1].ResultRow) = "Empty") {
                        Column_Style[index1].Total = "";
                    }

                }
            }

        }
        if (model.get("viewer") != true) {
            if (model.get("type") == "add") {
                var ref = $('#bitree').jstree(true);
                var seltxt = ref.get_selected();

                var $tableid = $(document.getElementById(model.get("id")));
                var targetth = $tableid.find(".tblheaders").find("[data-thid='" + seltxt.toString() + "']");
                var th_index = $(targetth).index();
                $('.tablescope').find('tr').each(function () {
                    $(this).find('th').eq(th_index).addClass('cx-table tblheaders selected-component');
                    $(this).find('td').eq(th_index).addClass('cx-table tblheaders selected-component');
                });
            }
        }
    }

    else {
        $(element).find(".tbloverview tbody").empty();
        var $tdelement = $(element).find('.tbloverview tbody');

        var row = $('<tr>');

        for (var c = 0; c < coldata.length; c++) {

            row.append($('<td  style="width: ' + coldata[c].width + ';display:' + coldata[c].Visibility + ';line-height:' + coldata[c].Linehieght + '%;font-size:' + coldata[c].FontSize + 'em;border-right-width: ' + coldata[c].RightColumnBorder + ';background: ' + coldata[c].BodyBackground + ';border-color: ' + coldata[c].BorderColor + ';border-left-width: ' + coldata[c].LeftColumnBorder + ';" >').text(""));
            $tdelement.append(row);
        }

    }

    for (var i = 0; i < coldata.length; i++) {
        colobject = coldata[i];
        if (colobject.HFontSizeVal == "Small") {
            htempfont = parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght);
        }
        else if (colobject.HFontSizeVal == "Medium") {
            htempfont = 1.2;
            htemplineheight = parseInt(colobject.HLinehieght) - 19;
        }
        else if (colobject.HFontSizeVal == "Large") {
            htempfont = 1.9 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 30;
        }
        else if (colobject.HFontSizeVal == "Very Large") {
            htempfont = 2.3 + parseFloat(colobject.HFontSize);
            htemplineheight = parseInt(colobject.HLinehieght) - 26;
        }

        $(element).find(".tblfooter tbody").empty();
        var $thelement = $(element).find('.tblfooter tbody');
        thftr += '<th class="cx-table" data-thid="' + colobject.id + '" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: ' + colobject.Hallignment + ';border-top-width: 1px;border-right-width: ' + colobject.RightColumnBorder + ';border-left-width: ' + colobject.LeftColumnBorder + ';line-height:' + htemplineheight + '%;border-color:' + colobject.HeaderBorderColor + ';font-size: ' + htempfont + 'em;font-weight: ' + colobject.HFontweight + ';font-style: ' + colobject.HFontstyle + ';text-decoration: ' + colobject.HTextDecoration + ';color: ' + colobject.HFontcolor + ';display: ' + colobject.Visibility + ';background: ' + colobject.HeaderBackground + ';width: ' + colobject.width + ';height: 23px;vertical-align: middle;"><div class="cell align-0 fmt-txt" style="display: block;">' + colobject.ResultPrefix + colobject.Total + colobject.ResultSuffix + '</div></th>';
        $thelement.append("<tr>" + thftr + "</tr>");
    }



}
function drilldownconfigtbl(modelid, drillid, obj) {
    var selecteditem = table.byId(table, modelid);
    var drilldown = selecteditem.get("drilldown");
    var sinfo = _.find(drilldown, function (rw, index) { indexselected = index; return rw.id == drillid });
    var $tablrow = $(obj).parent().parent();
    var colid = sinfo.id;
    var $tableid = $(document.getElementById(selecteditem.get("id")));
    var $selectedth = $tableid.find(".tblheaders").find("[data-thid='" + colid + "']");
    var colindex = $selectedth.index();
    var rowindex = $tablrow.index();

    var reqparams = sinfo.RequestParameters;
    var varlist = new Object();
    for (var i = 0; i < reqparams.length; i++) {
        var paramname = reqparams[i].ParameterName;
        var paramid = reqparams[i].ParameterValue;
        if (paramname != "") {
            var selectedcolindex = $tableid.find(".tblheaders").find("[data-thid='" + paramid + "']").index();
            varlist[paramname] = $tableid.find(".tbloverview").find("tr:eq(" + rowindex + ")").find("td:eq(" + selectedcolindex + ")").text();

        }

    }
    var targetdashboard = drilldown[colindex].DashboardId;

    if (targetdashboard != "") {
        $.ajax({
            url: "../../CreateParameter/UpdateParamVal",
            method: 'GET',
            async: false,
            cache: false,
            headers: { 'Accept': 'application/json', 'Pragma': 'no-cache' },
            data: { Varvalues: JSON.stringify(varlist) }
        }).success(function (data) {
            var sFeatures = "dialogHeight: 600px;dialogWidth: 1000px;";
            var shareurl = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
            window.location.href = window.location.protocol + "//" + window.location.host + "/BI360/Index?id=" + targetdashboard;
            // window.showModalDialog(shareurl, "", sFeatures);
        });
    }
}