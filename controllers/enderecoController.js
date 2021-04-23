const { Endereco, sequelize } = require('../models');

const enderecoController = {
    index: async (req, res) => {
        let enderecos = await Endereco.findAll()
        return res.json(enderecos);
    },

    create: async (req, res) => {
        let { pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;
        let crearEndereco = await Endereco.create({
            pais,
            estado,
            cidade,
            bairro,
            logradouro,
            cep,
            numero,
            complemento
        });

        return res.json(crearEndereco)
    },

    update: async (req, res) => {
        let { id } = req.params;
        let { pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;

        let enderecoAtualizar = await Endereco.update({
            pais,
            estado,
            cidade,
            bairro,
            logradouro,
            cep,
            numero,
            complemento
        }, {
            where: { id }
        });

        return res.send(enderecoAtualizar);
    },

    delete: async (req, res) => {
        let { id } = req.params;

        const enderecoDeletado = await Endereco.destroy({
            where: { id }
        });

        return res.json(enderecoDeletado);
    }


}

module.exports = enderecoController;