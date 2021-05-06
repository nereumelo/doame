require('dotenv').config();
const { Parceiro, Endereco, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const saltRounds = 10;
const pepper = process.env.PWD_PEPPER;

const buscaParceiro = (id) => Parceiro.findByPk(id, ({
    include: ["enderecos"]
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
        let _imagem;

        if (imagem) {
            _imagem = imagem;
        }
        else {
            _imagem = "/images/default.png";
        }

        const novoParceiro = await Parceiro.create({
            nome,
            descricao,
            cnpj,
            cep,
            imagem: _imagem,
            email,
            senha: senhaCrypt
        });

        const url = req.protocol + '://' + req.get('host');
        try {
            await fetch(url + `/parceiros/${novoParceiro.dataValues.id}/endereco?cep=${cep}`, {
                method: 'POST',
            })
            .then(() => {
                return res.redirect('/');
            });
        } catch(err) {
            const data = { 'erro': 'CEP não encontrado.' };
            return res.redirect('/erro?' + querystring.stringify(data));
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
            } catch(err) {}
        return res.redirect('/');
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
}

module.exports = parceirosController;