import { getApiBaseUrl, getUploadsBaseUrl } from './config';

describe('host configuration', () => {
  test('defaults to localhost in local development', () => {
    const local = { protocol: 'http:', hostname: 'localhost' };
    expect(getApiBaseUrl(local)).toBe('http://localhost/mobileria-api/api');
    expect(getUploadsBaseUrl(local)).toBe('http://localhost/mobileria-api/uploads');
  });

  test('supports custom domain override', () => {
    expect(getApiBaseUrl({ protocol: 'https:', hostname: 'example.com' }, 'https://example.com/mobileria-api/api')).toBe('https://example.com/mobileria-api/api');
  });
});
