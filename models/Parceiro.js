module.exports = (sequelize, DataTypes) => {

    const Parceiro = sequelize.define(
        'Parceiro', {
        nome: DataTypes.STRING(150),
        descricao: DataTypes.STRING(200),
        cnpj: DataTypes.STRING(14),
        cep: DataTypes.STRING(8),
        imagem: DataTypes.STRING(500),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(100),
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updated_at',
            allowNull: false
        }
        // created_at: DataTypes.DATE,
        // updated_at: DataTypes.DATE,

    }, {
        tableName: "parceiros",
        timestamps: true
    });

    Parceiro.associate = (models) => {
        Parceiro.hasMany(models.Endereco, { as: "enderecos", foreignKey: "parceiros_id" });

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
