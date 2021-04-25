const { response } = require('express');
const { request } = require('../app');
const doadoresController = require('../controllers/doadoresController');
const { Doador, sequelize} = require('../models');


module.exports = async(request, response, next) => {
    let {nome, email, senha} = request.body;
    let doadores = await Doador.findAll({where: {email}});

    if(doadores.length) {
        response.status(400).json({erro: "Email já cadastrado, cadastre outro email!"});
        return;

    }else if(nome === null || email === null || senha === null){
        response.status(400).json({erro: "O usuario não cadastrou o nome, email ou senha!"});
        return;

    }else if(senha.length < 6 || senha.length >= 12){
        response.status(400).json({erro: "A senha não pode ser menor que 6 ou maior de 12 digitos!"});
        return;

    }else if(!TipoEmail(email)){
        response.status(400).json({erro: "Email invalido!"});
        return;
       
       }else{
        next();
    }
}

function TipoEmail(email){
    let tipo = /\S+@S+\.\S+/
    return tipo.test(email);
}