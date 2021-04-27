
module.exports = (sequelize, DataTypes) => {

    const Doacao = sequelize.define(
        'Doacao', {
        parceiros_id: DataTypes.INTEGER,
        doadores_id: DataTypes.INTEGER,
        valor: DataTypes.DOUBLE,
        forma_pagamento: DataTypes.STRING(45),
        status: {
            type: DataTypes.ENUM,
            values: ['Em andamento', 'Concluído', 'Não realizado']
        },
        created_at: DataTypes.DATE,
    }, {
        tableName: "doacoes",
        timestamps: false
    }
    );

    return Doacao;
}