export interface User {
    username: string,
    isLoggedIn: boolean,
    authorities: string[]
}

export interface UserState {
    user: User,
    loading: boolean,
    error: string | null
}