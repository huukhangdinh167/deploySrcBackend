'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Criteriapb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Criteriapb.belongsTo(models.Userstudent, { foreignKey: 'userstudentId' })

    }
  };
  Criteriapb.init({
    userstudentId: DataTypes.STRING,
    LOL1: DataTypes.STRING,
    LOL2: DataTypes.STRING,
    LOL3: DataTypes.STRING,
    LOL4: DataTypes.STRING,
    LOL5: DataTypes.STRING,
    LOL6: DataTypes.STRING,
    LOL7: DataTypes.STRING,
    LOL8: DataTypes.STRING,
    ghichu: DataTypes.STRING,

    LOL1PB2: DataTypes.STRING,
    LOL2PB2: DataTypes.STRING,
    LOL3PB2: DataTypes.STRING,
    LOL4PB2: DataTypes.STRING,
    LOL5PB2: DataTypes.STRING,
    LOL6PB2: DataTypes.STRING,
    LOL7PB2: DataTypes.STRING,
    LOL8PB2: DataTypes.STRING,
    ghichuPB2: DataTypes.STRING,
    
    LOL1PB3: DataTypes.STRING,
    LOL2PB3: DataTypes.STRING,
    LOL3PB3: DataTypes.STRING,
    LOL4PB3: DataTypes.STRING,
    LOL5PB3: DataTypes.STRING,
    LOL6PB3: DataTypes.STRING,
    LOL7PB3: DataTypes.STRING,
    LOL8PB3: DataTypes.STRING,
    ghichuPB3: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'Criteriapb',
  },
    {
      timestamps: false, // Tắt tạo các cột createdAt và updatedAt
    });


  return Criteriapb;
};