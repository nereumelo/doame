const { Endereco, sequelize } = require('../models');

const enderecoController = {
    index: async (req, res) => {
        const enderecos = await Endereco.findAll()
        return res.json(enderecos);
    },

    create: async (req, res) => {
        const { parceiros_id, pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;
        const novoEndereco = await Endereco.create({
            parceiros_id,
            pais,
            estado,
            cidade,
            bairro,
            logradouro,
            cep,
            numero,
            complemento,
        });
        return res.json(novoEndereco);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const endereco = req.body;

        await Endereco.update(endereco, {
            where: { id }
        });

        return res.send(endereco);
    },

    delete: async (req, res) => {
        let { id } = req.params;

        const endereco = await Endereco.destroy({
            where: { id }
        });

        return res.json(endereco);
    }

}

module.exports = enderecoController;