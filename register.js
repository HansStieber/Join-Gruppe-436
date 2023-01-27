function register(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(user => user.email === email);
  
    if (!existingUser) {
      users.push({email: email, password: password});
      localStorage.setItem("users", JSON.stringify(users));
      console.log("User registered successfully.");
    } else {
      console.log("Email already in use. Registration failed.");
    }
  }
  