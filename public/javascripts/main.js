//header fixo com scroll
var urlRoot = location.protocol + '//' + location.host;

window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    let windowPosition = window.scrollY > 0

    header.classList.toggle('scrolling-ativado', windowPosition);
})

//JS no modal
const btnLogin = () => {
    document.querySelector('.modal').style.display = "flex";
}

const btnClose = () => {
    document.querySelector('.modal').style.display = "none";

}

//animate-scroll

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element) {
        if ((windowTop) > element.offsetTop) {
            element.classList.add(animationClass)
        }
        // console.log(element.offsetTop);

    })
}

function login(){
    let nome = localStorage.getItem("nome");
    document.querySelector('.modal').style.display = "none";
    document.querySelector('.btn-login').style.display = "block";
    document.querySelector('.nome-usuario').innerText = nome.split(' ')[0];
    document.querySelector('.nome-usuario').style.marginRight = "40px";
    document.querySelector('.nome-usuario').style.marginLeft = "-20px";
    document.querySelector('.nome-usuario').style.color = "white";
    document.querySelector('.nome-usuario').style.fontSize = "16px";
    // if (localStorage.getItem('name') === '[]') {
    //     console.log('Local storage is empty');
    // }
}

window.addEventListener('scroll', function() {
    animeScroll();
})

window.addEventListener('load', function(){
    login()
})

const redirectUrl = (pathName) => {
    location = pathName;
}