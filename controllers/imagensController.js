const { Imagem } = require('../models');

const imagensController = {
    index: async (req, res) => {
        const imagens = await Imagem.findAll();

        return res.json(imagens);
    },
    
    create: async (req, res) => {
        const { parceiros_id, artigos_id, url, created_at } = req.body;

        const novaImagem = await Imagem.create({
            parceiros_id,
            artigos_id,
            url,
            created_at
        });
        return res.json(novaImagem);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const newImagem = req.body;
    
        await Imagem.update(newImagem, {
          where: {
            id: id
          }
        });
    
        return res.json(newImagem);
      },
      delete: async (req, res) => {
        const { id } = req.params;
    
        const imagemDeletada = await Imagem.destroy({
          where: {
            id: id
          }
        });
    
        return res.json(imagemDeletada);
      }

}

module.exports = imagensController;