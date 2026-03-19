import type { UserRole } from "./common/common";

export interface BaseApiResponse {
  code: string;
  success: boolean;
  message: string;
}
export interface ApiResponse<T> extends BaseApiResponse {
  data: T;
}

export interface ApiListResponse<T> extends BaseApiResponse {
  data: T[];
}
export interface ICreateUserData {
  message: string
  userId: string
}
export interface ICreateUserResponse extends ApiResponse<ICreateUserData> {
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ILoginResData {
  token: string;
  refreshToken: string;
  user: IUser;
}
export interface ILoginResponse extends ApiResponse<ILoginResData> {
}
