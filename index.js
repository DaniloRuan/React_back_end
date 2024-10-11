const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Configuração do CORS para permitir o frontend acessar o backend
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Conexão ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'test',
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

// Rota para consultar os dados da tabela 'cadastro'
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM cadastro', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Envia os dados como resposta
    });
});

// Rota para inserir dados na tabela 'cadastro'
app.post('/users', (req, res) => {
    const { nome } = req.body;


    // Query SQL para inserir os dados na tabela 'cadastro'
    const query = 'INSERT INTO cadastro (nome) VALUES (?)';

    // Executar a query com os valores do body
    db.query(query, [nome], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuário inserido com sucesso!', userId: results.insertId });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
