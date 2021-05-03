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