
module.exports =  {
    estaLogado: (req, res, next) => {
        if (req.session.usuarioLogado != null) {
            next();
        } else {
            res.redirect('/');
        }
    },

}