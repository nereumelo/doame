module.exports = {
    campoVazio: async (req, res, next) => {
        const dados = await req.body;
        const camposVazios = [];

        if (!dados.terms)
            return res.status(400).json({ erro: `Termos de uso e política de privacidade não aceitos.` });

        for (const [chave, valor] of Object.entries(dados)) {
            if (!valor)
                camposVazios.push(chave);
        }

        if (camposVazios.length)
            return res.status(400).json({ erro: `Campo(s) '${camposVazios.join(', ')}' vazio(s).` });

        next();
    },

    campoRepetido: async (req, res, next) => {
        const { email, cnpj } = await req.body;
        const { Doador, Parceiro } = require('../models');

        if (!cnpj) {
            const doadores = await Doador.findOne({ where: { email } });

            if (doadores) {
                return res.status(400).json({ erro: `Email já cadastrado, cadastre outro email.` });
            }
        } else {
            const parceirosCNPJ = await Parceiro.findOne({ where: { cnpj } });
            const parceirosEmail = await Parceiro.findOne({ where: { email } });

            if (parceirosCNPJ) {
                return res.status(400).json({ erro: `CNPJ já cadastrado, cadastre outro CNPJ.` });
            } else if (parceirosEmail) {
                return res.status(400).json({ erro: `Email já cadastrado, cadastre outro email.` });
            }
        }
        next();
    },

    formatoValido: async (req, res, next) => {
        const { email, senha, novaSenha } = await req.body;
        let senhaTeste = senha;

        if (email) {
            if (!tipoEmail(email))
                return res.status(400).json({ erro: "Email invalido" });
        } 

        if (novaSenha)
            senhaTeste = novaSenha;
        
        if (!tipoSenha(senhaTeste))
            return res.status(400).json({ erro: "Sua senha deve conter: Tamanho mínino de 8 caracteres e no mínimo 1 Letra maiúscula, 1 número e 1 símbolo especial ($, *, &, @, #)" });
        next();
    },

    confirmaSenha: async (req, res, next) => {
        const { senha, senha2 } = await req.body;
        if (senha === senha2)
            next();
        else
            return res.status(400).json({ erro: "Senhas diferentes inseridas." });
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