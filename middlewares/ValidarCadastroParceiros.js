const { Parceiro } = require('../models');

module.exports = async (request, response, next) => {
    let { nome, cnpj, email, senha } = request.body;
    let parceiros = await Parceiro.findAll({ where: { email } });

    if (parceiros.length) {
        response.status(400).json({ erro: "Email já cadastrado, cadastre outro email!" });
        return;

    } else if (!tipoEmail(email)) {
        response.status(400).json({ erro: "Email invalido!" });
        return;

    } else if (nome === null || cnpj === null || email === null || senha === null) {
        response.status(400).json({ erro: "O usuario não cadastrou o nome, cnpj, email ou senha!" });
        return;

    }else if(!tipoSenha(senha)){
        response.status(400).json({ erro: "Sua senha deve conter: Tamanho mínino de 8 caracteres e no mínimo 1 Letra maiúscula, 1 número e um Símbolo especial"});
        return;
    }else {
        next();
    }
}

function tipoEmail(email) {
    let tipo = /\S+@\S+\.\S+/;
    return tipo.test(email);
}

function tipoSenha(senha){
    let tipo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return tipo.test(senha);
}