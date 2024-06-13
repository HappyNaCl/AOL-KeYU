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

//Full Carousel
const fullPrev = document.getElementsByClassName('full-prev');
const fullNext = document.getElementsByClassName('full-next');
const fullCarousels = document.getElementsByClassName('full-carousel');
const fullTracks = document.getElementsByClassName('full-track');

let fullCarouselWidth = [];
let fullCarouselIndex = [];
for(let i = 0; i < fullCarousels.length; i++){
    fullCarouselWidth.append(fullCarousels[i].offsetWidth);
    fullCarouselIndex.append(0);
}

window.addEventListener('resize', ()=>{
    for(let i = 0; i < fullCarousels.length; i++){
        fullCarouselWidth[i] = fullCarousels[i].offsetWidth;
    }
})

for(let i = 0; i < fullCarousels.length; i++){
    fullNext[i].addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(function(){}, 1000);
        index++;
        fullPrev[i].classList.add('show');
        fullTracks[i].style.transform = `translateX(${ fullCarouselIndex[i] * (-fullCarouselWidth[i]) }px)`
        if(fullTracks[i] - (fullCarouselIndex[i] * fullCarouselWidth[i]) <  (fullCarouselIndex[i] * fullCarouselWidth[i])){
            fullNext[i].classList.add('hide');
        }
    })
}

