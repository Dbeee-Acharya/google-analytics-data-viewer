module.exports = {
  apps: [
    {
      name: "hono-backend",
      script: "pnpm",
      args: "start",
      exec_mode: "cluster",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
