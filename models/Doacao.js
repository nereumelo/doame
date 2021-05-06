
module.exports = (sequelize, DataTypes) => {

    const Doacao = sequelize.define('Doacao', {
        parceiros_id: DataTypes.INTEGER,
        doadores_id: DataTypes.INTEGER,
        valor: DataTypes.DOUBLE,
        forma_pagamento: DataTypes.STRING(45),
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
        },
    }, 
    {
        tableName: "doacoes",
        timestamps: true
    });

    Doacao.associate = (models) => {
        Doacao.belongsTo(models.Parceiro, { as: "parceiro", foreignKey: "parceiros_id" });
        Doacao.belongsTo(models.Doador, { as: "doador", foreignKey: "doadores_id" });
    };

    return Doacao;
}