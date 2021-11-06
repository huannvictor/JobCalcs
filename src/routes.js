const express = require('express') // Uma biblioteca que vai criar um servidor
const routes = express.Router() // uma parte do servidor que vai criar as rotas
const basePath = __dirname + '/views/' // atalho para facilitar os diretórios dos caminhos quando usa html.

// alterar os dados do perfil
const profile = {
  name: 'Huann',
  avatar: 'https://github.com/huannvictor.png',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4
}

const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 60,
    created_at: Date.now()
  },
  {
    id: 2,
    name: 'One Two Project',
    'daily-hours': 3,
    'total-hours': 47,
    created_at: Date.now()
  }
]

// req, res
routes.get('/', (req, res) => {
  const updatedJobs = Jobs.map(job => {
    // ajustes no jobs
    // cálculo do tempo restante
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)

    return job
  })

  return res.render(basePath + 'index', { jobs })
})
routes.get('/job', (req, res) => res.render(basePath + 'job'))
routes.post('/job', (req, res) => {
  // req,body { name: 'HUANN', 'daily-hours': '2', 'total-hours': '2' }
  const lastId = jobs[jobs.length - 1]?.id || 1

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now() // atribuindo data de hoje
  })
  return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'))
routes.get('/profile', (req, res) =>
  res.render(basePath + 'profile', { profile })
)

module.exports = routes
