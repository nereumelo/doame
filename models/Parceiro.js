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
      }
    );
  
    return Parceiro;
  }