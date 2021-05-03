require('dotenv').config();
const { Doador, Parceiro} = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const pepper = process.env.PWD_PEPPER;

const homeController = {
    view: async (req,res) => {
        try {
            await fetch('http://localhost:3000/parceiros/')
                .then(res => res.json())
                .then(data => {
                    res.render('main', { listaParceiros: data })
                });

        } catch(err) {
            res.render('main', console.log('erro: ' + err));
        }
    },

    auth: async (req,res) => {
        const { email, senha } = req.body;
        const usuario = await Doador.findOne({ where: { email} });
        
        if (!usuario) {
            const usuario = await Parceiro.findOne({ where: { email } });
        }

        if(!usuario) {
            return res.status(400).json({ 
                message: 'Usuário não encontrado no banco de dados',
                logado: false
            });
        }
        else if (bcrypt.compareSync(senha + pepper, usuario.senha)) {
            return res.json({
                message: 'Usuário logado com sucesso',
                logado: true,
                usuario: usuario.nome
            });
        }
        else {
            return res.status(400).json({
                message: 'Credenciais incorretas',
                logado: false
            });
        }
    }
}

module.exports = homeController;