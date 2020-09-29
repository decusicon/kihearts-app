module.exports = {
  name: getEnv("APP_NAME", "localhost"),

  env: getEnv("APP_ENV", "production"),

  debug: getEnv("APP_DEBUG", false),

  key: getEnv("APP_KEY", "kXWzrAF1HIqUXHmJ8nXKp8OPKz2Y+sleV3mvcF+iufM="),

  host: getEnv("APP_HOST", "localhost"),

  port: getEnv("APP_PORT", 8080),

  url: getEnv("APP_URL", "http://localhost:8080"),

  timezone: getEnv("APP_TIMEZONE", "Nigeria/Lagos"),

  providers: [
    require("@app/providers/DatabaseServiceProvider"),
    require("@app/providers/SessionServiceProvider"),
    require("@app/providers/AuthServiceProvider"),
    require("@app/providers/ValidatorServiceProvider"),
  ],

  alias: {
    _: require("lodash"),
    moment: require("moment"),
    Str: require("underscore.string"),
    axios : require('axios'),
  },
}
