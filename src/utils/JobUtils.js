module.exports = {
  remainingDays(job) {
    // cálculo do tempo restante
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDate = createdDate.setDate(dueDay)
    const timeDiffInMs = dueDate - Date.now()
    // transformar milissegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

    return dayDiff // restam x dias
  },
  calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}