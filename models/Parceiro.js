module.exports = (sequelize, DataTypes) => {
    
    const Parceiro = sequelize.define(
      'Parceiro', {
        enderecos_id: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        cnpj: DataTypes.STRING(14),
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        created_at: DataTypes.DATE,
     
      }, {
        tableName: "parceiros",
        timestamps: false
      }
    );
  
    return Parceiro;
  }