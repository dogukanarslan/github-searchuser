import { parseLinkHeader } from '../src/constants';

const apiURL = 'https://api.github.com';

const request = async <T>(url: string, params?: string, method = 'GET') => {
  let options: { method: string; body?: string } = { method };

  if (method === 'GET') {
    if (params) {
      url += `?${params}`;
    }
  }

  if (method === 'POST') {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(apiURL + url, options);

  const linkHeader = response.headers.get('link');

  let parsedLinkHeader;

  if (linkHeader) {
    parsedLinkHeader = parseLinkHeader(linkHeader);
  }

  const data = (await response.json()) as T;

  return { data, links: parsedLinkHeader };
};

export const get = <T>(url: string, params?: string) => {
  return request<T>(url, params, 'GET');
};

export const post = <T>(url: string, params?: string) => {
  return request<T>(url, params, 'POST');
};
