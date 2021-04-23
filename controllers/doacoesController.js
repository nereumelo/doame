const { Doacao } = require("../models");
const Doador = require("../models/Doador");

const doacoesController = {
    index: async (req, res) => {
        const doacoes = await Doacao.findAll();
        return res.json(doacoes);
    },

    create: async (req, res) => {
        const { parceiros_id, doadores_id, valor, forma_pagamento, status, created_at } = req.body;

        const novaDoacao = await Doacao.create({
            parceiros_id,
            doadores_id,
            valor,
            forma_pagamento,
            status,
            created_at
        });

        return res.json(novaDoacao);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const atualizarDoacao = req.body;

        await Doador.update( atualizarDoacao, {
            where: { id }
        });

        return res.json(atualizarDoacao);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const deletarDoacao = await Doador.destroy({
            where: { id: id }
        });

        return res.json(deletarDoacao);

    },

}

module.exports = doacoesController;