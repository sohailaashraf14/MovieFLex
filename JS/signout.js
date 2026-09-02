function Signout() {
    if (localStorage.getItem("active-user")) {
        localStorage.removeItem("active-user");
        alert("Sign-out successful!");
        location.href = "index.html";
    } else {
        alert("No user is currently signed in.");
    }
}
