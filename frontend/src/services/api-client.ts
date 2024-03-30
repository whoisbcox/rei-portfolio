import axios, { AxiosRequestConfig } from 'axios'

export interface FetchResponse<T> {
  count: number;
  results: T;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

class APIClient<T> {
  endpoint: string;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint, config)
      .then(res => res.data);
  }

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then(res => res.data);
  }

  deleteAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .delete<T>(this.endpoint, config);
  }

  delete = (id: number | string, config: AxiosRequestConfig) => {
    return axiosInstance
      .delete(this.endpoint + '/' + id, config);
  }
}

export default APIClient;