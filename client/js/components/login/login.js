angular.module('components')

.component('login', {

  templateUrl: 'client/js/components/login/login.html',
  
  bindings:{

  }, 
  
  controller: function (UsersService) {
    
    this.$onInit = () => {
    }   

    this.submitSignUp = () => {
      console.log(this.signUp)
      UsersService.signUp(this.signUp).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }  

    this.submitSignIn = () => {
      console.log(this.signIn)
      UsersService.signIn(this.signIn).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }  
  }
})