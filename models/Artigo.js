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

  return Artigo;
}