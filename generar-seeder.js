
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize, QueryTypes } = require('sequelize');

async function generarSeeder() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      dialect: 'mysql',
      logging: false
    }
  );

  try {
    await sequelize.authenticate();

    const tablas = [
      'categories',
      'sizes',
      'products',
      'product_sizes'
    ];

    const datos = {};

    for (const tabla of tablas) {
      datos[tabla] = await sequelize.query(
        `SELECT * FROM \`${tabla}\``,
        { type: QueryTypes.SELECT }
      );

      console.log(
        `${tabla}: ${datos[tabla].length} registros encontrados`
      );
    }

    const contenido = `
'use strict';

// Datos iniciales exportados de Manglü.
// Ejecutar únicamente sobre una base de datos nueva.

const datos = ${JSON.stringify(datos, null, 2)};

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      for (const tabla of [
        'categories',
        'sizes',
        'products',
        'product_sizes'
      ]) {
        if (datos[tabla].length > 0) {
          await queryInterface.bulkInsert(
            tabla,
            datos[tabla],
            { transaction }
          );
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      for (const tabla of [
        'product_sizes',
        'products',
        'sizes',
        'categories'
      ]) {
        if (datos[tabla].length > 0) {
          const ids = datos[tabla];

          if (tabla === 'product_sizes') {
            for (const item of ids) {
              await queryInterface.bulkDelete(
                tabla,
                {
                  product_id: item.product_id,
                  size_id: item.size_id
                },
                { transaction }
              );
            }
          } else {
            await queryInterface.bulkDelete(
              tabla,
              { id: ids.map(item => item.id) },
              { transaction }
            );
          }
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
`;

    const destino = path.join(
      __dirname,
      'seeders',
      '20261105000400-demo-data.js'
    );

    fs.mkdirSync(path.dirname(destino), {
      recursive: true
    });

    fs.writeFileSync(destino, contenido, 'utf8');

    console.log('\nSeeder generado correctamente:');
    console.log(destino);

  } catch (error) {
    console.error('Error al generar el seeder:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

generarSeeder();
