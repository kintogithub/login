import Hapi from 'hapi'

const server = Hapi.server({
  port: process.env.PORT || '8000'
})

/**
 * @api {POST} /login auth user
 * @apiName Login
 * @apiParam (Body) {String} username the username or emai for the user
 * @apiParam (Body) {String} password the password for the password
 * @apiSuccess (Session) {String} authexample-id the logged in user id
 * @apiSuccess (Session) {String} authexample-name the logged in user real name
 * @apiSuccess (Success_200) {String} message success message when the user is logged in
 * @apiError (Error_400) {String} error error message
 */
server.route({
  method: 'POST',
  path: '/login',
  handler(request, h) {
    let payload = null
    try {
      payload = JSON.parse(request.payload)
    } catch (e) {
      payload = {}
    }
    const { username, password } = payload
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
