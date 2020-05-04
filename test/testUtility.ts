import knex from 'knex';

export async function clearDatabase(db: knex<any, unknown[]>): Promise<any> {
    await db.raw('show tables').then((tables: any[]) => {
        const tableNames = tables[0];
        const promises = [];
        for(const textRow of tableNames) {
            for(var tableNameKey in textRow) {
                var tableName = textRow[tableNameKey];
                promises.push(truncateTable(db, tableName));
            }
        }
        return Promise.all(promises)
    });
};

async function truncateTable(db: knex<any, unknown[]>, tableName: String): Promise<any> {
    await db.raw('SET FOREIGN_KEY_CHECKS = 0;').then((): Promise<any> => {
        return db.raw('TRUNCATE TABLE ' + tableName);
    });
}
