/**
 * Создание таблицы автомобилей
 */
exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table) {
    table.increments('id').primary();
    table.string('brand').notNullable();
    table.string('model').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('shop_id').unsigned().notNullable();
    table.timestamps(true, true);
    
    table.foreign('shop_id').references('id').inTable('shops');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};