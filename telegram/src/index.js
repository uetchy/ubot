const Telegraf = require('telegraf')
const fetch = require('node-fetch')

const bot = new Telegraf(process.env.BOT_TOKEN)

function parseCtx(ctx) {
  return {
    text: ctx.message.text,
    id: ctx.message.message_id,
    createdAt: new Date(ctx.message.date * 1000),
    isBot: ctx.from.is_bot,
    sender: ctx.from.username,
    firstName: ctx.from.first_name,
    senderID: ctx.from.id,
  }
}

function getURL(ctx) {
  if (!ctx.message.entities) return null
  const entity = ctx.message.entities.find((e) => e.type === 'url')
  if (!entity) return null
  return ctx.message.text.slice(entity.offset, entity.length)
}

bot.start((ctx) => {
  ctx.reply('Welcome!')
})

bot.help((ctx) => {
  ctx.reply('Send me a sticker')
})

bot.on('sticker', (ctx) => {
  ctx.reply('👍')
})

bot.hears(/hello/, (ctx) => {
  console.log(ctx)
  ctx.reply('Hey there')
})

bot.on('text', async (ctx) => {
  const url = getURL(ctx)
  console.log(url)
})

bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('delete_all', async (ctx) => {
  // const chat = await ctx.getChat()
  // console.log(chat)
})

bot.launch()
