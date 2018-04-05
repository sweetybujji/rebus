$(document).ready(function () {
//$("#txt_allow").attr("disabled",true);
  // $("#txt_password").attr("disabled",true);
$("#txt_policyname").keypress(function (e) {
  if(!(e.which >= 97 && e.which <= 122)&&!(e.which <65&&e.which > 90)&&(e.which < 48 || e.which > 57)){
 $("#errms").html("Only Characters and Numbers are Allowed").show().fadeOut(3000);
  alert(e.which);
//console.log(e.which);

   return false;

 }else{
   return true;
 }

})
$("#txt_min_characters").keypress(function(event){
  // var v1=$("#txt_min_characters").val();
  // var v2=$("#txt_max_charaters").val();
  // if(v1<v2){
  //   if(v2!=""){
  //       event.preventDefault();
  //       alert("txt_min_characters")
  //   }
  //
  // }

  //$("#errmsg").empty();
  //$(this).val($(this).val().replace(/[^/d].+/,""));
    var arr=$(this).val();
  if((event.which < 48 || event.which > 57 )){
    event.preventDefault();
    $("#errmsg").html(" numbers below 30").show().fadeOut(3000);
  }else{
   $("#errmsg").empty();
  //   for (let i=0;i<arr.length;i++){
  //   if(i==arr.length-1){
  //     if(event.key<=3&&(arr[i]<=3)){
  //       console.log(event.key)
  //     }else{
  //       event.preventDefault();
  //       console.log("enter below 30 ");
  //     }
  //   }
  $("#txt_min_characters").keyup(function(event){
    alert("hii")
 // alert($(this).val())
    //alert($("#txt_max_charaters").val())
    if($(this).val()>30){
      event.preventDefault();
      $("#errmsg").html("numbers below 30").show().fadeOut(3000);
      $(this).val($(this).val().substring(0,$(this).val().length-1));
    }

    else if ($(this).val()>$("#txt_max_charaters").val() && $("#txt_max_charaters").val()!=="") {
      //alert($("#txt_min_characters").val())
      //alert()
       //console.log("hii")
      $("#errmsg6").html("<div>Min chars should be less than Max char</div>").show().fadeOut(5000);
    }
  })
}

 })
  // $("#txt_min_characters").keypress(function(event){
  //
  // //  $(this).val($(this).val().replace(/[^/d].+/,""));
  //     var arr=$(this).val();
  //   if((event.which < 48 || event.which > 57 )){
  //     event.preventDefault();
  //     $("#errmsg").html(" numbers below 30").show().fadeOut(3000);
  //   }else{
  //   $("#errmsg").empty();
  //
  //   $("#txt_min_characters").keyup(function(event){
  //  // alert($(this).val())
  //    //alert($("#txt_min_characters").val())
  //     if($(this).val()>30){
  //       event.preventDefault();
  //       $("#errmsg1").html(" numbers below 30").show().fadeOut(3000);
  //       $(this).val($(this).val().substring(0,$(this).val().length-1));
  //     }
  //     else if ($(this).val()<$("#txt_max_charaters").val() && $("#txt_min_characters").val()!=="") {
  //       //alert($("#txt_min_characters").val())
  //       //alert()
  //        //console.log("hii")
  //       $("#errmsg6").html("<div>Min chars should be less than Max char</div>").show().fadeOut(5000);
  //     }
  //   })
  // }
  //
  //   })
  $("#txt_max_charaters").keypress(function(event){

  //  $(this).val($(this).val().replace(/[^/d].+/,""));
      var arr=$(this).val();
    if((event.which < 48 || event.which > 57 )){
      event.preventDefault();
      $("#errmsg1").html(" numbers below 30").show().fadeOut(3000);
    }else{
    $("#errmsg1").empty();

    $("#txt_max_charaters").keyup(function(event){
   // alert($(this).val())
     alert($("#txt_min_characters").val())
      if($(this).val()>30){
        event.preventDefault();
        $("#errmsg1").html(" numbers below 30").show().fadeOut(3000);
        $(this).val($(this).val().substring(0,$(this).val().length-1));
        alert("hii")
      }
      else if ($(this).val()<$("#txt_min_characters").val() && $("#txt_min_characters").val()!=="") {
        alert("hii")
        //alert($("#txt_min_characters").val())
        //alert()
         //console.log("hii")
        $("#errmsg7").html("<div>Max chars should be greater than Min char</div>").show().fadeOut(3000);
      }
    })
  }

    })
   $("#chackbox8").click(function(){
    //  alert("hiii")
     if($(this).prop("checked")==true){
       //alert("hii")
     $("#txt_password").attr("disabled",false)
     }
     else{
   $("#txt_password").attr("disabled",true)
     }
})
$("#chackbox9").click(function(){
 //  alert("hiii")
  if($(this).prop("checked")==true){
    //alert("hii")
  $("#txt_allow").attr("disabled",false)
  }
  else{
$("#txt_allow").attr("disabled",true)
  }
})
    $("#txt_password").keypress(function(event){
    //$(this).val($(this).val().replace(/[^/d].+/,""));
        var arr=$(this).val();
      if((event.which < 48 || event.which > 57 )){
        event.preventDefault();
        $("#errmsg3").html(" numbers below 365").show().fadeOut(3000);
      }else{
    //$("#errmsg3").empty();

      $("#txt_password").keyup(function(event){
      //  alert("hii")
    //  alert($(this).val())
        if($(this).val()> 365){
          //event.preventDefault();
          $("#errmsg3").html("numbers below 365").show().fadeOut(3000);
          $(this).val($(this).val().substring(0,$(this).val().length-1));
        }
        // else{
        //   $("#txt_password").empty();
        // }
      })
    }

      })


    $("#txt_session").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg2").html("number Only").show().fadeOut(3000);
               return false;
    }
    else{
      return true;
    }



})

$("#txt_allow").on('keyup keydown',function(event){
  //alert("hii")
  if((event.which>=65 && event.which <=90 )||(event.which>=97 && event.which<=122)|| !(event.shiftKey || (event.keyCode <48 || event.keyCode >57))){
  //  alert("hii")
    //event.preventDefault();
  //  console.log(event.key);
    $("#errmsg4").html("enter special charaters  with ,saparated").show().fadeOut(3000);
    return false;
  }
   else{
  console.log(event.key);
     return true;
   }
})




})

//fn_save_policydetailes();
 function fn_save_policydetailes() {
  //alert("hii")
    try {

        //alert(rowid);
        var policyname = $("#txt_policyname").val();
      //  var status = $("#txt_status").val();
        var status = $("#chackbox1").prop('checked');
        var minimumcharaters = $("#txt_min_characters").val();
        var maxmumcharaters = $("#txt_max_charaters").val();
        var passwordexp = $("#txt_password").val();
        var Session = $("#txt_session").val();
        var allow = $("#txt_allow").val();
        //var Multiple1=$("Multiple1").val();
        var SpecialCharater=$("#chackbox2").prop('checked')
        var Numberrequire=$("#chackbox3").prop('checked');
        var UpperCase=$("#chackbox4").prop('checked');
        var LowerCase=$("#chackbox5").prop('checked');
        var SetPassword =$("#chackbox6").prop('checked');
        var MultipleSession =$("#chackbox7").prop('checked');
        var checkactive=$("#chackbox8").prop('checked');
        var checkactiveed=$("#chackbox9").prop('checked');
        // alert(SpecialCharater)
        //var Role = $("#txt_Role option:selected").val();
      //  var chk_active = $("#chk_active").prop('checked');
      //  var Id = $("#idUserlabel").val();
      //  var PasswordPolicy = $("#txt_passwordPolicy").val();
        var ErFlag = 0;

        $(".Error").hide();

         if (policyname == "" || policyname == "null" || policyname == null) {
            ErFlag++;
            $("#er_fName").show();
             $("#er_fName").html("<b> Policy Name !! </b> Input is required.");
         }

        if (status == "" || status == "null" || status == null) {
            ErFlag++;
            $("#er_status").show();
            $("#er_status").html("<b> checkbox !! </b> active is required.");
        }

        if (minimumcharaters == "" || minimumcharaters == "null" || minimumcharaters == null) {
            ErFlag++;
            $("#er_minimum").show();
            $("#er_minimum").html("<b> Minimum No.of Characters !! </b> Input is required .");
        }
        if (maxmumcharaters == "" || maxmumcharaters == "null" || maxmumcharaters == null) {
            ErFlag++;
            $("#er_maxmium").show();
            $("#er_maxmium").html("<b> Maximum No.of Charaters !! </b> Input is required.");
        }
        if (passwordexp == "" || passwordexp == "null" || passwordexp == null) {
            ErFlag++;
            $("#er_exp").show();
            $("#er_exp").html("<b>  Password Expiry Days !! </b> Input is required.");
        }
        if (Session == "" || Session == "null" || Session == null) {
            ErFlag++;
            $("#er_Empid").show();
            $("#er_Empid").html("<b> Session Experity Time(in minutes) !! </b> Input is required..");
        }
        if (allow == "" || allow == "null" || allow == null) {
            ErFlag++;
            $("#er_allow").show();
            $("#er_allow").html("<b> Allow Special Charaters </b> Input is required.");
        }
        // if (SpecialCharater == "" || SpecialCharater == "null" || SpecialCharater == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }
        // if (Numberrequire == "" || Numberrequire == "null" || Numberrequire == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }
        // if (UpperCase == "" || UpperCase == "null" || UpperCase == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }
        // if (LowerCase == "" || LowerCase == "null" || LowerCase == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }
        // if (SetPassword == "" || SetPassword == "null" || SetPassword == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }
        // if (MultipleSession == "" || MultipleSession == "null" || MultipleSession == null) {
        //     ErFlag++;
        //     $("#er_allow").show();
        //     $("#er_allow").html("<b> Role !! </b> Input is required.");
        // }



        // if (PasswordPolicy == "" || PasswordPolicy == "null" || PasswordPolicy == null) {
        //     ErFlag++;
        //     $("#er_PasswordPolicy").show();
        //     $("#er_PasswordPolicy").html("<b> Password !! </b> Input is required.");
        // }
        //alert(ErFlag)
        if (ErFlag == 0) {

            var UserDetails = JSON.stringify({
                policyname: policyname,
                status: status,
                minimumcharaters: minimumcharaters,
                maxmumcharaters: maxmumcharaters,
                passwordexp: passwordexp,
                Session: Session,
                allow: allow,
                SpecialCharater:SpecialCharater,
                Numberrequire:Numberrequire,
                UpperCase:UpperCase,
                LowerCase:LowerCase,
                SetPassword:SetPassword,
                MultipleSession:MultipleSession,
                checkactive:checkactive,
                checkactiveed:checkactiveed

                //Role: Role,
                //chk_active: chk_active,
              //  Id: Id,
                //PasswordPolicy: PasswordPolicy
            });



            if ($("#idUserlabel").val() != "" && $("#idUserlabel").val() != null && $("#idUserlabel").val() != "undefined") {
                   //alert(ErFlag)
                //StartPageLoader();

                 $.ajax({
                     url: "/updatepolicy",
                    type: 'POST',
                    contentType: 'application/json',
                    data: UserDetails,
                     success: function (response) {
                       //alert("hiii")
          //               // // if (response.isauthenticated == false) {
          //               // //     StopPageLoader();
          //               // //
          //               // //     fn_session_expired_client();
          //               // //
          //               // // }
          //               //
          //               // if (response.error) {
          //               //
          //               //     fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
          //               //     StopPageLoader();
          //               // }

                             fn_SuccessNotification(response, "success_alert", "", "");
                             localStorage.setItem('id', '');
                            localStorage.setItem('type', '');
                             window.location.href = "#pwdList";
                             //StopPageLoader();

                     },
                     error: function (jqXHR, exception) {
          //               fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at update with code fn_save_Userdetails", "error_alert", "", "");
          //               StopPageLoader();
                     }
                 });
          }


            else {
          //
          //       StartPageLoader();
          //alert(ErFlag)
                $.ajax({
                    url: '../Savepolicydetails',
                    contentType: 'application/json',
                    type: 'POST',
                    data: UserDetails,
                    success: function (response) {
                        //alert(data);
                        // if (response.isauthenticated == false) {
                        //     StopPageLoader();
                        //
                        //     fn_session_expired_client();
                        if (response.error) {
                            fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                        }
                        else {
                            fn_SuccessNotification(response, "success_alert", "", "");
                              window.location.href = "#pwdList";
                            //ClearTextbox();
                        }
                      },
                    //     else if (response.error) {
                    //         fn_errorNotification("200", response.error, response.error, "error occured at save data with code fn_save_details_001", "error_alert", "", "");
                    //     }
                    //     else {
                    //         fn_SuccessNotification(response, "success_alert", "", "");
                    //
                    //         ClearTextbox();
                    //     }
                    //     StopPageLoader();
                    // },
                    error: function (jqXHR, exception) {
                        fn_errorNotification(jqXHR.status, jqXHR, exception, "error occured at data getting with code fn_getdata_list_001", "error_alert", "", "");
                        StopPageLoader();
                    }


                });
            }

        }
      }
     catch (e) {
        fn_errorNotification("200", e, e, "error occured at save data with code fn_save_Userdetails", "error_alert", "", "");
        StopPageLoader();
    }


}
// function fn_cancel(){
//   alert(hiii)
//   $('form_div')[0].reset();
// }


function ClearTextbox23(){
//alert("Welcome");
$("#txt_policyname").val('');
$("#chackbox8").attr("checked",false);


}
