
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = users.find(user => user.email === email && user.password === password);
  
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      console.log("User logged in successfully.");
      window.location.href = "./summary.html"
    } else {
      console.log("Invalid email or password. Login failed.");
    }
    
}



  
