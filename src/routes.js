const express = require('express') // Uma biblioteca que vai criar um servidor
const routes = express.Router() // uma parte do servidor que vai criar as rotas
const basePath = __dirname + '/views/' // atalho para facilitar os diretórios dos caminhos quando usa html.

// alterar os dados do perfil
const profile = {
  name: 'Huann',
  avatar: 'https://avatars.githubusercontent.com/u/67878933?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4
}

// req, res
routes.get('/', (req, res) => res.render(basePath + 'index'))
routes.get('/job', (req, res) => res.render(basePath + 'job'))
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'))
routes.get('/profile', (req, res) =>
  res.render(basePath + 'profile', { profile })
)

module.exports = routes
