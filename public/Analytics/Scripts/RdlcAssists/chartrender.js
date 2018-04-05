function loadchartreport(id) {    
    try {
        var node = document.getElementById(id);
        var selectedid = $(node).find('select').attr('id');
        var selectedfile;
        if ($("#" + id + "").attr('data-chartfile') == null) {
            selectedfile = $("#" + selectedid + "").val();  
        }
        else {
            selectedfile = $("#" + id + "").attr('data-chartfile');  
        }
        
        var fath = "DashBoards\\dashboard360\\" + selectedfile;
        $.ajax({
            url: '../../DashBoard360/filepathconvert',
            type: 'POST',
            cache: false,
            async: false,
            data: { fkey: fath },
            success: function (response) {
                var url = response;
                var d = new Date();
                $.ajax({
                    url: '../../DashBoard360/GetCharts',
                    type: 'POST',
                    cache: false,
                    async: false,
                    data: { regdetails: url },
                    success: function (result) {
                        if (result.errorinfo) {
                            alert(result.errorinfo);
                            return false;
                        }
                        else {
                            var chartdata = JSON.parse(result.chartdata);
                            for (var i = 0; i < chartdata.length; i++) {
                                switch (chartdata[i].charttype) {
                                    case 'Globalchart':
                                        var Globalchart = "Globalchart" + Math.floor(Math.random() * 10561);
                                        var imgmap = '#' + Globalchart + "ImageMap";                                       
                                        $.ajax({
                                            url: '../../charts/GetGlobalchartImage',
                                            type: 'POST',
                                            async: false,
                                            data: { tdata: chartdata[i].chartinfo, fkey: url + "$" + d.getTime(), height: parseInt($(node).height()), width: parseInt($(node).width()), imagemap: imgmap.replace('#', '') },
                                            success: function (response) {

                                                if (response.charterror) {
                                                    alert(response.charterror);
                                                    $("#" + controlID + "Content").html("Error");
                                                    return false;
                                                }
                                                else {
                                                    var charttitle = chartdata[i].title;
                                                    var html = '<img id="' + Globalchart + '" usemap="' + imgmap + '" src="data:image/png;base64,' + response.chartimage + '"   />';
                                                    $("#" + id + "div").remove();
                                                    $("#" + id + "").find('img').remove();
                                                    $("#" + id + "").attr('data-chartfile', selectedfile);
                                                    $(node).append(html);
                                                }

                                            },
                                            error: function (er) {


                                            }
                                        });

                                        break;

                                }
                            }


                        }
                    }
                });



            }
        });
    }
    catch (e) {
        alert(e);
    }


}