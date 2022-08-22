import { ICarData, ISuccessDrive, IEnginParams, IDataWins} from "./interface";
export class DataStorage {
    static data_cars_from_server: Map<number, ICarData> = new Map();
    static change_car: number | undefined;
    static winner: ICarData | null = null;
    static data_winners_from_server: Map<number, IDataWins> = new Map();

    static loadCarsDataFromServer(data:ICarData[]){
        DataStorage.data_cars_from_server = new Map();
        data.forEach(obj =>{
            DataStorage.data_cars_from_server?.set(obj.id, obj);
        });
    }
    static loadWinnersDataFromServer(data:IDataWins[]){
        DataStorage.data_winners_from_server = new Map();
        data.forEach(obj =>{
            DataStorage.data_winners_from_server?.set(obj.id, obj);
        });
    }
    static driveModStatus(id:string, data:ISuccessDrive){
            let carObject:ICarData | undefined  = DataStorage.data_cars_from_server.get(Number(id));
            if(carObject){
                carObject.success = data.success;
                DataStorage.data_cars_from_server?.set(Number(id), carObject)
            }
    }
    static enginParams(id:string, data:IEnginParams){
            let carObject:ICarData | undefined  = DataStorage.data_cars_from_server.get(Number(id));
            if(carObject){
                carObject.drive_params = data;
                DataStorage.data_cars_from_server?.set(Number(id), carObject)
            }
    }
    static loadCarDataFromServer(id: string, data:ICarData){
        let carObject:ICarData | undefined  = DataStorage.data_cars_from_server.get(Number(id));
        if(carObject){
            carObject.color = data.color;
            carObject.name = data.name;
            carObject.id = Number(id);
            DataStorage.data_cars_from_server?.set(Number(id), carObject)
        }
    }
}
