module.exports = (sequelize, DataTypes) => {

    const Imagem = sequelize.define(
        'Imagem', {
            parceiros_id: DataTypes.INTEGER,
            artigos_id: DataTypes.INTEGER,
            url: DataTypes.STRING,
            created_at: DataTypes.DATE

        }, {
            tableName: "imagens",
            timestamps: true
        }
    )
    return Imagem;
}