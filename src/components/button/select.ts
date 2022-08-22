import { API } from "../api";
import { PageListener } from "../buildPage/pageListener";
import { DataStorage } from "../dataStorage";
import { ICarData } from '../interface';

export class SelectCar {
    active(): void{
        const buttonClick = async (e: Event) => {
            if((<HTMLElement>(e.target)).getAttribute('name') === 'select_car') {
                let track_id: string[] = <Array<string>>(<HTMLElement>(e.target)).parentElement?.parentElement?.getAttribute('id')?.split('_');
                if(track_id && typeof track_id[1] === 'string'){
                    DataStorage.change_car = Number(track_id[1]);
                    if(PageListener.CHANGE_FORM){
                        for(let i = 0; i < PageListener.CHANGE_FORM.children.length; i++){
                            PageListener.CHANGE_FORM.children[i].removeAttribute("disabled");
                        }
                    }
                    await API.getDataCarFromAPI(track_id[1]);
                    setTimeout(() => {
                            let element: ICarData = <ICarData>DataStorage.data_cars_from_server.get(<number>DataStorage.change_car);
                            if(element){
                                if(PageListener.CHANGE_NAME) PageListener.CHANGE_NAME.value = element.name;
                                if(PageListener.COLOR_CHANGE) PageListener.COLOR_CHANGE.value = element.color;
                            }
                    },100);
                }
            }
        }
        if(PageListener.CAR_TRACK){
            PageListener.CAR_TRACK.addEventListener('click', buttonClick);
        }
    }
}
