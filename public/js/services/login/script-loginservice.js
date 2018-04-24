var loginapp = angular.module("loginapp", ['ui.router']);
var stopflag = 0;
loginapp.factory('loginfactory', function ($http) {

    return {
        /**
        @summary: This service used to the save user
                 data form Admin_M_Users table.
       **/
        getlogon: function (loginuser) {

            return $http.post('/authlogin', loginuser);
        },
        /**
         @summary: This service used to the send password
                  to user email.
         **/
        sendpassword: function (data) {
            return $http.post('/authsendpassword', data);
        },
        /**
         @summary: This service used to the  open the google.
         **/
         google:function(data){
          return $http.post('/google',data)
        },
        /**
         @summary: This service used to  delete user detailes
                   from Admin_T_UserLoginDetails
        **/
        deleteloginuserdetails:function(data){
          return $http.post('/deleteloginuserdetails',data)
        },
        /**
         @summary: This service used to  delete user detailes
                   from Admin_T_UserLoginDetails
        **/
        setusersessiontime:function(UserLogin){
          return $http.post('/setusersessiontime',UserLogin)
        },
        /**
         @summary: This service used to  delete user detailes
                   from Admin_T_UserLoginDetails
        **/
        authgoogle:function(){
          return $http.get('/auth/google')
        },
        /**
         @summary: This service used to  delete user detailes
                   from Admin_T_UserLoginDetails
        **/
        loadlogincaptcha:function(){
          return $http.get('/LoadLoginCaptcha')
        }
    };
});
