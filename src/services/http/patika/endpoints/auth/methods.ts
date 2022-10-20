import instance from "../../instance";
import service from "../../instance";
import {
  LoginRequestPayload,
  RegisterRequestPayload,
  RegisterResponseType,
} from "./types";

export const login = (payload: LoginRequestPayload) =>
  service.post("auth/login", payload).then((response) => {
    instance.interceptors.request.use((config) => {
      const _config = { ...config };
      _config.headers = {
        ...config.headers,
        authorization: "Bearer " + response.data.token,
      };
      return _config;
    });
    return response;
  });

export const register = (
  payload: RegisterRequestPayload
): Promise<RegisterResponseType> => service.post("auth/register", payload);
