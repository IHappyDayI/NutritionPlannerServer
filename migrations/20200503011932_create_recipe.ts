import knex from 'knex';

export function up(knex: knex): Promise<any> {
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
 
export function down(knex: knex): Promise<any> {
    return knex.schema.dropTable('recipe')
}
  