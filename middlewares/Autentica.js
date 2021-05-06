
module.exports =  {
    estaLogado: (req, res, next) => {
        if (req.session.usuarioLogado != null) {
            next();
        } else {
            res.redirect('/erro');
        }
    },

    ehDoador: (req, res, next) => {
        if (req.session.usuarioLogado.cnpj == null) {
            next();
        } else {
            res.redirect('/erro');
        }
    },

    ehParceiro: (req, res, next) => {
        if (req.session.usuarioLogado.cnpj != null) {
            next();
        } else {
            res.redirect('/');
        }
    },

}