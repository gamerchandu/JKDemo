const { test, expect } = require('@playwright/test');
const ApiClient = require('../utils/apiClient');
const fs = require('fs');
const path = require('path');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../testdata/user.json'), 'utf-8'));

test.describe('Authentication', () => {
  let api;

  test.beforeAll(() => {
    api = new ApiClient(process.env.BASE_URL);
  });

  users.forEach((user) => {
    if (user.type === 'valid') {
      test(`User can sign up: ${user.email}`, async () => {
        const { res, body } = await api.signup(user.email, user.password);
        expect([200, 201]).toContain(res.status());
        expect(body && body.message).toBeDefined();
      });

      test(`Duplicate signup fails: ${user.email}`, async () => {
        await api.signup(user.email, user.password);
        const { res, body } = await api.signup(user.email, user.password);
        expect([400, 409]).toContain(res.status());
        expect(body && body.detail).toBeDefined();
      });

      test(`User can login: ${user.email}`, async () => {
        await api.signup(user.email, user.password);
        const { res, body } = await api.login(user.email, user.password);
        expect(res.status()).toBe(200);
        expect(body && body.access_token).toBeTruthy();
        expect(body && body.token_type).toBe('bearer');
      });

      test(`Login fails with wrong password: ${user.email}`, async () => {
        await api.signup(user.email, user.password);
        const { res, body } = await api.login(user.email, 'wrongpass');
        expect([400, 401]).toContain(res.status());
        expect(body && body.detail).toBeDefined();
      });
    } else {
      test(`Signup fails for ${user.type}: ${user.email}`, async () => {
        const { res, body } = await api.signup(user.email, user.password);
        expect(res.status()).not.toBe(200);
        expect(body && body.detail).toBeDefined();
      });
    }
  });
});