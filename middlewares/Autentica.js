
module.exports =  {
    estaLogado: (req, res, next) => {
        if (req.session.usuarioLogado != null) {
            next();
        } else {
            res.redirect('/');
        }
    },

    ehDoador: (req, res, next) => {
        if (req.session.usuarioLogado.cnpj == null) {
            next();
        } else {
            res.redirect('/');
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