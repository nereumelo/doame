const { Doador } = require('../models');


module.exports = async (request, response, next) => {
    let { nome, email, senha } = request.body;
    let doadores = await Doador.findAll({ where: { email } });

    if (doadores.length) {
        response.status(400).json({ erro: "Email já cadastrado, cadastre outro email!" });
        return;

    } else if (nome === null || email === null || senha === null) {
        response.status(400).json({ erro: "O usuario não cadastrou o nome, email ou senha!" });
        return;

    } else if (!tipoSenha(senha)) {
        response.status(400).json({ erro: "Sua senha deve conter: Tamanho mínino de 8 caracteres e no mínimo 1 Letra maiúscula, 1 número e um símbolo especial"});
        return;

    } else if (!tipoEmail(email)) {
        response.status(400).json({ erro: "Email invalido!" });
        return;

    } else {
        next();
    }
}

function tipoEmail(email) {
    let tipo = 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return tipo.test(email);
}

function tipoSenha(senha){
    let tipo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return tipo.test(senha);
}