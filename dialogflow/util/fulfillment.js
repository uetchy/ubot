const express = require('express')
const bodyParser = require('body-parser')
const { WebhookClient } = require('dialogflow-fulfillment')

function createFulfillment(handler, { serviceKey } = {}) {
  const app = express()
  app.use(bodyParser.json())
  if (serviceKey) {
    app.use(serviceKeyAuth(serviceKey))
  }
  app.post('*', async (req, res, next) => {
    const agent = new WebhookClient({ request: req, response: res })
    const intentMap = await handler(agent)
    try {
      await agent.handleRequest(intentMap)
    } catch (err) {
      next(err)
    }
  })
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400
    res.status(statusCode).json({
      status: {
        code: statusCode,
        errorType: err.message,
      },
    })
  })
  return app
}

function serviceKeyAuth(serviceKey) {
  return (req, res, next) => {
    if (serviceKey !== req.headers['x-service-key']) {
      const err = new Error('specify valid service key')
      err.statusCode = 400
      return next(err)
    }
    next()
  }
}

exports.createFulfillment = createFulfillment
