require('dotenv').config();
const { Parceiro, Artigo, Imagem, Endereco } = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const saltRounds = 10;
const pepper = process.env.PWD_PEPPER;

const buscaParceiro = (id) => Parceiro.findByPk(id, ({
    include: ["enderecos", "imagens", {
        model: Artigo,
        as: 'artigos',
        include: ['imagens']
    }]
}));

const parceirosController = {
    view: async (req,res) => {
        await res.render('cadastroParceiro');
    },

    index: async (req, res) => {
        const parceiros = await Parceiro.findAll({
            attributes: ['id', 'nome', 'descricao', 'cnpj','imagem', 'email', 'updatedAt'],
            order: [['updatedAt', 'DESC']]
        });
        return res.json(parceiros);
        // return res.render('parceiros', {listaParceiros: parceiros});
    },

    show: async (req, res) => {
        const { id } = req.params;
        const parceiro = await buscaParceiro(id);

        return res.json(parceiro);
    },

    create: async (req, res) => {
        const { nome, descricao, cnpj, imagem, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha + pepper, saltRounds);

        const novoParceiro = await Parceiro.create({
            nome,
            descricao,
            cnpj,
            imagem,
            email,
            senha: senhaCrypt
        });
        return res.json(novoParceiro);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { senha, novaSenha } = req.body;

        const parceiro = await Parceiro.findByPk(id);
        const validaSenha = (parceiro && bcrypt.compareSync(senha + pepper, parceiro.senha));

        if (validaSenha) {
            const novaSenhaCrypt = bcrypt.hashSync(novaSenha + pepper, saltRounds);
            await Parceiro.update({ senha: novaSenhaCrypt }, { where: { id } });
        }

        return res.send(validaSenha);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const parceiroDeletado = await Parceiro.destroy({
            where: { id }
        });

        return res.json(parceiroDeletado);
    },



    // Controller (endereco)
    createAddress: async (req, res) => {
        const { parceiros_id } = req.params;
        const { pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.enderecos = await Endereco.create({
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

        return res.json(parceiro);
    },

    updateAddress: async (req, res) => {
        const { parceiros_id, id } = req.params;
        const endereco = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.enderecos = await Endereco.update(endereco, {
            where: { id }
        });

        return res.send(endereco);
    },

    deleteAddress: async (req, res) => {
        const { parceiros_id, id } = req.params;
        const endereco = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.enderecos = await Endereco.destroy({
            where: { id }
        });

        return res.send(endereco);
    },



    //Controler (Imagem)
    createImg: async (req, res) => {
        const { parceiros_id } = req.params;
        const { path } = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.imagens = await Imagem.create({
            parceiros_id,
            path,
        });

        return res.json(parceiro);
    },

    deleteImg: async (req, res) => {
        const { parceiros_id, id } = req.params;
        const imagem = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.imagens = await Imagem.destroy({
            where: { id }
        });

        return res.send(imagem);
    },



    // Controller (Artigo)
    createArt: async (req, res) => {
        const { parceiros_id } = req.params;
        const { titulo, corpo } = req.body;

        const parceiro = await buscaParceiro(parceiros_id)

        parceiro.artigos = await Artigo.create({
            parceiros_id,
            titulo,
            corpo
        });

        return res.json(parceiro);
    },

    updateArt: async (req, res) => {
        const { parceiros_id, id } = req.params;
        const newArtigo = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.artigo = await Artigo.update(newArtigo, {
            where: { id }
        });

        return res.json(newArtigo);
    },

    deleteArt: async (req, res) => {
        const { parceiros_id, id } = req.params;
        const artigoDel = req.body

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.artigos = await Artigo.destroy({
            where: { id }
        });

        return res.json(artigoDel);
    },
}

module.exports = parceirosController;