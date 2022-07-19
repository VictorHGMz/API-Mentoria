const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'app_mentoria'
});

client.connect(err => {
    if (err) {
        console.error("Algo deu errado com a conexão com o banco de dados.", err.stack);
    } else {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }
});

module.exports = client