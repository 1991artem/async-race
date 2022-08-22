import './components/styles';

import { API } from "./components/api";
import { DataStorage } from "./components/dataStorage";
import { GaragePage } from "./components/buildPage/garage/pageGarage";
import { MoveElement } from './components/moveElement';
import { WinnersPage } from './components/buildPage/winners/pageWinners';
import { ChangePageBtn } from './components/button/changePage';
import { Winners } from './components/winners';
import { SortQuery, OrderQuery} from './components/enums';

const garageUrl = 'http://127.0.0.1:3000';

const GARAGE_PAGE: GaragePage = new GaragePage();
const DATA_STORAGE: DataStorage = new DataStorage();
const CARS_SERVER: API = new API(garageUrl);
const MOVE_ELEMENT: MoveElement = new MoveElement();
const WINNERS_PAGE: WinnersPage = new WinnersPage();
const CHANGE_PAGE_BTN: ChangePageBtn = new ChangePageBtn();
(async () =>{
    await API.getDataCarsFromAPI();
    await API.getDataWinnersFromAPI(WinnersPage.winner_page_query, WinnersPage.winner_score_query, SortQuery.id, OrderQuery.ASC);
    GARAGE_PAGE.buildPageGarage();
    CHANGE_PAGE_BTN.active();
    setTimeout(()=>{
        WINNERS_PAGE.buildPageWinners();
        new Winners()
    },100)

})();
