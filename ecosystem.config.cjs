module.exports = {
  log_date_format: "YYYY-MM-DD HH:mm:ss",

  apps: [
    {
      name: "analytics-server",
      script: "pnpm",
      args: "start",
      cwd: "./server",

      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 2000,
      max_memory_restart: "500M",

      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
