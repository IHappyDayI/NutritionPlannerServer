export function up(knex, Promise) {
    return knex.schema.createTable('recipe', (table) => {
        table
            .uuid('id')
            .notNullable()
            .unique()
        table.string('name')
        table.string('description')
        table.string('ingredient')
        table.string('workflow')
    })
}
 
export function down(knex, Promise) {
    return knex.schema.dropTable('recipe')
}
  