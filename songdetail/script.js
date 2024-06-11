//Canvas settings
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d')
let width = ctx.canvas.width = window.innerWidth
let height = ctx.canvas.height = 450;
let layers = [
    { speed: 0.015, scale: 0.2, count: 320 },
    { speed: 0.03, scale: 0.5, count: 60 },
    { speed: 0.05, scale: 0.75, count: 40 }
]

//Shooting Star properties
let angle = 145
let radius = 2
let maxLen = 300
let speed = {
    min: 10,
    max: 15,
}
let lifetime = 750
let paused = false;
let interval = 1650;


window.addEventListener("focus", () => {
    paused = false;
})
window.addEventListener("blur", () => {
    paused = true;
})
//Star arr
let stars = []
let shootingStars = []

//utils
function convertAngle(x1, y1, len, rad){
    let x2 = x1 + len * Math.cos(rad);
    let y2 = y1 + len * Math.sin(rad);
    return {x: x2, y: y2};
}

function rng(min, max){
    return (Math.random() * (max - min)) + min;
}

function degreeToRad(deg){
    return deg / 180 * Math.PI
}


//Star CLass
function Star(x, y, speed, dir){
    this.x = x;
    this.y = y;
    this.dirX = Math.cos(dir) * speed;
    this.dirY = Math.sin(dir) * speed;
    this.size = 0;
}

Star.prototype.draw = function(){
    ctx.fillStyle = "whitesmoke";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
}

Star.prototype.shoot = function(){
    let x = this.x;
    let y = this.y;
    let len = (maxLen * this.trailLen);
    let pos = convertAngle(x, y, -len, this.getHeading())

    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`

    let starLength = 5;
    ctx.beginPath();
    ctx.moveTo(x - 1, y + 1);

    ctx.lineTo(x, y + starLength);
    ctx.lineTo(x + 1, y + 1);

    ctx.lineTo(x + starLength, y);
    ctx.lineTo(x + 1, y - 1);

    ctx.lineTo(x, y + 1);
    ctx.lineTo(x, y - starLength);

    ctx.lineTo(x - 1, y - 1);
    ctx.lineTo(x - starLength, y);

    ctx.lineTo(x - 1, y + 1);
    ctx.lineTo(x - starLength, y);

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `rgba(255, 221, 157, ${this.opacity})`;
    ctx.beginPath();
    ctx.moveTo(x - 1, y - 1);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineTo(x + 1, y + 1);
    ctx.closePath();
    ctx.fill();
}

Star.prototype.getSpeed = function(){
    return Math.sqrt(this.dirX ** 2 + this.dirY ** 2);
}

Star.prototype.getHeading = function(){
    return Math.atan2(this.dirY, this.dirX)
}

Star.prototype.setSpeed = function(speed){
    let heading = this.getHeading();
    this.dirX = Math.cos(heading) * speed;
    this.dirY = Math.sin(heading) * speed;
}

Star.prototype.setHeading = function(heading){
    let speed = this.getSpeed();
    this.dirX = Math.cos(heading) * speed;
    this.dirY = Math.sin(heading) * speed;
}

Star.prototype.update = function(){
    this.x += this.dirX
    this.y += this.dirY

    this.draw();
}

//Animate

function shootStar(){
    let shootStar = new Star(rng(width / 2, width), rng(0, height / 2), 0, 0)
    
    shootStar.setSpeed(rng(speed.min, speed.max))
    shootStar.setHeading(degreeToRad(angle));
    shootStar.radius = radius;
    shootStar.opacity = 0;
    shootStar.trailLen = 0;
    shootStar.isAlive = true;
    shootStar.isDying = false;
    shootStar.isDead = false;
    shootingStars.push(shootStar)
}

function killStar(shootStar){
    setTimeout(() => {
        shootStar.isDead = true;
    }, lifetime)
}

function init(){
    for(let i = 0; i < layers.length; i++){
        let layer = layers[i];

        for(let j = 0; j < layer.count; j++){
            let star = new Star(rng(0, width), rng(0, height), 0, 0);
            star.size = radius * layer.scale;
            star.setSpeed(layer.speed)
            star.setHeading(degreeToRad(angle))
            stars.push(star)
        }
    }
}

function animate(){
    ctx.clearRect(0,0, width, height);

    for(let i = 0; i < stars.length; i++){
        if(stars[i].x < 0 || stars[i].y < 0 || stars[i].x > width || stars[i].y > height){
            stars[i].x = rng(0, width /2)
            stars[i].y = rng(0, height /2)
        } 
        stars[i].update();
    }

    for(let i = 0; i < shootingStars.length; i++){
        let shotStar = shootingStars[i];
        if(shotStar.isAlive){
            shotStar.opacity += 0.01;
            if(shotStar.opacity >= 1){
                shotStar.isAlive = false
                killStar(shotStar)
            }
        }
        if(shotStar.isDead){
            shotStar.opacity -= 0.01;
            if(shotStar.opacity <= 0){
                shotStar.isDying = false;
                shotStar.isDead = true;
            }
        }
        shotStar.trailLen += 0.01
        shotStar.update();
        if(shotStar.opacity >= 0.0){
            shotStar.shoot();
        }

    }

    for(let i = shootingStars.length - 1; i >= 0; i--){
        if(shootingStars[i].isDead){
            shootingStars.splice(i, 1)
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();
setInterval(() => {
    if(!paused) {
        shootStar();
    }
}, interval)

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

window.addEventListener('scroll', stickNavbar);


//Accordion

let accord = document.getElementsByClassName('accordion');
for(let i = 0; i < accord.length; i++){
    accord[i].addEventListener('click', () => {
        accord[i].classList.toggle("active");
        let panel = accord[i].nextElementSibling;
        if(panel.style.maxHeight){  
            panel.style.maxHeight = null;
        }else{
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    })
}
