export interface ApiResponse<T> {
    code: string
    success: boolean
    message: string
    data?: T | T[]
}
