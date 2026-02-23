import type { ICreateUserResponse } from '~/domain/interface'
export interface ILoadingCreateUserState {
    mode: 'LoadingCreateUserState'
    data: []
}
export interface ILoadedCreateUserState {
    mode: 'SuccessCreateUserState'
    data: ICreateUserResponse
}
export interface IErrorCreateUserState {
    mode: 'ErrorCreateUserState'
    data: Error
}

export type CreateUserState = ILoadingCreateUserState | ILoadedCreateUserState | IErrorCreateUserState

