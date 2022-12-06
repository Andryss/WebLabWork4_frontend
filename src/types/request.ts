export interface Request {
    id: number,
    createDate: string,
    x: number,
    y: number,
    r: number,
    res: boolean
}

export interface RequestState {
    requests: Request[],
    loading: boolean,
    error: string | null
}