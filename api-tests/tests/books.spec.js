const { test, expect } = require('@playwright/test');
const ApiClient = require('../utils/apiClient');
const fs = require('fs');
const path = require('path');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../testdata/user.json'), 'utf-8'));
const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../testdata/books.json'), 'utf-8'));
const validUser = users.find(u => u.type === 'valid');

let api;
let createdBookIds = [];

test.describe('Books CRUD', () => {
  test.beforeAll(async () => {
    api = new ApiClient(process.env.BASE_URL);
    await api.signup(validUser.email, validUser.password);
    await api.login(validUser.email, validUser.password);
  });

  books.forEach((book) => {
    if (book.type === 'valid') {
      test(`Create book: ${book.name}`, async () => {
        const { res, body } = await api.requestWithAuth('POST', '/books/', book);
        expect([200, 201]).toContain(res.status());
        expect(body && body.name).toBe(book.name);
        if (body && body.id) createdBookIds.push(body.id);
      });
    } else {
      test(`Create book fails (${book.type}): ${book.name || JSON.stringify(book)}`, async () => {
        const { res } = await api.requestWithAuth('POST', '/books/', book);
        expect([400, 422]).toContain(res.status());
      });
    }
  });

  test('Get all books', async () => {
    const { res, body } = await api.requestWithAuth('GET', '/books/');
    expect(res.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('Get book by id', async () => {
    if (createdBookIds.length === 0) test.skip();
    const bookId = createdBookIds[0];
    const { res, body } = await api.requestWithAuth('GET', `/books/${bookId}`);
    expect(res.status()).toBe(200);
    expect(body && body.id).toBe(bookId);
  });

  test('Get book by invalid id returns 422', async () => {
    const { res } = await api.requestWithAuth('GET', '/books/invalid-id');
    expect(res.status()).toBe(422);
  });

  test('Update book', async () => {
    if (createdBookIds.length === 0) test.skip();
    const bookId = createdBookIds[0];
    const update = { name: 'Updated Book' };
    const { res, body } = await api.requestWithAuth('PUT', `/books/${bookId}`, update);
    expect(res.status()).toBe(200);
    expect(body && body.name).toBe('Updated Book');
  });

  test('Update non-existent book returns 404', async () => {
    const update = { name: 'No Book' };
    const { res } = await api.requestWithAuth('PUT', `/books/999999`, update);
    expect(res.status()).toBe(404);
  });

  test('Delete book', async () => {
    if (createdBookIds.length === 0) test.skip();
    const bookId = createdBookIds[0];
    const { res, body } = await api.requestWithAuth('DELETE', `/books/${bookId}`);
    expect(res.status()).toBe(200);
    expect(body && body.message).toBeDefined();
  });

  test('Delete non-existent book returns 404', async () => {
    const { res } = await api.requestWithAuth('DELETE', `/books/999999`);
    expect(res.status()).toBe(404);
  });

  test('Get deleted book returns 404', async () => {
    if (createdBookIds.length === 0) test.skip();
    const bookId = createdBookIds[0];
    const { res } = await api.requestWithAuth('GET', `/books/${bookId}`);
    expect(res.status()).toBe(404);
  });

  test('Unauthorized access fails', async () => {
    const context = await require('@playwright/test').request.newContext();
    const res = await context.get(`${process.env.BASE_URL}/books/`);
    expect(res.status()).toBe(403);
    await context.dispose();
  });
});