const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all(`SELECT * FROM jobs`)

    await db.close()

    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      'daily-hours': job.daily_hours,
      'total-hours': job.total_hours,
      created_at: job.created_at
    }))
  },

  update(newJobs) {
    data = newJobs
  },

  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  },

  async create(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob.daily_hours},
      ${newJob.total_hours},
      ${newJob.created_at}
    )`)

    await db.close()
  }
}
