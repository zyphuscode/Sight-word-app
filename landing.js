var mainApp = {};

(function(){

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }else{
      //redirect to login page
      window.location.replace("login.html")
    }
  });

  function logOut(){
    firebase.auth().signOut();
  }
  
  mainApp.logOut = logOut;
})();

