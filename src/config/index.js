const env = {
  production: '.env',
  development: '.env.dev',
  test: '.env.test'
}

require('dotenv').config({
  path: env[process.env.NODE_ENV]
});
