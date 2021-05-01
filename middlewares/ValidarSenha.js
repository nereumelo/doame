module.exports = async (req, res, next) => {
    const { novaSenha } = req.body;
    console.log(novaSenha);

    if (!tipoSenha(novaSenha)) {
        return res.status(400).json({ erro: "Sua senha deve conter: Tamanho mínino de 8 caracteres e no mínimo 1 Letra maiúscula, 1 número e um símbolo especial" });
    } else {
        next();
    }
}

function tipoSenha(novaSenha){
    let tipo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return tipo.test(novaSenha);
}