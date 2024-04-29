import { IData, IQueryString } from "../types/data";

const baseURL = 'http://localhost:3000'

async function get<T>(route: string, queryString = {} as IQueryString, options = {} as RequestInit): Promise<T> {
    const endpoint = `${baseURL}/${route}${stringfyQueryString(queryString)}`;
  
    return fetch(endpoint, options).then((response) => response.json());
  }
  
  async function post(route: string, data: IData, headers = {} as HeadersInit) {
    const endpoint = `${baseURL}/${route}`;
  
    const init: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    };
    return fetch(endpoint, init).then((response) => response.json());
  }
  
  async function put<T>(route: string, data: T, headers = {} as HeadersInit) {
    const endpoint = `${baseURL}/${route}`;
    const init: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json, text/plain',
        ...headers,
      },
    };
  
    return fetch(endpoint, init).then((response) => response.json());
  }
  
  async function patch(route: string, data: IData, headers = {} as HeadersInit) {
    const endpoint = `${baseURL}/${route}`;
    const init: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json, text/plain',
        ...headers,
      },
    };
  
    return fetch(endpoint, init).then((response) => response.json());
  }
  
  async function erase(route: string, queryString = {} as IQueryString, headers = {} as HeadersInit) {
    const endpoint = `${baseURL}/${route}${stringfyQueryString(queryString)}`;
    const init: RequestInit = {
      method: 'DELETE',
      headers,
    };
  
    return fetch(endpoint, init).then((response) => response.json());
  }
  
  function getFormData(data: IData): FormData {
    const formData = new FormData();
  
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof IData];
  
      if (value) {
        formData.append(key, value);
      }
    });
  
    return formData;
  }
  
  function stringfyQueryString(queryString: IQueryString): string {
    const response: string[] = [];
    Object.keys(queryString).forEach((key) => {
      response.push(`${key}=${queryString[key as keyof typeof queryString]}`);
    });
  
    return response.length > 0 ? '&' + response.join('&') : '';
  }
  
  export const getHeaderAuthenticated = (token: string) => {
    return { Accept: 'application/json', Authorization: `Bearer ${token}` };
  };
  
  export const api = {
    get,
    post,
    put,
    patch,
    delete: erase,
  };