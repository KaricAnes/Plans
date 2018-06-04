function MeetingsController($scope, $http){
  refresh_meetings();

  $scope.message=null;

  $scope.add_meetings = function(){
    $http.post('/meetings', $scope.meetings).success(function(data){
      //refresh_contacts();
      $scope.meetings = null;
      $scope.meetings_list.push(data);
      $scope.message="Meetings added";
    });
  }
  $scope.delete_meetings = function(meetings_id){
    console.log("delete meetings with id "+ meetings_id);
    $http.delete('/meetings/'+meetings_id).success(function(data){
      refresh_meetings();
      $scope.message="Meetings deleted";
    });
  }

  $scope.edit_meetings = function(meetings){
    $scope.meetings ={
      _id : meetings._id,
      desc : meetings.desc,
      details : meetings.details,
      date : meetings.date,
    };
  }
  $scope.hide_message = function(){
    $scope.message=null;
  }
  $scope.update_meetings = function(){
    $http.put('/meetings/'+$scope.meetings._id, $scope.meetings).success(function(data){
      refresh_meetings();
      $scope.meetings = null;
      $scope.message="Meetings updated";
    });
  }

  function refresh_meetings(){
    $http.get('/meetings').success(function(data){
      $scope.meetings_list = data;
    });
  }
}
