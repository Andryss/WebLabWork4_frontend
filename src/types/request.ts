export interface Request {
    id: number,
    createdTime: string,
    x: number,
    y: number,
    r: number,
    result: boolean
}

export interface RequestState {
    requests: Request[],
    loading: boolean,
    error: string | null
}