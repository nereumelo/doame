module.exports = (sequelize, DataTypes) => {

    const Endereco = sequelize.define(
        "Endereco", {
            pais: DataTypes.STRING,
            estado: DataTypes.STRING,
            cidade: DataTypes.STRING,
            bairro: DataTypes.STRING,
            logradouro: DataTypes.STRING,
            cep: DataTypes.STRING,
            numero: DataTypes.STRING,
            complemento: DataTypes.STRING
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