

const loginForm = document.querySelector("form.form-login");
const signupForm = document.querySelector("form.form-signup");
const loginBtn = document.querySelector(".login-link a");
const signupBtn = document.querySelector(".signup-link a");
const signupLink = document.querySelector(".sign-link a");

signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
   
    })
loginBtn.onclick = (()=> {
    loginForm.style.marginLeft = "0%";
   
    })



const sub = document.getElementById('signup-submit');


const push = function () {
    var username_signup = document.getElementById("username-signup").value;
    var email_signup = document.getElementById("email-signup").value;
    var password_signup = document.getElementById("password-signup").value;
    const data = { username_signup, email_signup, password_signup };
        if (username_signup !== "" || email_signup !== "" || password_signup !== "") {
            username_signup = "";
            email_signup = "";
            password_signup = "";
            console.log('request recieved');
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                };
            
            fetch('/register', options).then(response => {
                return response.json()
            }).then (text => {
              console.log(text);
             });

        }
       
    
    }
                   

sub.addEventListener('click', push);