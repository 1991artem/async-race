export interface ICarData {
    id: number,
    name: string,
    color: string
    success?: boolean,
    drive_params: IEnginParams
}

export interface IEnginParams {
    velocity: number,
    distance: number
}

export interface IDataWins {
    id: number,
    wins: number,
    time: number
}

export interface ISuccessDrive {
    success: boolean,
}
