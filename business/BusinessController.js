function BusinessController($scope, $http){
  refresh_contacts();

  $scope.message=null;

  $scope.add_contact = function(){
    $http.post('/contact', $scope.contact).success(function(data){
      //refresh_contacts();
      $scope.contact = null;
      $scope.contact_list.push(data);
      $scope.message="Contact added";
    });
  }
  $scope.delete_contact = function(contact_id){
    console.log("delete contact with id "+ contact_id);
    $http.delete('/contact/'+contact_id).success(function(data){
      refresh_contacts();
      $scope.message="Contact deleted";
    });
  }

  $scope.edit_contact = function(contact){
    $scope.contact ={
      _id : contact._id,
      name : contact.name,
      email : contact.email,
      number : contact.number,
    };
  }
  $scope.hide_message = function(){
    $scope.message=null;
  }
  $scope.update_contact = function(){
    $http.put('/contact/'+$scope.contact._id, $scope.contact).success(function(data){
      refresh_contacts();
      $scope.contact = null;
      $scope.message="Contact updated";
    });
  }

  function refresh_contacts(){
    $http.get('/contacts').success(function(data){
      $scope.contact_list = data;
    });
  }
}
