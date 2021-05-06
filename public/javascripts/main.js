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

const modal = document.getElementById('modal_container');
const close = document.getElementById('close');

function callModal() {
    modal.classList.add('show');
}

close.addEventListener('click', () => {
    modal.classList.remove('show');
    location.reload();
})