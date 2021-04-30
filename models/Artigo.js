module.exports = (sequelize, DataTypes) => {
    const Artigo = sequelize.define(
        'Artigo', {
        parceiros_id: DataTypes.INTEGER,
        titulo: DataTypes.STRING(200),
        corpo: DataTypes.TEXT,
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
        // updated_at: DataTypes.DATE
    }, {
        tableName: "artigos",
        timestamps: true
    }
    );

    Artigo.associate = (models) => {
        Artigo.belongsTo(models.Parceiro, { as: "parceiro", foreignKey: "parceiros_id" });
        Artigo.hasMany(models.Imagem, { as: "imagens", foreignKey: "artigos_id" });
    };

    return Artigo;
}