import { PageWinListener } from "../buildPage/pageWinListener";
import { DataStorage } from "../dataStorage";
import { WinnersPage } from '../buildPage/winners/pageWinners';
import { API } from "../api";
import { SortQuery, OrderQuery} from "../enums";

export class SortWinPage {
    sortByNameFlag: boolean
    sortByWinsFlag: boolean
    sortByTimeFlag: boolean
    constructor(){
        this.sortByNameFlag = true;
        this.sortByWinsFlag = true;
        this.sortByTimeFlag = true;
    }
    active(): void {
        const buttonClick = async (e: Event) => {
            let target: HTMLElement = (<HTMLElement>(e.target));
            if(target.innerHTML === 'Name'){
                this.sortByName();
                this.sortByNameFlag = this.sortByNameFlag?false:true;
            }
            if(target.innerHTML === 'Wins'){
                this.sort(SortQuery.wins, this.sortByWinsFlag);
                this.sortByWinsFlag = this.sortByWinsFlag?false:true;
            }
            if(target.innerHTML === 'Best result (sec)'){
                this.sort(SortQuery.time, this.sortByTimeFlag);
                this.sortByTimeFlag = this.sortByTimeFlag?false:true;
            }
            WinnersPage.buildWinnersInfo();
        }
        if(PageWinListener.HEADER){
            PageWinListener.HEADER.addEventListener('click', buttonClick);
        }
    }
    sortByName(): void{
        let resArray = Array.from(DataStorage.data_winners_from_server);
        const sort = (i:number) => {
            let saveItem = resArray[i];
            resArray[i] = resArray[i + 1];
            resArray[i + 1] = saveItem;
        }
        for (let j = resArray.length - 1; j > 0; j--) {
            for (let i = 0; i < j; i++) {

                if(this.sortByNameFlag){
                    if (<string>DataStorage.data_cars_from_server.get(resArray[i][1].id)?.name > <string>DataStorage.data_cars_from_server.get(resArray[i+1][1].id)?.name) {
                        sort(i);
                      }
                } else {
                    if (<string>DataStorage.data_cars_from_server.get(resArray[i][1].id)?.name < <string>DataStorage.data_cars_from_server.get(resArray[i+1][1].id)?.name) {
                        sort(i);
                      }
                }
            }
          }
        DataStorage.data_winners_from_server = new Map(resArray);
    }
    async sort(sort:string, flag: boolean): Promise<void>{
        if(flag){
            await API.getDataWinnersFromAPI(WinnersPage.winner_page_query, WinnersPage.winner_score_query, sort, OrderQuery.ASC);
        } else {
            await API.getDataWinnersFromAPI(WinnersPage.winner_page_query, WinnersPage.winner_score_query, sort, OrderQuery.DESC);
        }
    }
}
