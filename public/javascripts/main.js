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

const sendLoginData = async (email, senha) => {
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            senha
        }),
    });
    const data = await res.json();
    console.log(data);

    if (data.logado) {
        document.querySelector('.modal').style.display = "none";
        document.querySelector('.btn-login').style.display = "none";
        document.querySelector('.nome-usuario').innerText = data.usuario;
        document.querySelector('.nome-usuario').style.marginRight = "40px";
        document.querySelector('.nome-usuario').style.marginLeft = "-20px";
        document.querySelector('.nome-usuario').style.color = "white";
        document.querySelector('.nome-usuario').style.fontSize = "20px";

    } else {
        alert(data.message);
    }
}