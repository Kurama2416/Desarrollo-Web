
'use strict';

// Datos iniciales exportados de Manglü.
// Ejecutar únicamente sobre una base de datos nueva.

const datos = {
  "categories": [
    {
      "id": 1,
      "name": "Granizados",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 2,
      "name": "Frutas",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 3,
      "name": "Toppings",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    }
  ],
  "sizes": [
    {
      "id": 1,
      "name": "Pequeño",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 2,
      "name": "Mediano",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 3,
      "name": "Grande",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 4,
      "name": "Único",
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "Manglü",
      "description": "Nuestro granizado estrella con mango fresco, hielo finamente raspado y los mejores toppings.",
      "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
      "price": "8000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 2,
      "name": "Granizado de Lulo",
      "description": "El sabor ácido y tropical del lulo colombiano convertido en hielo refrescante.",
      "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      "price": "7000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 3,
      "name": "Granizado de Maracuyá",
      "description": "Intenso y aromático. La maracuyá en su mejor versión helada, dulce y ácida.",
      "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
      "price": "8000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 4,
      "name": "Granizado de Mango",
      "description": "Mango maduro colombiano en cada bocado. Dulce, jugoso y refrescante.",
      "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80",
      "price": "8000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 5,
      "name": "Granizado de Cereza",
      "description": "El dulzor de la cereza en hielo. Un clásico reconfortante con toque frutal.",
      "image": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
      "price": "8000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 6,
      "name": "Granizado de Tamarindo",
      "description": "Agridulce y adictivo. El tamarindo tropical que te sorprenderá en cada sorbo.",
      "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
      "price": "7000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 7,
      "name": "Granizado de Frutos Rojos",
      "description": "La mezcla perfecta de mora, fresa y frambuesa en un granizado vibrante.",
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
      "price": "8000.00",
      "category_id": 1,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 8,
      "name": "Trozos de Mango",
      "description": "Mango fresco cortado en trozos perfectos. Simple, natural y delicioso.",
      "image": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80",
      "price": "5000.00",
      "category_id": 2,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    },
    {
      "id": 9,
      "name": "Toppings Extra",
      "description": "Elige tu topping favorito: chamoy, chile, sal, limón y más combinaciones.",
      "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
      "price": "2000.00",
      "category_id": 3,
      "createdAt": "2026-11-05T09:48:50.000Z",
      "updatedAt": "2026-11-05T09:48:50.000Z"
    }
  ],
  "product_sizes": [
    {
      "product_id": 1,
      "size_id": 1
    },
    {
      "product_id": 2,
      "size_id": 1
    },
    {
      "product_id": 3,
      "size_id": 1
    },
    {
      "product_id": 4,
      "size_id": 1
    },
    {
      "product_id": 5,
      "size_id": 1
    },
    {
      "product_id": 6,
      "size_id": 1
    },
    {
      "product_id": 7,
      "size_id": 1
    },
    {
      "product_id": 8,
      "size_id": 1
    },
    {
      "product_id": 1,
      "size_id": 2
    },
    {
      "product_id": 2,
      "size_id": 2
    },
    {
      "product_id": 3,
      "size_id": 2
    },
    {
      "product_id": 4,
      "size_id": 2
    },
    {
      "product_id": 5,
      "size_id": 2
    },
    {
      "product_id": 6,
      "size_id": 2
    },
    {
      "product_id": 7,
      "size_id": 2
    },
    {
      "product_id": 1,
      "size_id": 3
    },
    {
      "product_id": 2,
      "size_id": 3
    },
    {
      "product_id": 3,
      "size_id": 3
    },
    {
      "product_id": 4,
      "size_id": 3
    },
    {
      "product_id": 5,
      "size_id": 3
    },
    {
      "product_id": 6,
      "size_id": 3
    },
    {
      "product_id": 7,
      "size_id": 3
    },
    {
      "product_id": 8,
      "size_id": 3
    },
    {
      "product_id": 9,
      "size_id": 4
    }
  ]
};
function prepararFechas(registros) {
  return registros.map(registro => {
    const copia = { ...registro };

    for (const campo of ['createdAt', 'updatedAt']) {
      if (copia[campo]) {
        copia[campo] = new Date(copia[campo]);
      }
    }

    return copia;
  });
}
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
  prepararFechas(datos[tabla]),
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
