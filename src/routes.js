const express = require('express') // Uma biblioteca que vai criar um servidor
const routes = express.Router() // uma parte do servidor que vai criar as rotas
const basePath = __dirname + '/views/' // atalho para facilitar os diretórios dos caminhos quando usa html.

// alterar os dados do perfil
const Profile = {
  data: {
    name: 'Huann',
    avatar: 'https://github.com/huannvictor.png',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },
  controllers: {
    index(req, res) {
      return res.render(basePath + 'profile', { profile: Profile.data })
    },
    update(req, res) {
      // req.body para pegar os dados
      const data = req.body

      // definir quantas semanas tem num ano
      const weeksPerYear = 52

      // remover as semanas de férias do ano, para pegar quantas semanas tem um mês
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

      // quantas horas por semana estou trabalhando
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']

      // total de horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      // qual será o valor da minha hora?
      const valueHour = data['monthly-budget'] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour
      }

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'One Two Project',
      'daily-hours': 3,
      'total-hours': 47,
      created_at: Date.now()
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        // ajustes no jobs
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      })

      return res.render(basePath + 'index', { jobs: updatedJobs })
    },
    create(req, res) {
      return res.render(basePath + 'job')
    },
    save(req, res) {
      // req,body { name: 'HUANN', 'daily-hours': '2', 'total-hours': '2' }
      const lastId = Job.data[Job.data.length - 1]?.id || 0

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now() // atribuindo data de hoje
      })
      return res.redirect('/')
    },
    show(req, res) {
      // pegando o id pela url
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found!')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

      return res.render(basePath + 'job-edit', { job })
    },
    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.sent('Job nor fund!')
      }

      const updatedJob = {
        ...job, // espalhou para poder pegar o 'id' e 'created_at'
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob
        }
        return job
      })

      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      // cálculo do tempo restante
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDate = createdDate.setDate(dueDay)
      const timeDiffInMs = dueDate - Date.now()
      // transformar milissegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)

      return dayDiff // restam x dias
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

// req, res
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes
