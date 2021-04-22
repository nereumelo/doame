module.exports = (sequelize, DataTypes) => {

    const Endereco = sequelize.define(
        "Endereco", {
            parceiros_id: DataTypes.INTEGER,
            pais: DataTypes.STRING(100),
            estado: DataTypes.STRING(100),
            cidade: DataTypes.STRING(100),
            bairro: DataTypes.STRING(100),
            logradouro: DataTypes.STRING(200),
            cep: DataTypes.STRING(20),
            numero: DataTypes.STRING(10),
            complemento: DataTypes.STRING(150)
        }, {
            tableName: "enderecos",
            timestamps: false
        }
    );

    //está comentado porque, falta fazer na tabela Parceiros a associação.

   /* Endereco.associate = (models) => {
        //relação 1:1 (endereço tem um pareceiro)
        Endereco.belongsTo(models.Parceiro, {as: "parceiros", foreignKey: "enderecos_id"});
    }*/

    return Endereco;
}