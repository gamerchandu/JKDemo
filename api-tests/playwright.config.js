require('dotenv').config();

module.exports = {
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL,
  },
  testDir: './tests',
  timeout: 30000,
};