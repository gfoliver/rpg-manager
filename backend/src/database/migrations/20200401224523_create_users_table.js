
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id', 10).primary()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('first_name').notNullable()
        table.string('username')
        table.integer('level').notNullable()
        table.string('avatar')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
