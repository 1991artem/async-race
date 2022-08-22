import { PageListener } from "../buildPage/pageListener";
import { CarTrack } from "../buildPage/garage/loadCarTrack";
import { DataStorage } from "../dataStorage";

export class ResetRaceBtn {
    active(): void{
        const btnClick = () => {
            DataStorage.winner = null;
            PageListener.WIN_INFO?.classList.add('inactive')
            CarTrack.loadCarTrack();
        };
        if(PageListener.RESET_BTN){
            PageListener.RESET_BTN.addEventListener('click', btnClick);
        }
    }
}
