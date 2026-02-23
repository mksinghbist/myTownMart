import type { ApiResponse } from "./common/ApiResponse"

export interface ICreateUserData {
  message: string
  userId: string
}
export interface ICreateUserResponse extends ApiResponse<ICreateUserData> {
}
