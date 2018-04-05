function SlidePanel() {
	//alert($("#ContentArea").css("left"));
    if ($("#ContentArea").css("left") == "0px") {
        $("#ContentArea").css("left", "190px");
        $("#SidebarMenuNavigationMain").css("left", "0px");
        $("#Logo").find('img').removeClass("fullscreen");
        $("#ToolbarButtonPrevious").addClass("icon-caret-left").removeClass("icon-caret-right"); 
    }
    else {
        $("#ContentArea").css("left", "0px");
        $("#SidebarMenuNavigationMain").css("left", "190px");
        $("#Logo").find('img').addClass("fullscreen");        
        $("#ToolbarButtonPrevious").addClass("icon-caret-right").removeClass("icon-caret-left");
    }

}
$(document).ready(function () {

    // Radialize the colors
    /*Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });*/
//    window.onbeforeunload = function (e) {
//        e = e || window.event;

//        // for ie and firefox prior to version 4
//        if (e) {
//            e.returnvalue = 'this page is asking you to confirm that you want to leave - data you have entered may not be saved';
//        }

//        // for others
//        return 'this page is asking you to confirm that you want to leave - data you have entered may not be saved';
//    };

    $("li.nav.dropdown").click(function () {

        // nav dropdown active
        $("li.nav.dropdown.active").removeClass("nav dropdown active").addClass("nav dropdown");
        $(this).addClass("nav dropdown active");
        $(".subNav").css("display", "none");
        $(this).find(".subNav").css("display", "block");


    });

    $(".nav.dropdown.active").click(function () {
        if ($(".subNav").css("display") == "none") {
            $(this).find(".subNav").css("display", "block");
        }
        else {
            $(this).find(".subNav").css("display", "none");
        }

    });

    //user profile

    $("#UserPhoto").click(function () {
        if ($("#UserProfilePopup").css("display") == "none") {
            $("#UserProfilePopup").css("display", "block");
        }
        else {
            $("#UserProfilePopup").css("display", "none");
        }
    });

    $("#closeuser").click(function () {
        $("#UserProfilePopup").css("display", "none")
    });



   
});

function init() {
    $("#CollapseOptionsPanelButton").click(function () {       
        var a = $("#CollapseOptionsPanelButton i");
        $("#OptionsPanel").toggleClass("Translated");
        $("#DashboardContainer").toggleClass("Extended");
        a.hasClass("icon-caret-left") ? (a.removeClass("icon-caret-left"), a.addClass("icon-caret-right")) : (a.removeClass("icon-caret-right"), a.addClass("icon-caret-left"));
    });
}

