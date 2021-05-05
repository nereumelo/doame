require('dotenv').config();
const { Parceiro, Artigo, Endereco, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const saltRounds = 10;
const pepper = process.env.PWD_PEPPER;

const buscaParceiro = (id) => Parceiro.findByPk(id, ({
    include: ["enderecos", "artigos"]
}));

const parceirosController = {
    viewCadastro: async (req,res) => {
        await res.render('cadastroParceiro');
    },

    indexJSON: async (req, res) => {
        const parceiros = await Parceiro.findAll({
            attributes: ['id', 'nome', 'descricao', 'cnpj', 'cep', 'imagem', 'email', 'updatedAt'],
            order: [['updatedAt', 'DESC']]
        });
        return res.json(parceiros);
        // return res.render('parceiros', {listaParceiros: parceiros});
    },

    viewIndex: async (req,res) => {
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + '/parceiros/JSON')
                .then(res => res.json())
                .then(data => {
                    return res.render('parceiros', { usuario: req.session.usuarioLogado, listaParceiros: data })
                });

        } catch(err) {
            return res.render('parceiros', console.log('erro: ' + err));
        }
    },

    showJSON: async (req, res) => {
        const { id } = req.params;
        const parceiro = await buscaParceiro(id);

        return res.json(parceiro);
    },

    viewShow: async (req, res) => {
        const { id } = req.params;
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + `/parceiros/${id}/JSON`)
                .then(res => res.json())
                .then(data => {
                    return res.render('perfilParceiro', { usuario: req.session.usuarioLogado, parceiro: data })
                });

        } catch(err) {
            return res.render('/', console.log('erro: ' + err));
        }
    },

    viewDonate: async (req, res) => {
        const { id } = req.params;
        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + `/parceiros/${id}/JSON`)
                .then(res => res.json())
                .then(data => {
                    return res.render('doacao', { usuario: req.session.usuarioLogado, parceiro: data })
                });

        } catch(err) {
            return res.render('/', console.log('erro: ' + err));
        }
       
    },

    create: async (req, res) => {
        const { nome, descricao, cnpj, cep, imagem, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha + pepper, saltRounds);

        const novoParceiro = await Parceiro.create({
            nome,
            descricao,
            cnpj,
            imagem,
            email,
            senha: senhaCrypt
        });

        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + `/parceiros/${novoParceiro.dataValues.id}/endereco?cep=${cep}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    console.log('endereco acessado')
                    return res.redirect('/');
                    // return res.render('perfilParceiro', { usuario: req.session.usuarioLogado, parceiro: data })
                });
        } catch(err) {
            console.log('endereco nao acessado')
            return res.status(400).redirect('/parceiros/cadastro');
        }
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
        console.log('criando endereco...');
        const query = req.query;
        const { parceiros_id } = req.params;
        const parceiro = await buscaParceiro(parceiros_id);

        try {
            await fetch(`https://viacep.com.br/ws/${query.cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    const { cep, logradouro, bairro, localidade, uf } = data;

                    parceiro.enderecos = Endereco.create({
                        parceiros_id,
                        estado: uf,
                        cidade: localidade,
                        bairro,
                        logradouro,
                        cep,
                    });
                });
        } catch(err) {
            console.log('erro ao criar endereco: ' + err);
            return res.status(400);
        }
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