//header fixo com scroll
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

const btnCadastro = () => {
    window.open('modalCadastro.html');
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
        console.log(element.offsetTop);

    })
}

window.addEventListener('scroll', function() {
    animeScroll();
})