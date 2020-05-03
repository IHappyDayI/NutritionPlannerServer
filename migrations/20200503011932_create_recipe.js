exports.up = function(knex, Promise) {
    return knex.schema.createTable('recipe', (table) => {
        table.increments('id')
        table.string('name')
        table.string('description')
        table.string('workflow')
    })
};
 
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recipe')
};
  