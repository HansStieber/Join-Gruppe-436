
function login(email, password) {
    if (!localStorage.getItem("loggedInUser")) {
        localStorage.setItem("loggedInUser", JSON.stringify({email: email, password: password}));
        console.log("User logged in successfully.");
    } else {
        console.log("User is already logged in.");
    }
}
