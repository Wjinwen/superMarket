import type { loginResult } from '@/api/model/userModel';
import { request } from '@/utils/request';

const Api = {
  login: '/login',
};

export function loginByAccount(data: Record<string, unknown>) {
  return request.post<loginResult>({
    url: Api.login,
    data,
  });
}