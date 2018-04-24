/**
 * @author tejasree
 * @created date 16/04/18
 * @Modified By tejasree
 */
 RapidApp.factory('employeefactory',function($http){
 return{
   /*
   *@summary: This service used to the update
              employee detailles form Employee_M_Employee table.
   */
   updateemployeedetails:function(employeedata){
    return $http.post('/updateemployeedetails',employeedata)
  },
   /*
   *@summary: This service used to the save
              employee detailles form Employee_M_Employee table.
   */

  saveemployeedeta:function(employeedata){
      return $http.post('/saveemployeedeta',employeedata)
   },
   /*
   *@summary:This service used to the  get
             employee list form Employee_M_Employee table.
   */
   employeelist:function(){
       return $http.get('/employeelist')
  },
  /*
  *@summary: This service used to the  delete data
            employee list form Employee_M_Employee table.
  */
  deleteemployee : function(dataobj){
      return $http.post('/deleteemployee',dataobj)

  },
  /*
  *@summary: This service used to the  get deportmentdata
             form Employee_M_Employee table.
  */
  departmentdata:function(){
    return $http.get('/departmentdata')
  },
  /*
  *@summary: This service used to the  get locationdata
              form Employee_M_Employee table.
  */
  locationdata:function(){
      return $http.get('/locationdata')
  },
  /*
  *@summary: This service used to the  get Designationdata
              form Employee_M_Employee table.
  */
 designationdata:function(){
 return $http.get('/designationdata')
 },
  /*
  *@summary: This service used to the  get Designationdata
             form Employee_M_Employee table.
  */
 getemployeedata:function(dataobj){
 return $http.post('/getemployeedata',dataobj)
 }
}
})
