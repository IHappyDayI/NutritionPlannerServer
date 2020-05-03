import knex from 'knex';

const db = knex(require('../knexfile.js')['test']);

export async function clearDatabase(): Promise<any> {
    try {
        await db.raw('show tables').then(tables => {
            const tableNames = tables[0];
            const promises = [];
            for(const textRow of tableNames) {
                for(var tableNameKey in textRow) {
                    var tableName = textRow[tableNameKey];
                    promises.push(truncateTable(tableName));
                }
            }
            return Promise.all(promises)
        });
    } catch (error) {
        throw(error);
    } finally {
        db.destroy();
    }
};

async function truncateTable(tableName: String): Promise<any> {
    await db.raw('SET FOREIGN_KEY_CHECKS = 0;').then((): Promise<any> => {
        return db.raw('TRUNCATE TABLE ' + tableName);
    });
}
