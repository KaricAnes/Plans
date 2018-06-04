function TripsController($scope, $http){
  refresh_trips();

  $scope.message=null;

  $scope.add_trips = function(){
    $http.post('/trips', $scope.trips).success(function(data){
      //refresh_contacts();
      $scope.trips = null;
      $scope.trips_list.push(data);
      $scope.message="Trips added";
    });
  }
  $scope.delete_trips = function(trips_id){
    console.log("delete trips with id "+ trips_id);
    $http.delete('/trips/'+trips_id).success(function(data){
      refresh_trips();
      $scope.message="Trips deleted";
    });
  }

  $scope.edit_trips = function(trips){
    $scope.trips ={
      _id : trips._id,
      desc : trips.desc,
      destination : trips.destination,
      date : trips.date,
    };
  }
  $scope.hide_message = function(){
    $scope.message=null;
  }
  $scope.update_trips = function(){
    $http.put('/trips/'+$scope.trips._id, $scope.trips).success(function(data){
      refresh_trips();
      $scope.trips = null;
      $scope.message="Trips updated";
    });
  }

  function refresh_trips(){
    $http.get('/trips').success(function(data){
      $scope.trips_list = data;
    });
  }
}
