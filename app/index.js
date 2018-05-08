import Hapi from 'hapi'

const server = Hapi.server({
  port: process.env.PORT || '8000'
})

/**
 * @api {POST} /login auth user
 * @apiName Login
 * @apiParam (Body) {String} username the username or emai for the user
 * @apiParam (Body) {String} password the password for the password
 * @apiSuccess (Session) {String} authexample-id
 * @apiSuccess (Session) {String} authexample-name
 * @apiSuccess (Success_200) {String} message
 * @apiError (Error_400) {String} error error message
 */
server.route({
  method: 'POST',
  path: '/login',
  handler(request, h) {
    const { username, password } = request.payload
    if (username === 'kinto' && password === 'abc123') {
      return h
        .response({ message: 'Logged in successfully' })
        .header('authexample-id', 1)
        .header('authexample-name', 'Nadeem')
        .code(200)
    }
    return h.response({ error: 'username or passwords are invalid' }).code(400)
  }
})

async function start() {
  try {
    await server.start()
  } catch (e) {
    console.log('app crashed', e)
    process.exit(1)
  }
  console.log('Server running at:', server.info.uri)
}

start()
