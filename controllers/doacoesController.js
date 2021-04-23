const { Doacao } = require("../models");
const Doador = require("../models/Doador");

const doacoesController = {
    index: async (req, res) => {
        const doacoes = await Doacao.findAll();
        return res.json(doacoes);
    },

    showDoadores: async (req, res) => {
        const { doadores_id } = req.params;

        const doacoesDoador = await Doacao.findAll({
            where: {
                doadores_id: doadores_id
            }
        });

        return res.json(doacoesDoador);
    },

    showParceiros: async (req, res) => {
        const { parceiros_id } = req.params;

        const doacoesParceiro = await Doacao.findAll({
            where: {
                parceiros_id: parceiros_id
            }
        });

        return res.json(doacoesParceiro);
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