const ticktick = require('ticktick-api/src/tick')

function getAgent() {
  return new ticktick({
    username: process.env.TICKTICK_EMAIL,
    password: process.env.TICKTICK_PASSWORD,
  })
}

async function addTask(title, options = {}) {
  const agent = await getAgent()
  if (options.dueDate) {
    options.dueDate = options.dueDate.toISOString().replace('Z', '+0000')
  }
  options.title = title
  console.log(options)
  await agent.addTask(options)
}
exports.addTask = addTask

async function getAllUncompletedTasks() {
  const agent = await getAgent()
  return await agent.getAllUncompletedTasks()
}
exports.getAllUncompletedTasks = getAllUncompletedTasks
