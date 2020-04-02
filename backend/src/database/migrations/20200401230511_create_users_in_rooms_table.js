
exports.up = function(knex) {
  return knex.schema.createTable('users_in_rooms', function(table) {
      table.integer('user_id', 10).unsigned()
      table.string('room_slug').notNullable()
      table.string('role').notNullable()

      table.foreign('user_id').references('id').inTable('users')
      table.foreign('room_slug').references('slug').inTable('rooms')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_in_rooms')
};
