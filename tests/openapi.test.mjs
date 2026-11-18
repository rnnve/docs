import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GET } from '../app/api/openapi/route.ts';

test('serves the live schema with a timeout and cache', async (t) => {
  const schema = 'openapi: 3.0.3\ninfo:\n  title: Rynni API\n';
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.rynni.cc/openapi.yaml');
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(options.next.revalidate, 60);
    return new Response(schema);
  });
  const response = await GET();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/yaml/);
  assert.equal(await response.text(), schema);
});

test('returns 502 for upstream errors', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('Not found', { status: 404 }));
  const response = await GET();
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, 'API server returned 404');
});

test('returns 502 for network failures and timeouts', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('timeout'); });
  const response = await GET();
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /Please try again/);
});
