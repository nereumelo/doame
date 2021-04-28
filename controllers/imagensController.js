const { Imagem } = require('../models');

const imagensController = {
    indexImg: async (req, res) => {
        const imagens = await Imagem.findAll();
        return res.json(imagens);
    },

    showImg: async(req, res) => {
        const { artigos_id } = req.params;

        const imagem = await Imagem.findAll({
            where: {
                artigos_id
            }
        });

        return res.json(imagem);
    },

    createImg: async (req, res) => {
        const { parceiros_id, artigos_id, url } = req.body;

        const novaImagem = await Imagem.create({
            parceiros_id,
            artigos_id,
            path,
        });
        return res.json(novaImagem);
    },

    updateImg: async (req, res) => {
        const { id } = req.params;
        const newImagem = req.body;

        await Imagem.update(newImagem, {
            where: { id }
        });

        return res.json(newImagem);
    },
    deleteImg: async (req, res) => {
        const { id } = req.params;

        const imagemDeletada = await Imagem.destroy({
            where: { id }
        });

        return res.json(imagemDeletada);
    },

}

module.exports = imagensController;