const { Parceiro, Artigo, Imagem, Endereco } = require('../models');
const bcrypt = require('bcryptjs');

const buscaParceiro = (id) => Parceiro.findByPk(id, ({
    include: ["enderecos", "imagens", {
        model: Artigo,
        as: 'artigos',
        include: ['imagens']
    }]
}));

const parceirosController = {
    index: async (req, res) => {
        const parceiros = await Parceiro.findAll({
            include: ["enderecos", "imagens", {
                model: Artigo,
                as: 'artigos',
                include: ['imagens']
            }]
        });

        return res.json(parceiros);
    },

    create: async (req, res) => {
        const { nome, cnpj, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const novoParceiro = await Parceiro.create({
            nome,
            cnpj,
            email,
            senha : senhaCrypt
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
    },

    // //metodos para endereço
    createAddress: async(req, res) =>{
        const {id} = req.params; //filtrar a busca pelo id do parceiro
        const {pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;
        
        const parceiro = await buscaParceiro(id);
        
        parceiro.enderecos = await Endereco.create({

            parceiros_id: id,
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
    indexImg: async (req, res) => {
        const { parceiros_id } = req.params;

        const imagens = await Imagem.findAll({
            attributes: ['id', 'artigos_id','path', 'created_at'],
            where: {
                parceiros_id
                
            }
        });
        return res.json(imagens);
    },


    createImg: async (req, res) => {
        const { parceiros_id } = req.params;
        const { artigos_id, path } = req.body;

        const novaImagem = await Imagem.create({
            parceiros_id,
            artigos_id,
            path,
        });
        
        return res.json(novaImagem);
    },
}
module.exports = parceirosController;