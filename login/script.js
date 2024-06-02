let loginButton = document.getElementById('login-button');
let registerButton = document.getElementById('register-button');

loginButton.addEventListener('click', () =>{
    document.querySelector('#flipper').classList.toggle("flip")
})

registerButton.addEventListener('click', () => {
    document.querySelector('#flipper').classList.toggle("flip")
})