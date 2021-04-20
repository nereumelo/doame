const { Parceiro } = require('../models');

const parceirosController = {
    index: async (req, res) => {
        const parceiros = await Parceiro.findAll();

        return res.json(parceiros);
    },
    create: async (req, res) => {
        const { enderecos_id, nome, cnpj, email, senha, created_at } = req.body;

        const novoParceiro = await Parceiro.create({
            enderecos_id,
            nome,
            cnpj,
            email,
            senha,
            created_at
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
      }
}

module.exports = parceirosController;