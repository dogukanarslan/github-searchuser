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

  return (await (await fetch(apiURL + url, options)).json()) as T;
};

export const get = <T>(url: string, params?: string) => {
  return request<T>(url, params, 'GET');
};

export const post = <T>(url: string, params?: string) => {
  return request<T>(url, params, 'POST');
};
