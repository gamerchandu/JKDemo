const { request } = require('@playwright/test');

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  async signup(email, password) {
    const context = await request.newContext();
    const res = await context.post(`${this.baseURL}/signup`, {
      data: { email, password }
    });
    let body = null;
    try { body = await res.json(); } catch {}
    await context.dispose();
    return { res, body };
  }

  async login(email, password) {
    const context = await request.newContext();
    const res = await context.post(`${this.baseURL}/login`, {
      data: { email, password }
    });
    let body = null;
    try { body = await res.json(); } catch {}
    if (body && body.access_token) this.token = body.access_token;
    await context.dispose();
    return { res, body };
  }

  async requestWithAuth(method, endpoint, data = null) {
    const context = await request.newContext({
      extraHTTPHeaders: { Authorization: `Bearer ${this.token}` }
    });
    const res = await context.fetch(`${this.baseURL}${endpoint}`, {
      method,
      data: data ? data : undefined,
    });
    let body = null;
    try { body = await res.json(); } catch {}
    await context.dispose();
    return { res, body };
  }
}

module.exports = ApiClient;