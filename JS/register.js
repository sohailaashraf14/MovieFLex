let Users = JSON.parse(localStorage.getItem("users")) || [];
let username = document.querySelector("#user-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmation_password = document.querySelector("#confirmation-password");
let register_btn = document.querySelector("#signup-btn");

if (JSON.parse(localStorage.getItem("active-user"))) {
    location.href = "index.html";
  }

  function Signup() {
    if (
      password.value == confirmation_password.value &&
      password.value &&
      confirmation_password.value &&
      email.value &&
      username.value
    ) {
      for (let i = 0; i < Users.length; i++) {
        if (Users[i].username == username.value) {
          alert("userName Already Exists");
          return;
        }
        if (Users[i].email == email.value) {
          alert("Email Already Exists");
          return;
        }
      }
      Users.push({
        username: username.value,
        email: email.value,
        password: password.value,
      });
  
      localStorage.setItem("users", JSON.stringify(Users));
       alert("Registration successful!");
      //document.getElementById("message").innerHTML = "Registration successful!";
  
      setTimeout(function () {
        location.href = "/index.html";
      }, 2000);
    } else if (
      password.value &&
      confirmation_password.value &&
      email.value &&
      username.value &&
      password.value != confirmation_password.value
    ) {
      alert("Passwords do not match!");
    } else {
      alert("Fill All The Inputs!");
    }
  }
  