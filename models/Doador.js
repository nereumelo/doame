module.exports = (sequelize, DataTypes) => {
    const Doador = sequelize.define(
      'Doador', {
        nome: DataTypes.STRING(150),
        email: DataTypes.STRING(100),
        senha: DataTypes.STRING(45),
        created_at: DataTypes.DATE(),
        updated_at: DataTypes.DATE,
      }, {
        tableName: "doadores",
        timestamps: false
      }
    );
  
    return Doador;
  }