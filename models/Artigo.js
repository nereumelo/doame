module.exports = (sequelize, DataTypes) => {
  const Artigo = sequelize.define(
    'Artigo', {
      parceiros_id: DataTypes.INTEGER,
      titulo: DataTypes.STRING,
      corpo: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }, {
      tableName: "artigos",
      timestamps: true
    }
  );

  return Artigo;
}