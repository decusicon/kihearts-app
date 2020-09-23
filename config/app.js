module.exports = {
  name: getEnv("APP_NAME", "localhost"),

  env: getEnv("APP_ENV", "production"),

  debug: getEnv("APP_DEBUG", false),

  key: getEnv("APP_KEY", "kXWzrAF1HIqUXHmJ8nXKp8OPKz2Y+sleV3mvcF+iufM="),

  host: getEnv("APP_HOST", "localhost"),

  port: getEnv("APP_PORT", 8080),

  url: getEnv("APP_URL", "http://tosettledown.herokuapp.com"),

  timezone: getEnv("APP_TIMEZONE", "Nigeria/Lagos"),

  providers: [
    require("./app/provider/DatabaseServiceProvider"),
    require("./app/provider/AuthServiceProvider"),
  ],

  alias: {},
};
