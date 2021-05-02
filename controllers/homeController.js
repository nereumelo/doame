require('dotenv').config();
const { Doador, Parceiro} = require('../models');
const bcrypt = require('bcryptjs');
const pepper = process.env.PWD_PEPPER;

const homeController = {
    index: async (req,res) => {

        res.render('main');
    },

    auth: async (req,res) => {
        const { email, senha } = req.body;
        const usuario = await Doador.findOne({ where: { email} });
        
        if (!usuario) {
            const usuario = await Parceiro.findOne({ where: { email } });
        }

        if(!usuario) {
            return res.status(400).json({ erro: 'Usuário não encontrado no banco de dados' });
        }
        else if (bcrypt.compareSync(senha + pepper, usuario.senha)) {
            return res.json({ authStatus: 'Usuário logado com sucesso' });
        }
        else {
            return res.status(400).json({ authStatus: 'Credenciais incorretas' });
        }
    }
}

module.exports = homeController;