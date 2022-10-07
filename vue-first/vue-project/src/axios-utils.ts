import axios from 'axios';
import { getToken } from "@/utils/auth";

const AxiosClient = axios.create({
  baseURL: 'http://192.168.1.206:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosClient.interceptors.request.use((req) => {
  const token = getToken();
  if (token && req.headers) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }
  return req;
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error: any) => {
    if (error?.response?.data?.data?.message) {
      throw error?.response?.data?.data?.message;
    } else {
      throw error.message;
    }
  },
);

const get = <ReqType, ResType>(
  url: string,
  params?: ReqType,
  customHeaders?: any,
): Promise<ResType> => {
  return AxiosClient.get(url, { params, headers: customHeaders });
};

function post<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: any,
): Promise<ResType> {
  return AxiosClient.post(url, data, { headers: customHeaders });
}

function postS3<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: any,
): Promise<ResType> {
  return AxiosClient.post(url, data, { headers: customHeaders });
}

async function put<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: any,
): Promise<ResType> {
  return AxiosClient.put(url, data, { headers: customHeaders });
}

async function _delete<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType> {
  return AxiosClient.delete(url, { params });
}

const AxiosUtils = { get, postS3, post, put, _delete };
export default AxiosUtils;
