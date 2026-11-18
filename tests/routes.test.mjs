import assert from 'node:assert/strict';
import { test } from 'node:test';

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';

test('docs live at the root and old links redirect', async () => {
  for (const path of ['/', '/api-playground', '/test']) {
    assert.equal((await fetch(base + path)).status, 200, path);
    const oldPath = path === '/' ? '/docs' : `/docs${path}`;
    const response = await fetch(base + oldPath, { redirect: 'manual' });
    assert.equal(response.status, 308, oldPath);
    assert.equal(new URL(response.headers.get('location'), base).pathname, path);
  }
});

test('Markdown negotiation works without intercepting API and LLM routes', async () => {
  for (const path of ['/', '/api-playground', '/api-playground.md']) {
    const response = await fetch(base + path, { headers: { Accept: 'text/markdown' } });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /text\/markdown/);
  }
  for (const path of ['/api/openapi', '/llms.txt', '/llms-full.txt']) {
    const response = await fetch(base + path, { headers: { Accept: 'text/markdown' } });
    assert.equal(response.status, 200, path);
  }
});

test('search results link to the root routes', async () => {
  const response = await fetch(base + '/api/search?query=playground');
  assert.equal(response.status, 200);
  const results = await response.json();
  assert.ok(results.length > 0);
  assert.ok(results.every((result) => !result.url.startsWith('/docs')));
  assert.ok(results.some((result) => result.url.startsWith('/api-playground')));
});
