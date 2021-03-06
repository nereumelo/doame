module.exports = (sequelize, DataTypes) => {

    const Endereco = sequelize.define(
        "Endereco", {
        parceiros_id: DataTypes.INTEGER,
        estado: DataTypes.STRING(100),
        cidade: DataTypes.STRING(100),
        bairro: DataTypes.STRING(100),
        logradouro: DataTypes.STRING(200),
        cep: DataTypes.STRING(20),
    }, {
        tableName: "enderecos",
        timestamps: false
    }
    );

    Endereco.associate = (models) => {
        Endereco.belongsTo(models.Parceiro, { as: "parceiro", foreignKey: "parceiros_id" });
    };

    return Endereco;
}