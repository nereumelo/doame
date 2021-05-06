const { Doacao, Parceiro, Doador } = require("../models");

const doacoesController = {
    index: async (req, res) => {
        const doacoes = await Doacao.findAll({
            order: [['updatedAt', 'DESC']]
        });

        return res.json(doacoes);
    },

    showDoadores: async (req, res) => {
        const { doadores_id } = req.params;

        const doacoesDoador = await Doacao.findAll({
            where: { doadores_id },
            include: [{
                model: Parceiro,
                as: "parceiro",
                attributes: ['nome']
            }],
            order: [['updatedAt', 'DESC']]
        });

        return res.json(doacoesDoador);
    },

    showParceiros: async (req, res) => {
        const { parceiros_id } = req.params;

        const doacoesParceiro = await Doacao.findAll({
            where: { parceiros_id },
            include: [{
                model: Doador,
                as: "doador",
                attributes: ['nome']
            }],
            order: [['updatedAt', 'DESC']]
        });

        return res.json(doacoesParceiro);
    },

    create: async (req, res) => {
        const { valor, forma_pagamento } = req.body;
        const { parceiros_id, doadores_id } = req.query;
        console.log(valor + forma_pagamento + parceiros_id + doadores_id);

        const novaDoacao = await Doacao.create({
            parceiros_id,
            doadores_id,
            valor: parseFloat(valor),
            forma_pagamento,
          
        });

        return res.redirect('/obrigado');
    },

    update: async (req, res) => {
        const { id } = req.params;
        const atualizarDoacao = req.body;

        await Doacao.update(atualizarDoacao, {
            where: { id }
        });

        return res.json(atualizarDoacao);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const deletarDoacao = await Doacao.destroy({
            where: { id }
        });

        return res.json(deletarDoacao);
    },

}

module.exports = doacoesController;