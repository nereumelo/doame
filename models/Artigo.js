module.exports = (sequelize, DataTypes) => {
    const Artigo = sequelize.define(
        'Artigo', {
        parceiros_id: DataTypes.INTEGER,
        titulo: DataTypes.STRING(200),
        corpo: DataTypes.TEXT,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        tableName: "artigos",
        timestamps: false
    }
    );
    
    Artigo.associate = (models) => {
        Artigo.belongsTo(models.Parceiro, { as: "parceiro", foreignKey: "parceiros_id" });
        Artigo.hasMany(models.Imagem, { as: "imagens", foreignKey: "artigos_id" });
    };

    return Artigo;
}