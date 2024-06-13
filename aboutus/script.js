//Navbar
const toggleButton = document.getElementById('burger-menu');
const navbarLinks = document.getElementsByClassName('nav-buttons')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})

const navbar = document.getElementById('nav-bar');
let stickyOffset = navbar.offsetTop;

function stickNavbar(){
    if(document.documentElement.scrollTop > 0){
        navbar.classList.add('sticky');
    }else{
        navbar.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickNavbar)

//Message Accordion
function toggleMessage(){
    let message = document.getElementsByClassName('message-panel')[0];
    if(message.style.maxWidth){
        const buttonIcon = document.getElementById('message-button').children[0];
        const messages = document.getElementsByClassName('message')[0];
        messages.style.opacity = 0;
        buttonIcon.classList.replace('fa-arrow-right', 'fa-arrow-left');
        message.style.maxWidth = null;
    }else{
        const buttonIcon = document.getElementById('message-button').children[0];
        const messages = document.getElementsByClassName('message')[0];
        messages.style.opacity = 1;
        buttonIcon.classList.replace('fa-arrow-left', 'fa-arrow-right');
        message.style.maxWidth = '100%';
    }
}