let rememberMe = false;

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  rememberMe = document.getElementById("remember-me").checked;
  let existingUser = users.find(user => user.email === email && user.password === password);

  if (existingUser) {
    console.log("Login successful.");
    if (rememberMe) {
      
      console.log(rememberMe);
      backend.setItem("email", email);
      backend.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("currentUser", existingUser.name)
      localStorage.setItem("rememberLogin", rememberMe)
    } else {
      localStorage.setItem("rememberLogin", rememberMe);
      console.log(rememberMe);
    }
    setTimeout(function () {
      window.location.href = "./summary.html";
    }, 2000);
    localStorage.setItem('currentUser', existingUser.name);
  } else {
    console.log("Invalid email or password. Login failed.");
    alert("failed")
  }

}

function loadUserCredentials() {
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  rememberMe = localStorage.getItem("rememberLogin");
  console.log(rememberMe);
  if (rememberMe == 'true') {
    document.getElementById("email").value = storedEmail;
    document.getElementById("password").value = storedPassword;
    document.getElementById("remember-me").checked = rememberMe;
  }
}


