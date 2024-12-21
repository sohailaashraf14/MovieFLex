let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signin_btn=document.querySelector("#signin-btn");
let Users = JSON.parse(localStorage.getItem("users")) || [];
if (JSON.parse(localStorage.getItem("active-user"))) {
    location.href = "/index2.html";
  }
  function Signin(){
    if (Users.length == 0) {
        alert("No registered users found. Please register first.");
        return;
    }
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email == email.value && Users[i].password == password.value) {
          alert("Login successful!");
          localStorage.setItem("active-user", JSON.stringify(Users[i]));
          location.href = "/index2.html";
          return;
        }
      }
      alert("WRONG Email Or Password!");
  }