module.exports = {
    client: 'pg',
    connection: { 
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '09022004',
        database : 'handicraft'
    },
    migrations: {
        tableName: 'migrations'
    }
};