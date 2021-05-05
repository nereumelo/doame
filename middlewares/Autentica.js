
module.exports =  {
    estaLogado: (req, res, next) => {
        if (req.session.usuarioLogado != null && req.session.usuarioLogado.cnpj == null) {
            next();
        } else {
            res.redirect('/');
        }
    },

}