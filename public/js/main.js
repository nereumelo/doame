window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    let windowPosition = window.scrollY > 0

    header.classList.toggle('scrolling-ativado', windowPosition);
})


/*JS para modal*/
const btnLogin = () => {
    document.querySelector('.modal').style.display = "flex";
}

const btnClose = () => {
    document.querySelector('.modal').style.display = "none";
}