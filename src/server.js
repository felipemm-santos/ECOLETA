const express = require('express');
const server = express();

// pegar o banco de dados
const db = require('./database/db.js');

// Utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

//Configurar pasta publica
server.use(express.static('public'));

// Habilitar re.body na aplicação
server.use(express.urlencoded({ extended: true }));

//Configurar caminhos da aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-point', (req, res) => {
  // Query strings da url
  // console.log(req.query);

  return res.render('create-point.html');
});

server.post('/save-point', (req, res) => {
  // req.body: corpo do nosso formulário
  // console.log(req.body);

  // Inserir dados na tabela
  const query = `
      INSERT INT places (
          name,
          image,
          address,
          address2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?);
      `;

  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.render('create-point.html', { failed: true });
    }

    console.log('Cadastrado com sucesso');
    console.log(this);

    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {
  const search = req.query.search

  if (search == "") {
    // pesquisa vazia
    return res.render('search-results.html', {total: 0 });
  }



  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    //  console.log('Aqui estão seus registros');
    //  console.log(rows);

    const total = rows.length;

    //Mostra a página html com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total });
  });
});

// ligar o servidor

server.listen(3000);
