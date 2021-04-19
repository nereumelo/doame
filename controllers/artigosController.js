const { Artigo } = require('../models');

const artigosController = {
  index: async (req, res) => {
    const artigos = await Artigo.findAll();
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
  }
}

module.exports = artigosController;