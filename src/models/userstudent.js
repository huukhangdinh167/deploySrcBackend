'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userstudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Userstudent.belongsTo(models.Group, { foreignKey: 'groupId' })
      Userstudent.belongsTo(models.Project, { foreignKey: 'projectId' })
      Userstudent.hasOne(models.Result, { foreignKey: 'userstudentId' })
      Userstudent.hasOne(models.Criteria, { foreignKey: 'userstudentId' })
      Userstudent.hasOne(models.Criteriapb, { foreignKey: 'userstudentId' })
      Userstudent.hasOne(models.Criteriahoidong, { foreignKey: 'userstudentId' })
    }
  };
  Userstudent.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    maSo: DataTypes.STRING,
    class: DataTypes.STRING,
    password: DataTypes.STRING,
    groupStudent: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    pb1: DataTypes.STRING,
    pb2: DataTypes.STRING,
    pb3: DataTypes.STRING,
    hoidong: DataTypes.STRING,
    CTHD: DataTypes.STRING,
    TK: DataTypes.STRING,
    UV: DataTypes.STRING,
    Poster1: DataTypes.STRING,
    Poster2: DataTypes.STRING,
    


  }, {
    sequelize,
    modelName: 'Userstudent',
  });
  return Userstudent;
};