/**
 * @author tejasree
 * @created date 13/4/2018
 * @Modified By tejasree
 */
RapidApp.factory('userfactory',function($http){

    return {
        /**
         @summary: This service used to the save user
                   data form Admin_M_Users table.
         **/
      saveuserdetails:function(userdata){
           return $http.post('/saveuserdetails',userdata)
		  },
           /**
            @summary: This service used to the update user data
                      form Admin_M_Users table.
           **/
			updateuser:function(userdata){
					 return $http.post('/updateuser',userdata)
			},

            /**
           @summary: This service used to the get the userdata
                     form Admin_M_Users table.
           **/
			getuserdata:function(dataobj){
				  return $http.post('/getuserdata',dataobj)
			},

            /**
          @summary: This service used to the get the role
			              data form Admin_T_Roles table.
          **/
			getroleacess:function(){
				 return $http.get('/getroleacess')
			},
          /**
            @summary: This service used to the get the policy
			                data form Admin_T_PasswordPolicy table.
         **/
		 getpassword:function(){
					 return $http.get('/getpassword')
		 },
           /**
            @summary: This service used to the get the employee
		 	                list data form Employee_M_Employee table
            **/
		  getemployeelist:function(){
				   return $http.get('/getemployeelist')
		  },
          /**
            @summary: This service used to the get the employee data
                      form Employee_M_Employee table base on employee id.
          **/

			getemployeebasedonid:function(mytextval){
		      return $http.post('/getemployeebasedonid',mytextval)
			},
        /**
           @summary: This service used to the get userlist data form Admin_M_Users.
         **/
    userlist:function(){
			 return $http.get('/userlist')
    },
         /**
           @summary: This service used delete form Admin_M_Users.
         **/
    deleteuser:function(Dataobj){
	       return $http.post('/deleteuser',Dataobj)
		}
	}

});
