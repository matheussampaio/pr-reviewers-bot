const getConfig = require('probot-config')

// const Reviewers = require('./reviewers')

module.exports = robot => {
  robot.on('*', async context => {
    context.log({ event: context.event, action: context.payload.action })

    const config = await getConfig(context, 'pr-reviewers-bot.yml')

    console.log(config)
    // const params = context.issue({ body: 'Hello World!' })

    // return context.github.issues.createComment(params)
  })
}
