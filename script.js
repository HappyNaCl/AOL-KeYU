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

//Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else{
            entry.target.classList.remove('show')
        }
    })
})

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('card-show')
        }else{
            entry.target.classList.remove('card-show')
        }
    });
})

const hiddenElements = document.getElementsByClassName('hidden')
Array.from(hiddenElements).forEach((el) => observer.observe(el))

const cards = document.getElementsByClassName('card-hidden')
Array.from(cards).forEach((el) => cardObserver.observe(el))