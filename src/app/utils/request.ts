import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import qs from "qs";

export const makeRequest = axios.create({
  baseURL: "https://dfa3-203-192-244-136.ngrok-free.app",
})

export const makeRequestWithQS = async <T> (
  qsParams: Record<string, any>,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const queryString = qs.stringify(qsParams, { arrayFormat: 'repeat' });

  const urlWithQueryString = `${config.url}?${queryString}`;

  return makeRequest({
    ...config,
    url: urlWithQueryString,
  });
};
