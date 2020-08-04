module.exports = {
  apps: [
    {
      name: "app",
      script: "./bin/www",
      instances: 4,
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
