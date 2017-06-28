const USERS_URL = '';

angular.module("services")

.service("UsersService", function ($http, $q) {
  
  this.signIn = (user) => {
    
    return $q((resolve, reject) => {
      $http.post(USERS_URL + '/signIn', user).then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  this.signUp = (user) => {
    
    return $q((resolve, reject) => {
      $http.post(USERS_URL + '/signUp', user).then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
  
  
});
