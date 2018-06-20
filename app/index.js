import Hapi from 'hapi'

const server = Hapi.server({
  port: process.env.PORT || '8000'
})

/**
 * @api {post} /login A dummy login action will accept any username and password
 * @apiName Login
 * @apiParam {String} username the username for authentication
 * @apiParam {String} password the password for authentication
 * @apiSuccess (Session) {String} authexample-id the logged in user id
 * @apiSuccess (Session) {String} authexample-name the logged in username
 * @apiSuccess {String} message success message when the user is logged in
 * @apiError {String} error error message
 */
server.route({
  method: 'POST',
  path: '/login',
  handler(request, h) {
    const  { payload } = request
    if (!payload || !payload.username || !payload.password) {
      return h
        .response({ error: 'username and passwords are required' })
        .code(400)
    }
    return h
      .response({ message: 'Logged in successfully' })
      .header('authexample-id', 1)
      .header('authexample-name', payload.username)
      .code(200)
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
