const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index(req, res) {
    // criando variáveis para importar os dados que estão no model, via .get()
    const jobs = Job.get()
    const profile = Profile.get()

    const updatedJobs = jobs.map(job => {
      // ajustes no jobs
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour'])
      }
    })

    return res.render('index', { jobs: updatedJobs })
  }
}
