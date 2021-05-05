require('dotenv').config();
const { Doador, Parceiro} = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const pepper = process.env.PWD_PEPPER;

const homeController = {
    view: async (req,res) => {
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + '/parceiros/JSON')
                .then(res => res.json())
                .then(data => {
                    return res.render('main', { usuario: req.session.usuarioLogado, listaParceiros: data });
                });

        } catch(err) {
            res.json({ erro: err });
        }
    },

    thanks: async (req, res) => {
        res.render('agradecimento');
    },

    auth: async (req,res) => {
        const { email, senha } = req.body;
        const doador = await Doador.findOne({ where: { email} });
        const parceiro = await Parceiro.findOne({ where: { email } });
        let usuario = (doador ? doador : parceiro);
        
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
    },

    editPerfil: async (req, res) => {
        const perfil = req.session.usuarioLogado;
        console.log(Object.keys(perfil).length);
        console.log(Object.keys(perfil));
        res.render('editPerfil', { usuario: perfil, });
    }
}

module.exports = homeController;