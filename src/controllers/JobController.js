const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  async save(req, res) {
    const jobs = await Job.get()
    // req,body { name: 'HUANN', 'daily-hours': '2', 'total-hours': '2' }
    const lastId = jobs[jobs.length - 1]?.id || 0

    await Job.create({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now() // atribuindo data de hoje
    })
    return res.redirect('/')
  },
  async show(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()
    // pegando o id pela url
    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

    return res.render('job-edit', { job })
  },

  async update(req, res) {
    const jobs = await Job.get()
    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.sent('Job nor fund!')
    }

    const updatedJob = {
      ...job, // espalhou para poder pegar o 'id' e 'created_at'
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    const newJobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob
      }
      return job
    })
    Job.update(newJobs)

    res.redirect('/job/' + jobId)
  },
  delete(req, res) {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect('/')
  }
}
