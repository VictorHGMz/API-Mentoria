const express = require('express')
const app = express()
const port = 3000
const client = require('./db/database')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log('Conexão com a porta: OK!');
});

//!--------- Operações -------------------!//

//Cadastro de Mercado ->

app.post('/mercados', (req, res) => {

    const body = req.body;

    client.query({
        text: 'INSERT INTO mercados(nome, cnpj, rede, endereço, telefone, cidade, uf) VALUES($1, $2, $3, $4, $5, $6, $7)', 
        values: [body.nome, body.cnpj, body.rede, body.endereço, body.telefone, body.cidade, body.uf]}, (err, resdb) => {
        if (err) {
            console.error("Query com ERRO", err.stack);
            res.status(400).send({"Erro": err.stack})
        } else {
            console.log("Novo Registro de Mercado!");
            res.status(201).send({"Mensagem": "Mercado cadastrado com sucesso!"})
        }
    });
});

// Visualizar os Mercados cadastrados:

app.get('/mercados', (req, res) => {

    client.query("SELECT * from mercados", (err, resdb) => {
        if (err) {
            res.status(400).send({"Mensagem": "Erro:(" + err + ")"})
        } else {
            res.status(200).send(resdb.rows)
        }
    });
});

// Cadastrando Produtos ->

app.post('/produtos', (req, res) => {

    const body = req.body;

    client.query({
        text: 'INSERT INTO produtos(nome, descrição, preço, cod_mercado) VALUES($1, $2, $3, $4)',
        values: [body.nome, body.descrição, body.preço, body.cod_mercado]}, (erro, responstaDB) => {
            if (erro) {
                console.error("Algo deu errado ao tentar cadastrar um novo produto.")
                res.status(400).send({"Mensagem": erro.stack});
            } else {
                console.log("Novo Registro de Produto")
                res.status(201).send({"Mensagem": "Produto cadastrado com sucesso!"});
            }
        });
    
});

// Consultar Produtos cadastrados ->

app.get('/produtos', (req, res) => {

    client.query("SELECT * from produtos", (erro, resdb) => {
        if (erro) {
            res.status(400).send({"Mensagem": "Erro:(" + erro + ")"})
        } else {
            res.status(200).send(resdb.rows)
        }
    });
});

// Deletar mercados ->

app.delete('/mercados', (req, res) => {

    const body = req.body;

    client.query({
        text: 'DELETE from mercados WHERE cod_mercado = $1', 
        values: [body.cod_mercado]}, (err, resdb) => {
        if (err) {
            console.error("Query com ERRO", err.stack);
            res.status(400).send({"Erro": err.stack})
        } else {
            console.log("Registro deletado!");
            res.status(201).send({"Mensagem": "Mercado excluído com sucesso!"})
        }
    });
});

// Deletar produtos ->

app.delete('/produtos', (req, res) => {

    const body = req.body;

    client.query({
        text: 'DELETE from produtos WHERE cod_produto = $1', 
        values: [body.cod_produto]}, (err, resdb) => {
        if (err) {
            console.error("Query com ERRO", err.stack);
            res.status(400).send({"Erro": err.stack})
        } else {
            console.log("Registro deletado!");
            res.status(201).send({"Mensagem": "Produto excluído com sucesso!"})
        }
    });
});