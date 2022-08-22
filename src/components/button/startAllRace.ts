import { PageListener } from "../buildPage/pageListener";
import { API } from "../api";
import { MoveElement } from "../moveElement";
import { EngineStatus } from "../enums";
import { DataStorage } from '../dataStorage';

export class StartRaceBtn {
    active(): void{
        const btnClick = async () => {
                DataStorage.data_cars_from_server.forEach(async (car) => {
                    await API.startEngine(car.id.toString(), 'started');
                    API.getDriveMode(car.id.toString());
                    let moveElement:Element | undefined = document.querySelector(`#track_${car.id}`)?.children[1].children[1];
                    moveElement?.parentElement?.parentElement?.setAttribute('status', EngineStatus.Start);
                    if(moveElement){
                        MoveElement.move(car.id.toString(), moveElement.children[0], moveElement.children[1], MoveElement.setMoveTimer(car.id.toString()));
                    }
                })
        }
        if(PageListener.START_RACE_BTN){
            PageListener.START_RACE_BTN.addEventListener('click', btnClick)
        }
    }
}
