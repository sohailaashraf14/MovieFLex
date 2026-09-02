function Signout() {
    if (localStorage.getItem("active-user")) {
        localStorage.removeItem("active-user");
        alert("Sign-out successful!");
        location.href = "/Signin.html";
    } else {
        alert("No user is currently signed in.");
    }
}
