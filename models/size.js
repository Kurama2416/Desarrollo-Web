
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'sizes',
    timestamps: true
  });

  Size.associate = (models) => {
    Size.belongsToMany(models.Product, {
      through: models.ProductSize,
      foreignKey: 'size_id',
      otherKey: 'product_id',
      as: 'products'
    });
  };

  return Size;
};
