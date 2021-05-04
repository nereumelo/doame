require('dotenv').config();
const { Doador, Parceiro} = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const pepper = process.env.PWD_PEPPER;

const homeController = {
    view: async (req,res) => {
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + '/parceiros')
                .then(res => res.json())
                .then(data => {
                    return res.render('main', { usuario: req.session.usuarioLogado, listaParceiros: data });
                });

        } catch(err) {
            res.json({ erro: err });
            res.render('error');
        }
    },


    listaParceiros: async (req,res) => {
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + '/parceiros')
                .then(res => res.json())
                .then(data => {
                    return res.render('parceiros', { usuario: req.session.usuarioLogado, listaParceiros: data })
                });

        } catch(err) {
            return res.render('parceiros', console.log('erro: ' + err));
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
                usuario: null
            });
        }
        else if (bcrypt.compareSync(senha + pepper, usuario.senha)) {
            req.session.usuarioLogado = usuario;
            return res.redirect('/');
        }
        else {
            return res.status(400).json({
                message: 'Credenciais incorretas',
                usuario: null
            });
        }
    },

    logout: async (req, res) => {
        req.session.usuarioLogado = null;
        return res.redirect('/');
    }
}

module.exports = homeController;