const querystring = require('querystring');

module.exports =  {
    estaLogado: (req, res, next) => {
        if (req.session.usuarioLogado != null) {
            next();
        } else {
            const data = { 'erro': 'É preciso entrar para acessar esta página.' };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
    },

    ehDoador: (req, res, next) => {
        if (req.session.usuarioLogado.cnpj == null) {
            next();
        } else {
            const data = { 'erro': 'Apenas doadores podem acessar esta página.' };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
    },

    ehParceiro: (req, res, next) => {
        if (req.session.usuarioLogado.cnpj != null) {
            next();
        } else {
            const data = { 'erro': 'Apenas parceiros podem acessar esta página.' };
            return res.redirect('/erro?' + querystring.stringify(data));
        }
    },

}