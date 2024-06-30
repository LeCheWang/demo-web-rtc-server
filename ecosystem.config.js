module.exports = {
  apps: [
    {
      name: 'WEB_RTC',
      script: './app.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5010,
      },
    },
  ],
};
