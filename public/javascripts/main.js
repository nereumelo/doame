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

const nomeUsuario = document.querySelector(".login");
const menu = document.querySelector(".menu");
nomeUsuario.addEventListener("click", () => {
    if(menu.style.display == 'none')
        menu.style.display = "flex";
    else
        menu.style.display = "none";
});

//animate-scroll

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    console.log('teste')
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element) {
        if ((windowTop) > element.offsetTop) {
            element.classList.add(animationClass)
        }
        // console.log(element.offsetTop);
    });
}


window.addEventListener('scroll', function() {
    animeScroll();
})

const callConfirmModal = () => {
    document.querySelector('.confirmModal').style.display = "block";
}

const closeConfirmModal = () => {
    document.querySelector('.confirmModal').style.display = "none";

}