function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find(user => user.email === email && user.password === password);

  if (existingUser) {
    console.log("Login successful.");
    setTimeout(function(){ 
        window.location.href = "./summary.html";
    }, 2000);
    document.getElementById("user-greeting").innerHTML = `${existingUser["name"]}`;
    
  } else {
    console.log("Invalid email or password. Login failed.");
    alert("failed")
  }
  
}


