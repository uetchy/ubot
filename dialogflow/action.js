const assert = require('assert')
const { Card, Suggestion } = require('dialogflow-fulfillment')
const { Carousel } = require('actions-on-google')

const { createFulfillment } = require('./util/fulfillment')
const { addTask, getAllUncompletedTasks } = require('./util/ticktick')

// https://dialogflow.com/docs/fulfillment/how-it-works

const SERVICE_KEY = process.env.SERVICE_KEY
assert(SERVICE_KEY, 'specify SERVICE_KEY')

async function createIntentMap(agent) {
  let intentMap = new Map()

  // Shopping list
  async function shoppingList(agent) {
    const shoppingListId = '5cd536cab53e5120aefbe61d'
    const item = agent.parameters.item
    await addTask(item, { projectId: shoppingListId })
    agent.add(item + ' added.')
  }
  intentMap.set('Shopping List', shoppingList)

  // Foo
  function foo(agent) {
    agent.add('bar')
  }
  intentMap.set('Foo', foo)

  // if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
  //   intentMap.set(null, googleAssistantOther)
  // } else {
  //   intentMap.set(null, other)
  // }

  return intentMap
}

module.exports = createFulfillment(createIntentMap, { serviceKey: SERVICE_KEY })
