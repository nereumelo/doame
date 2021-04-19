module.exports = (sequelize, DataTypes) => {

    const Doador = sequelize.define(
        'Doador', {
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.INTEGER,
            createdAt: DataTypes.TIME,
            updatedAt: DataTypes.TIME
        }, {
            tableName: "doadores",
            timestamps: true 

        }
    );

    return Doador
}