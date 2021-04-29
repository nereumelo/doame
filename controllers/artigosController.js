const { Artigo, Parceiro, Imagem } = require('../models');

const artigosController = {
    index: async (req, res) => {
        const artigos = await Artigo.findAll({
            include: [{
                model: Imagem,
                as: 'imagens',
                attributes: ['id', 'path'],
                where: { [Imagem.artigo_id]: [Artigo.id] }
            }],
        });
        return res.json(artigos);
    },

    create: async (req, res) => {
        const { parceiros_id, titulo, corpo } = req.body;
        console.log(req.body);
        const novoArtigo = await Artigo.create({
            parceiros_id,
            titulo,
            corpo
        });

        return res.json(novoArtigo);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const newArtigo = req.body;

        await Artigo.update(newArtigo, {
            where: {
                id: id
            }
        });

        return res.json(newArtigo);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const artigoDeletado = await Artigo.destroy({
            where: {
                id: id
            }
        });

        return res.json(artigoDeletado);
    },

    //Controller (IMAGEM)
    indexImg: async (req, res) => {
        const { parceiros_id, artigos_id } = req.params;

        const imagens = await Imagem.findAll({
            attributes: ['id', 'path', 'created_at'],
            where: {
                parceiros_id,
                artigos_id,
            }
        });

        return res.json(imagens);
    },

    createImg: async (req, res) => {
        const { parceiros_id, artigos_id } = req.params;
        const { path } = req.body;

        const novaImagem = await Imagem.create({
            parceiros_id,
            artigos_id,
            path,
        });
        
        return res.json(novaImagem);
    },

    // updateImg: async (req, res) => {
    //     const { id } = req.params;
    //     const imagem = req.body;

    //     await Imagem.update(imagem, {
    //         where: { id }
    //     });

    //     return res.json(imagem);
    // },

    deleteImg: async (req, res) => {
        const { id } = req.params;

        const imagemDeletada = await Imagem.destroy({
            where: { id }
        });

        return res.json(imagemDeletada);
    }
    
}

module.exports = artigosController;