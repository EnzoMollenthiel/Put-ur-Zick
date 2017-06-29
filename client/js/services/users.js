const USERS_URL = 'http://localhost:3000/users';

angular.module("services")

.service("UsersService", function ($http, $q) {
  
  this.signIn = (user) => {
    
    return $q((resolve, reject) => {
      $http.post(USERS_URL , user).then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }  
  
  this.get = (users) => {
    this.result = [];
    for (let i = 0; i < users.length; i++) {
      $http.get(USERS_URL + '?id=' + users[i]).then((user) => {
        this.result.push(user)
      }).catch((err) => {})
    }
      return this.result
    
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
