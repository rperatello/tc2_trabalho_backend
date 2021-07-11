require('dotenv/config');
const path = require('path')
var express = require('express');
var app = express();
const consign = require('consign')
var port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/frontend-agenda/dist/frontend-agenda`))
app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/frontend-agenda/dist/static/index.html`))
  })

app.get('/contatos', (req, res) => {
    res.sendFile(path.join(`${__dirname}/frontend-agenda/dist/static/contatos/index.html`))
  })

app.get('/compromissos', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend-agenda/dist/static/compromissos/index.html`))
})

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/auth.js')
    .then('./rotas/rotas.js')
    .into(app)

/*LISTEN DO EXPRESS*/

app.listen(port, function () {
    console.log("Rodando na porta " + port);
});
