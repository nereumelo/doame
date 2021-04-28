const { Parceiro, Imagem } = require('../models');
const bcrypt = require('bcryptjs');

const parceirosController = {
    index: async (req, res) => {
        const parceiros = await Parceiro.findAll();

        return res.json(parceiros);
    },
    create: async (req, res) => {
        const { nome, cnpj, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const novoParceiro = await Parceiro.create({
            nome,
            cnpj,
            email,
            senha : senhaCrypt
        });
        return res.json(novoParceiro);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const newParceiro = req.body;

        await Parceiro.update(newParceiro, {
            where: {
                id: id
            }
        });

        return res.json(newParceiro);
    }
    ,
    delete: async (req, res) => {
        const { id } = req.params;

        const parceiroDeletado = await Parceiro.destroy({
            where: {
                id: id
            }
        });

        return res.json(parceiroDeletado);
    },

    //Controler (Imagem)
    indexImg: async (req, res) => {
        const { parceiros_id } = req.params;

        const imagens = await Imagem.findAll({
            attributes: ['id', 'artigos_id','path', 'created_at'],
            where: {
                parceiros_id
                
            }
        });
        return res.json(imagens);
    },

    createImg: async (req, res) => {
        const { parceiros_id } = req.params;
        const { artigos_id, path } = req.body;

        const novaImagem = await Imagem.create({
            parceiros_id,
            artigos_id,
            path,
        });
        
        return res.json(novaImagem);
    },

    



}
module.exports = parceirosController;