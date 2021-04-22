module.exports = (sequelize, DataTypes) => {

    const Imagem = sequelize.define(
        'Imagem', {
            parceiros_id: DataTypes.INTEGER,
            artigos_id: DataTypes.INTEGER,
            path: DataTypes.STRING(500),
            created_at: DataTypes.DATE

        }, {
            tableName: "imagens",
            timestamps: false
        }
    )
    return Imagem;
}
