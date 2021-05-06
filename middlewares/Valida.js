const querystring = require('querystring');

module.exports = {
    campoVazio: async (req, res, next) => {
        const dados = await req.body;
        const camposVazios = [];

        for (const [chave, valor] of Object.entries(dados)) {
            if (!valor)
                camposVazios.push(chave);
        }

        if (camposVazios.length) {
            const data = { 'erro': `Campo(s) '${camposVazios.join(', ')}' vazio(s).` };
            return res.redirect('/erro?' + querystring.stringify(data));
        }

        next();
    },

    checaAceite: async (req, res, next) => {
        const dados = await req.body;

        if (!dados.terms) {
            const data = { 'erro': `Termos de uso e política de privacidade não aceitos.` };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
        
        next();
    },

    campoRepetido: async (req, res, next) => {
        const { email, cnpj } = await req.body;
        const { Doador, Parceiro } = require('../models');

        if (!cnpj) {
            const doadores = await Doador.findOne({ where: { email } });

            if (doadores) {
                const data = { 'erro': `Email já cadastrado, cadastre outro email.` };
                return res.redirect('/erro?' + querystring.stringify(data));
            }
        } else {
            const parceirosCNPJ = await Parceiro.findOne({ where: { cnpj } });
            const parceirosEmail = await Parceiro.findOne({ where: { email } });

            if (parceirosCNPJ) {
                const data = { 'erro': `CNPJ já cadastrado, insira outro CNPJ.` };
                return res.redirect('/erro?' + querystring.stringify(data));
            } else if (parceirosEmail) {
                const data = { 'erro': `Email já cadastrado, insira outro email.` };
                return res.redirect('/erro?' + querystring.stringify(data));
            }
        }
        next();
    },

    formatoValido: async (req, res, next) => {
        const { email, senha, novaSenha } = await req.body;
        let senhaTeste = senha;

        if (email) {
            if (!tipoEmail(email)) {
                const data = { 'erro': "Email invalido" };
                return res.redirect('/erro?' + querystring.stringify(data));
            }
        } 

        if (novaSenha)
            senhaTeste = novaSenha;
        
        if (!tipoSenha(senhaTeste)) {
            const data = { 'erro': "Sua senha deve conter: Tamanho mínino de 8 caracteres e no mínimo 1 Letra maiúscula, 1 número e 1 símbolo especial ($, *, &, @, #)" };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
        next();
    },

    confirmaSenha: async (req, res, next) => {
        const { senha, senha2 } = await req.body;
        if (senha === senha2)
            next();
        else {
            const data = { 'erro': "Senhas diferentes inseridas." };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
    },

}

function tipoEmail(email) {
    let tipo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return tipo.test(email);
}

function tipoSenha(senha) {
    let tipo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return tipo.test(senha);
}