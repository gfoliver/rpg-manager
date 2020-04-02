
exports.up = function(knex) {
    return knex.schema.createTable('rooms', function(table) {
        table.string('slug').primary()
        table.string('name').notNullable()
        table.string('description')
        table.string('cover_image')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('rooms')
};
