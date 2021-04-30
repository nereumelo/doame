module.exports = async (req, res, next) => {
    const { novaSenha } = req.body;
    console.log(novaSenha);

    if (novaSenha.length < 6 || novaSenha.length >= 12) {
        return res.status(400).json({ erro: "A senha não pode ser menor que 6 ou maior de 12 digitos!" });
    } else {
        next();
    }
}