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

let errorMsg = ""

function User(name, email, password, birthday){
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthday = birthday;

    localStorage.setItem(this.email, JSON.stringify(this));
}

function isUnique(email){
    return (localStorage.getItem(email) === null)? true: false;
}

function getBday(date, month, year){
    if(typeof(date) !== Number){
        date = parseInt(date);
    }
    if(typeof(year) !== Number){
        year = parseInt(date);
    }
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let monthNum = months.indexOf(month); //Month in js starts at 0(?)
    return new Date(year, monthNum, date); 
}

function resetError(){
    errorMsg = ""
}

function resetBday(){
    document.getElementById('month-select').style = "border-bottom: var(--whitesmoke) solid 1px;";
    document.getElementById('bday-year').style = "border-bottom: var(--whitesmoke) solid 1px;";
    document.getElementById('bday-date').style = "border-bottom: var(--whitesmoke) solid 1px;";
}

function validateUsername(str){
    if(str.length < 8 || str.length > 20){
        errorMsg = "Username must be between 8-20 characters"
        return false;
    }
    for(let i = 0; i < str.length; i++){
        if(!((str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= 'a' && str[i] <= 'z') || (str[i] >= '0' && str[i] <= '9'))){
            errorMsg = "Username must not contain any symbols"
            return false;
        }
    }
    return true;
}

function validatePassword(str){
    if(str.length < 8 || str.length > 20){
        errorMsg = "Password must be between 8-20 characters"
        return false;
    }
    let haveNum = false, haveAlphabet = false;
    for(let i = 0; i < str.length; i++){
        if((str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= 'a' && str[i] <= 'z')){
            haveAlphabet = true;
        }else if(str[i] >= '0' && str[i] <= '9'){
            haveNum = true;
        }
        else{
            errorMsg = "Password must not contain any special characters"
            return false;
        }
    }
    if(!haveNum || !haveAlphabet){
        errorMsg = "Password must be alphanumerical"
        return false;
    }
    return true;
}

function validateEmail(str){
    if(str.length < 0){
        errorMsg = "Email must be filled"
        return false;
    }
    if(str.indexOf('@') == -1){
        errorMsg = "Email must have \'@\'"
        return false;
    }
    if(!str.endsWith('.com')){
        errorMsg = "Email must end with \.com"
        return false;
    }
    if(!isUnique(str)){
        errorMsg = "Email is taken"
        return false;
    }
    let domainName = str.substring(str.indexOf('@') + 1, str.indexOf('.'));
    if(domainName.length < 0){
        errorMsg = "Please use a valid email"
        return false;
    }
    return true;
}

function validateBday(date, month, year){
    if(typeof(date) !== Number){
        date = parseInt(date);
    }
    if(typeof(year) !== Number){
        year = parseInt(year);
    }
    if(month === "none"){
        document.getElementById('month-select').style = "border-bottom: red solid 1px;";
        errorMsg = "Please fill in your birth month";
        return false;
    }
    
    if((new Date().getUTCFullYear()- year) < 13){
        document.getElementById('bday-year').style = "border-bottom: red solid 1px;";
        errorMsg = "You must be 13 years or older to join KEYU Music"
        return false;
    }
    const oddMonth = ['jan', 'march', 'may', 'jul', 'aug', 'oct', 'dec'];
    let validDate = false;
    if(oddMonth.includes(month) && (date >= 1 && date <= 31)){
        validDate = true;
    }else if(month === "feb" && (date >= 1 && date <= 29) && year % 4 == 0){
        validDate = true;
    }else if(month === "feb" && (date >= 1 && date <= 28) && year % 4 != 0){
        validDate = true;
    }else if(!oddMonth.includes(month) && (date >= 1 && date <= 30)){
        validDate = true;
    }
    if(!validDate){
        document.getElementById('bday-date').style = "border-bottom: red solid 1px;";
        errorMsg = "Please fill in a valid date";
        return false;
    }
    return true;
}

function validateRegister(){
    const usernameVal = registerForm.elements['reg-username'].value;
    const emailVal = registerForm.elements['reg-email'].value;
    const passwordVal = registerForm.elements['reg-password'].value;
    const conPasswordVal = registerForm.elements['reg-con-password'].value;
    const bdayDateVal = registerForm.elements['bday-date'].value;
    const bdayMonthVal = registerForm.elements['bday-month'].value;
    const bdayYearVal = registerForm.elements['bday-year'].value;
    let isValid = true;

    //Username must be 8 - 20 Characters, can't contain symbols
    if(!validateUsername(usernameVal)){
        isValid = false;
        registerForm.elements['reg-username'].parentElement.classList.add('error')
        document.getElementById('r-username-err').innerText = errorMsg;
    }else{
        registerForm.elements['reg-username'].parentElement.classList.remove('error')
        document.getElementById('r-username-err').innerText = "";
    }
    resetError();
    //Email must contain '@', ends with '.com', domain name must be valid
    if(!validateEmail(emailVal)){
        isValid = false;
        registerForm.elements['reg-email'].parentElement.classList.add('error')
        document.getElementById('r-email-err').innerText = errorMsg;
    }else{
        registerForm.elements['reg-email'].parentElement.classList.remove('error')
        document.getElementById('r-email-err').innerText = "";
    }
    resetError();
    //Password must be 8-20 characters, alphanumerical
    if(!validatePassword(passwordVal)){
        isValid = false;
        registerForm.elements['reg-password'].parentElement.classList.add('error')
        document.getElementById('r-password-err').innerText = errorMsg;
    }else{
        registerForm.elements['reg-password'].parentElement.classList.remove('error')
        document.getElementById('r-password-err').innerText = "";
    }
    resetError();
    if(conPasswordVal !== passwordVal){
        isValid = false;
        registerForm.elements['reg-con-password'].parentElement.classList.add('error')
        errorMsg = "Confirm Password needs to match password"
        document.getElementById('r-con-password-err').innerText = errorMsg;
    }else{
        registerForm.elements['reg-con-password'].parentElement.classList.remove('error')
        document.getElementById('r-con-password-err').innerText = "";
    }
    resetError();
    if(!validateBday(bdayDateVal, bdayMonthVal, bdayYearVal)){
        isValid = false;
        document.getElementById('r-birthday-err').innerText = errorMsg;
    }else{
        resetBday();
        document.getElementById('r-birthday-err').innerText = "";
    }
    resetError();

    if(isValid){
        new User(usernameVal, emailVal, passwordVal, getBday(bdayDateVal, bdayMonthVal, bdayYearVal))
    }
}
