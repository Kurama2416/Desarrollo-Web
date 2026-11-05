
module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'sizes',
        key: 'id'
      }
    }
  }, {
    tableName: 'product_sizes',
    timestamps: false
  });

  return ProductSize;
};
