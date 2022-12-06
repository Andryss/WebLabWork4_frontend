export interface User {
    username: string | null,
    password: string | null,
    isLoggedIn: boolean
}

export interface UserState {
    user: User,
    loading: boolean,
    error: string | null
}