require("dotenv").config();
const { Doador, Parceiro } = require("../models");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const pepper = process.env.PWD_PEPPER;
const saltRounds = 10;

const homeController = {
    view: async (req, res) => {
        const url = req.protocol + "://" + req.get("host");
        try {
            await fetch(url + "/parceiros/JSON")
                .then((res) => res.json())
                .then((data) => {
                    return res.render("main", {
                        usuario: req.session.usuarioLogado,
                        listaParceiros: data,
                    });
                });
        } catch (err) {
            res.json({ erro: err });
        }
    },

    thanks: async (req, res) => {
        res.render("agradecimento");
    },

    auth: async (req, res) => {
        const { email, senha } = req.body;
        const doador = await Doador.findOne({ where: { email } });
        const parceiro = await Parceiro.findOne({ where: { email } });
        let usuario = doador ? doador : parceiro;

        if (!usuario) {
            return res.status(400).json({
                message: "Usuário não encontrado no banco de dados",
                usuario: null,
            });
        } else if (bcrypt.compareSync(senha + pepper, usuario.senha)) {
            req.session.usuarioLogado = usuario;
            return res.redirect("/");
        } else {
            return res.status(400).json({
                message: "Credenciais incorretas",
                usuario: null,
            });
        }
    },

    logout: async (req, res) => {
        req.session.usuarioLogado = null;
        return res.redirect("/");
    },

    viewPerfil: async (req, res) => {
        if (req.session.usuarioLogado) {
            const url = req.protocol + "://" + req.get("host");
            let user;

            try {
                if (req.session.usuarioLogado.cnpj) user = 'parceiro';
                else user = 'doador';

                await fetch(url + `/doacoes/${user}/${req.session.usuarioLogado.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        return res.render("perfil", {
                            usuario: req.session.usuarioLogado,
                            listaDoacoes: data,
                        });
                    });
            } catch (err) {
                res.json({ erro: err });
            }


            res.render("perfil", { usuario: req.session.usuarioLogado });
        }
        else 
            res.redirect("/");
    },

    viewEditPerfil: async (req, res) => {
        if (req.session.usuarioLogado)
            res.render("editPerfil", { usuario: req.session.usuarioLogado });
        else 
            res.redirect("/");
    },

    editPerfil: async (req, res) => {
        const usuario = req.session.usuarioLogado;
        const perfil = req.body;

        if (perfil.nome) 
            usuario.nome = perfil.nome;
        if (perfil.descricao) 
            usuario.descricao = perfil.descricao;
        if (perfil.cnpj) 
            usuario.cnpj = perfil.cnpj;
        if (perfil.cep) 
            usuario.cep = perfil.cep;
        if (perfil.imagem) 
            usuario.imagem = perfil.imagem;
        if (perfil.email) 
            usuario.email = perfil.email;
        if (perfil.senha && bcrypt.compareSync(perfil.senha + pepper, usuario.senha)) {
            const novaSenhaCrypt = bcrypt.hashSync(perfil.novaSenha + pepper, saltRounds);
            usuario.senha = novaSenhaCrypt;
        }

        if(usuario.cnpj) {
            await Parceiro.update(usuario, {
                where: { id: usuario.id }
            });
        } else {
            await Doador.update(usuario, {
                where: { id: usuario.id }
            });
        }

        return res.redirect('/perfil/edit');
    },

    DeletePerfil: async (req, res) => {
        const usuario = req.session.usuarioLogado;
        
        if(usuario.cnpj) {
            await Parceiro.destroy({
                where: { id: usuario.id },
                cascade: true
            });
        } else {
            await Doador.destroy({
                where: { id: usuario.id },
                cascade: true
            });
        }

        req.session.usuarioLogado = null;

        return res.redirect('/');
    }
};

module.exports = homeController;
