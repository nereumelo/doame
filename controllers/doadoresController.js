const { Doador } = require('../models');

const doadoresController = {
  index: async (req, res) => {
    const doadores = await Doador.findAll();
    return res.json(doadores);
  },

  create: async (req, res) => {
    const { nome, email, senha } = req.body;

    const doador = await Doador.create({
      nome,
      email,
      senha,
    });

    return res.json(doador);
  },

}

module.exports = doadoresController;