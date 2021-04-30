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
            attributes: ['id','nome', 'cnpj', 'email']
        });

        return res.json(parceiros);
    },

    show: async (req, res) => {
        const { id } = req.params;
        const parceiro = await buscaParceiro(id);
        
        return res.json(parceiro);
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
        const { senha, novaSenha } = req.body;

        const parceiro = await Parceiro.findByPk(id);
        const validaSenha = (parceiro && bcrypt.compareSync(senha, parceiro.senha));

        if (validaSenha) {
            const novaSenhaCrypt = bcrypt.hashSync(novaSenha, 10);
            await Parceiro.update({ senha: novaSenhaCrypt }, { where: {id}});
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



    // metodos para endereço
    createAddress: async(req, res) =>{
        const { parceiros_id } = req.params; //filtrar a busca pelo id do parceiro
        const {pais, estado, cidade, bairro, logradouro, cep, numero, complemento } = req.body;
        
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

    deleteImg: async(req, res) => {
        const { parceiros_id, id } = req.params;
        const imagem = req.body;

        const parceiro = await buscaParceiro(parceiros_id);

        parceiro.imagens = await Imagem.destroy({
            where: { id }
        });

        return res.send(imagem);
    },
    
}
module.exports = parceirosController;