var form = document.getElementById("form");
var email = document.getElementById("email");
var password = document.getElementById("password");
//document.getElementById("form").addEventListener("submit", submitForm);

//function to show input message error
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//function to show green outline
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = "form-control success"
}

//function to verify email
function checkEmail(input){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, "Email is not valid: " + input.value);
  }
}

//function to checked required fields
function checkReq(inputArr){
  inputArr.forEach(function(input){
    if (input.value.trim() === " "){
      showError(input, `${getFieldName(input)} is required ` )
    } else {
      showSuccess(input);
    }
  })
}
//check passwords match
function checkPasswordsMatch(input1, input2){
    if (input1.value != input2.value){
      showError(input2, "Password do not match")
    }
}
//check input length 
function checkLen(input, min, max){
  if(input.value.length < min ){
    showError(input, `${getFieldName(input)} must be at least ${min}`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`)
  } else {
    showSuccess(input);
  }
}

//capitalise the first letter of each field
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//event listeners
form.addEventListener("submit", function(e){
  e.preventDefault();

checkReq([email, password])
checkLen(password, 8, 100);
checkEmail(email);
console.log(email.value);

firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    window.location.replace("landing.html")
    alert("User is logged In")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("User can't login!");
    window.location.replace("register.html");
  });

//window.location.href = "main.html";
})