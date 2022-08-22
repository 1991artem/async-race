import { API } from "../api";
import { CarTrack } from "../buildPage/garage/loadCarTrack";
import { PageListener } from "../buildPage/pageListener";
import { WinnersPage } from "../buildPage/winners/pageWinners";
import { SortQuery, OrderQuery} from "../enums";

export class BtnDelete {
    active(): void{
        const buttonClick = async (e: Event) => {
            if((<HTMLElement>(e.target)).getAttribute('name') === 'delete_car') {
                let track_id: string[] = <Array<string>>(<HTMLElement>(e.target)).parentElement?.parentElement?.getAttribute('id')?.split('_');
                if(track_id && typeof track_id[1] === 'string'){
                    await API.removeCarsFromAPI(track_id[1]);
                    await API.removeWinnerFromAPI(track_id[1])
                }
                await API.getDataCarsFromAPI();
                await API.getDataWinnersFromAPI(WinnersPage.winner_page_query, WinnersPage.winner_score_query, SortQuery.id, OrderQuery.ASC);
                setTimeout(() => {
                    CarTrack.loadCarTrack();
                    WinnersPage.buildWinnersInfo();
                }, 1000);
            }
        }
        if(PageListener.CAR_TRACK){
            PageListener.CAR_TRACK.addEventListener('click', buttonClick);
        }
    }
}
