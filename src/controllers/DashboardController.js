const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async index(req, res) {
    // criando variáveis para importar os dados que estão no model, via .get()
    const jobs = Job.get()
    const profile = await Profile.get()

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada job em PROGRESS
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      // ajustes no jobs
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      // a const status é passada como referência, dento dos [] -> se é done || progress
      // informa dendo dos [] a referência (done || progress)
      // o cógigo fica como se fosse status.done += 1 || status.progress += 1
      // obs.: quando coloca dentro de [] uma referência, é passado como se fosse uma propriedade do objeto (object.value)
      statusCount[status] += 1;

      // total de horas por dia de cada job em PROGRESS
      jobTotalHours =
        status == 'progress'
          ? jobTotalHours + Number(job['daily-hours'])
          : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour'])
      }
    })

    // quantidade de hrs que quero trabalhar (PROFILE)
    // MENOS
    // a quantidade de hrs de cada job in PROGRESS
    const freeHours = profile['hours-per-day'] - jobTotalHours

    return res.render('index', {
      jobs: updatedJobs,
      profile,
      statusCount,
      freeHours
    })
  }
}
