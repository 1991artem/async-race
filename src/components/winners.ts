import { API } from "./api";
import { WinnersPage } from "./buildPage/winners/pageWinners";
import { IDataWins } from "./interface";
import { DataStorage } from "./dataStorage";
import { SortQuery, OrderQuery} from "./enums";

export class Winners {
    static async setWinners(id:string, time:number): Promise<void>{
        let winner = DataStorage.data_winners_from_server.get(Number(id));
        if(winner){
            let winCount: number = winner?.wins + 1;
            let bestTime: number = time < winner?.time? time : winner?.time;
            let pushWinData: {} = {
                    wins: winCount,
                    time: bestTime
            }
            await API.updateWinnerFromAPI(id, JSON.stringify(pushWinData));
        } else {
            let newWinnersData: IDataWins = {
                id: Number(id),
                wins: 1,
                time: time
              }
              await API.createWinnerFromAPI(JSON.stringify(newWinnersData));
        }
        await API.getDataWinnersFromAPI(WinnersPage.winner_page_query, WinnersPage.winner_score_query, SortQuery.id, OrderQuery.ASC);
        WinnersPage.buildWinnersInfo();

    }

}
