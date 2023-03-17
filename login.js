let rememberMe = false;


function login() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  rememberMe = document.getElementById("remember-me").checked;
  let existingUser = users.find(user => user.email === email && user.password === password);
  areadyGreetMobile = true;
  localStorage.setItem('alreadyGreetMobile', alreadyGreetMobile);

  if (existingUser) {
    if (rememberMe) {
      backend.setItem("email", email);
      backend.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberLogin", rememberMe)
    } else {
      localStorage.setItem("rememberLogin", rememberMe);
      localStorage.clear();
    }
    setTimeout(function () {
      window.location.href = "./summary.html";
    }, 1000);
    localStorage.setItem('currentUser', existingUser.name);
  } else {
    alert("Invalid email or password. Login failed.");
  }

}


function loadUserCredentials() {
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  rememberMe = localStorage.getItem("rememberLogin");
  if (rememberMe == 'true') {
    document.getElementById("login-email").value = storedEmail;
    document.getElementById("login-password").value = storedPassword;
    document.getElementById("remember-me").checked = rememberMe;
  }
}


