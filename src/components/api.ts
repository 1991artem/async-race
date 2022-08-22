import { DataStorage } from "./dataStorage";
import { ICarData, IDataWins, IEnginParams, ISuccessDrive } from "./interface";
import { ServerError, RequestError} from "./error";

export class API {
    static url: string;
    static header:{} = {'Content-Type': 'application/json','Accept': 'application/json'};
    constructor(url: string){
        API.url = url;
    }
    static errorHandler(res: Response): Response {
            if (!res.ok) {
                if (res.status === 404 || res.status === 400) console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
                if (res.status === 500)  throw new ServerError();
                if (res.status === 429) throw new RequestError()
                throw Error(res.statusText);
            }
            return res;
    }
    static async getDataCarsFromAPI(): Promise<void> {
        await fetch(`${this.url}/garage`, {method: 'GET', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then(async (data: ICarData[]) => await DataStorage.loadCarsDataFromServer(data))
            .catch((err) => console.log('Fetch Cars Error', err));
    }
    static async createCarsFromAPI(data: string): Promise<void> {
        await fetch(`${this.url}/garage`, {method: 'POST', headers : API.header, body: data})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Create Car Error', err));
    }
    static async removeCarsFromAPI(id: string): Promise<void> {
        await fetch(`${API.url}/garage/${id}`, {method: 'DELETE', headers : API.header})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Remove Car Error', err));
    }
    static async getDataCarFromAPI(id: string): Promise<void> {
        await fetch(`${API.url}/garage/${id}`, {method: 'GET', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data: ICarData) => DataStorage.data_cars_from_server?.set(Number(id), data))
            .catch((err) => console.log('Get Data Car Error', err));
    }
    static async updateCarsFromAPI(id: string, data: string): Promise<void> {
        await fetch(`${API.url}/garage/${id}`, {method: 'PUT', headers : API.header, body: data})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Update Cars Error', err));
    }
    static async startEngine(id: string, status: string): Promise<void> {
        await fetch(`${API.url}/engine?id=${id}&status=${status}`, {method: 'PATCH', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data: IEnginParams) => DataStorage.enginParams(id, data))
            .catch((err) => console.log('Engine Cars Error', err));
    }
    static async getDriveMode(id: string): Promise<void> {
        await fetch(`${API.url}/engine?id=${id}&status=drive`, {method: 'PATCH', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then(async (data: ISuccessDrive) => await DataStorage.driveModStatus(id, data))
            .catch((err) => {
                DataStorage.driveModStatus(id, {success: false});
                console.log('Engine Cars Error', err);
            });
    }
    static async getDataWinnersFromAPI(page:number, limit:number, sort:string, order:string): Promise<void> {
        await fetch(`${API.url}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {method: 'GET', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then((data: IDataWins[]) => DataStorage.loadWinnersDataFromServer(data))
            .catch((err) => console.log('Get Data Winners Error', err));
    }
    static async getDataWinnerFromAPI(id: string): Promise<void> {
        await fetch(`${API.url}/winners/${id}`, {method: 'GET', headers : API.header})
            .then((response) => this.errorHandler(response))
            .then((response) => response.json())
            .then(async (data: IDataWins[]) => await DataStorage.loadWinnersDataFromServer(data))
            .catch((err) => console.log('Get Data Win Error', err));
    }
    static async createWinnerFromAPI(data: string): Promise<void> {
        await fetch(`${this.url}/winners`, {method: 'POST', headers : API.header, body: data})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Create Win Error', err));
    }
    static async removeWinnerFromAPI(id: string): Promise<void> {
        await fetch(`${API.url}/winners/${id}`, {method: 'DELETE', headers : API.header})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Remove Win Error', err));
    }
    static async updateWinnerFromAPI(id: string, data: string): Promise<void> {
        await fetch(`${API.url}/winners/${id}`, {method: 'PUT', headers : API.header, body: data})
            .then((response) => this.errorHandler(response))
            .catch((err) => console.log('Update Win Error', err));
    }
}
