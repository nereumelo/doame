module.exports = (sequelize, DataTypes) => {

    const Parceiro = sequelize.define(
        'Parceiro', {
        nome: DataTypes.STRING(150),
        cnpj: DataTypes.STRING(20),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(45),
        created_at: DataTypes.DATE,

    }, {
        tableName: "parceiros",
        timestamps: false
    });

    Parceiro.associate = (models) => {
        Parceiro.hasMany(models.Endereco, { as: "enderecos", foreignKey: "parceiros_id" });
        Parceiro.hasMany(models.Artigo, { as: "artigos", foreignKey: "parceiros_id" });
        Parceiro.hasMany(models.Imagem, { as: "imagens", foreignKey: "parceiros_id" });

        Parceiro.belongsToMany(models.Doador, {
            as: "doacao", 
            through: "doacoes", 
            foreignKey: "parceiros_id", 
            otherKey: "doadores_id", 
            timestamps: false
        });
    };

    return Parceiro;
}