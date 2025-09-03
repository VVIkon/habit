/**
 * Создание таблицы магазинов
 */
exports.up = function(knex) {
  return knex.schema.createTable('shops', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('shops');
};