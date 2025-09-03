/**
 * Первоначальное заполнение данных
 */
exports.seed = async function (knex) {
  // Очистка таблиц
  await knex('cars').del();
  await knex('shops').del();

  // Добавление магазинов
  const shops = await knex('shops').insert([
      { name: 'АвтоМир', phone: '+7 495 345 76 44' }, // 0
      { name: 'Диавто', phone: '+7 903 567 99 88' },  // 1
      { name: 'АвтоМир', phone: '+7 843 600 39 49' }, // 2
      { name: 'Дром', phone: '+7 905 890 66 55' },    // 3
      { name: 'Авто.ру', phone: '+7 912 456 78 99' }, // 4
      { name: 'АвтоГермес', phone: '+7 843 320 44 25' },  // 5
      { name: 'Авто.ру', phone: '+7 912 456 55 29' },  // 6
    ])
    .returning('id');

  // Добавление автомобилей
  await knex('cars').insert([
    { brand: 'Toyota', model: 'RAV4', price: 2559000, shop_id: shops[0].id },
    { brand: 'Toyota', model: 'Camry', price: 2358000, shop_id: shops[1].id },
    { brand: 'Lada', model: 'Granta', price: 1980000, shop_id: shops[2].id },
    { brand: 'Chery', model: 'Tiggo 7 Pro', price: 5720000, shop_id: shops[3].id },
    { brand: 'Toyota', model: 'Camry', price: 2120000, shop_id: shops[3].id },
    { brand: 'Kia', model: 'Sportage', price: 2633000, shop_id: shops[4].id },
    { brand: 'Lada', model: 'Granta', price: 2230000, shop_id: shops[5].id },
    { brand: 'Mazda', model: 'CX-5', price: 3180000, shop_id: shops[6].id },
  ]);
};
