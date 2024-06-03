//Card Flipper
let loginButton = document.getElementById('login-button');
let registerButton = document.getElementById('register-button');

loginButton.addEventListener('click', () =>{
    document.querySelector('#flipper').classList.toggle("flip")
})

registerButton.addEventListener('click', () => {
    document.querySelector('#flipper').classList.toggle("flip")
})

//Password Toggle
function showLoginPassword(){
    let passwordField = document.getElementById('login-password');
    let eyeIcon = document.getElementById('eye-logo');
    console.log(eyeIcon);
    if(passwordField.type === "password"){
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }else{
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function showRegisterPassword(){
    let passwordField = document.getElementById('register-password')
    let eyeIcon = document.getElementById('r-eye-logo');
    if(passwordField.type === "password"){
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }else{
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}


function showConRegisterPassword(){
    let passwordField = document.getElementById('register-con-password')
    let eyeIcon = document.getElementById('rc-eye-logo');
    if(passwordField.type === "password"){
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }else{
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

//Login Form Validation
let loginForm = document.forms['loginForm'];
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
})



//Register Form Validatrion
let registerForm = document.forms['registerForm'];
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

function validateUsername(str){
    if(str.length < 8 || str.length > 20){
        return false;
    }
    for(let i = 0; i < str.length; i++){
        if(!((str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= 'a' && str[i] <= 'z') || (str[i] >= '0' && str[i] <= '9'))){
            return false;
        }
    }
    return true;
}

function validateRegister(){
    const usernameVal = registerForm.elements['reg-username'].value;
    const emailVal = registerForm.elements['reg-email'].value;
    const passwordVal = registerForm.elements['reg-password'].value;
    const conPasswordVal = registerForm.elements['reg-con-password'].value;
    const bdayDateVal = registerForm.elements['bday-date'].value;

    let isValid = true;

    //Username must be 8 - 20 Characters, can't contain symbols
    if(!validateUsername(usernameVal)){
        isValid = false;
        registerForm.elements['reg-username'].parentElement.classList.add('error')
        document.getElementById('r-username-err').innerText = "Username must be between 8 - 20 characters and does not contain any symbol"
    }

}

console.log(validateUsername(''));