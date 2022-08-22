import { PageListener } from '../pageListener';
import { PageWinListener } from '../pageWinListener';
import { DataStorage } from '../../dataStorage';
import { CarTrack } from '../garage/loadCarTrack';
import { PaginationBtnWinPage } from '../../button/paginBtnWinPage';
import { SortWinPage } from '../../button/sortWinPage';
import './winners.scss';

export class WinnersPage {
    static WINNER_PAGE: HTMLElement = document.createElement('div');
    static paginBtn: PaginationBtnWinPage = new PaginationBtnWinPage();
    static sortFunc: SortWinPage = new SortWinPage();
    static pageWinListener: PageWinListener = new PageWinListener();
    static page_win_pagination_counter: number = 1;
    static car_in_page_pagination_win: number = 10;
    static page_counter: number = 0;
    static winner_page_query: number = 1;
    static winner_score_query: number = 200;

    static paginatiotCounter(): void {
        if(DataStorage.data_cars_from_server){
            WinnersPage.page_win_pagination_counter = Math.ceil(DataStorage.data_winners_from_server?.size / WinnersPage.car_in_page_pagination_win);
        }
    }

    buildPageWinners(): void {
        if (PageListener.WRAPPER) {
            PageListener.WRAPPER.appendChild(WinnersPage.WINNER_PAGE);
        }
        WinnersPage.WINNER_PAGE.classList.add('winners');
        WinnersPage.WINNER_PAGE.classList.add('inactive');
        WinnersPage.buildWinnersInfo();
    }
    static buildWinnersInfo(): void{
        WinnersPage.paginatiotCounter();
        WinnersPage.page_counter = 0;
        WinnersPage.WINNER_PAGE.innerHTML = '';
        WinnersPage.WINNER_PAGE.innerHTML = `<div class="winners_page">
                                    <p class="winner_counter">Winners = ${DataStorage.data_winners_from_server.size}</p>
                                    <p class="page_win_number">Page #${1}</p>
                                    <div class="winners_list">
                                        <div class="winners_list_table_header">
                                        <div><p>Number</p></div>
                                        <div><p>Car</p></div>
                                        <div><p>Name</p></div>
                                        <div><p>Wins</p></div>
                                        <div><p>Best result (sec)</p></div>
                                        </div>
                                    </div>
                                    <div class="pagination_winners">
                                    <button id="prev_win" class="btn_prev_pagin"> << Prev</button>
                                    <button id="next_win" class="btn_next_pagin">Next >> </button>
                                    </div>`;
                                const WINNER_LIST:HTMLElement | null = document.querySelector(`.winners_list`);
                                if(WINNER_LIST) WINNER_LIST.innerHTML += WinnersPage.buildPlace();
                                WinnersPage.pageWinListener.readPage();
                                WinnersPage.paginBtn.active();
                                document.querySelector(`.pagin_win_page_0`)?.classList.remove('inactive');
                                WinnersPage.sortFunc.active();
    }
    static buildPlace(): string{
        let winnerPlace: string = ``;
        if(DataStorage.data_winners_from_server && DataStorage.data_cars_from_server){
            for(let j = 0; j < WinnersPage.page_win_pagination_counter; j++){
                winnerPlace += `<div class="pagin_win_page_${j} inactive winner_list">${WinnersPage.buildTable()}</div>`;
            }
            }
        return winnerPlace;
    }
    static buildTable(): string {
    let winnerTable: string = ``;
    if(DataStorage.data_winners_from_server && DataStorage.data_cars_from_server){
            let counter: number = 0;
            for(let i: number = WinnersPage.page_counter; i < DataStorage.data_winners_from_server.size; i++){
                    let carDataId: number = Array.from(DataStorage.data_winners_from_server.values())[i]?.id;
                    if(carDataId){
                        if(DataStorage.data_cars_from_server.get(carDataId)){
                            let color:string | undefined = DataStorage.data_cars_from_server.get(carDataId)?.color;
                            winnerTable += `<div class="winners_list_table_item">
                                                <div><p>${i+1}</p></div>
                                                <div class="car_svg_in_list">${CarTrack.avtomobile_svg_tamplate(<string>color)}</div>
                                                <div><p>${DataStorage.data_cars_from_server.get(carDataId)?.name}</p></div>
                                                <div><p>${DataStorage.data_winners_from_server.get(Number(carDataId))?.wins}</p></div>
                                                <div><p>${DataStorage.data_winners_from_server.get(Number(carDataId))?.time}</p></div>
                                                </div>`
                        }
                    }
                    counter++;
                    if(counter === WinnersPage.car_in_page_pagination_win){
                        WinnersPage.page_counter = i;
                        break;
                    }
            }
            WinnersPage.page_counter++;
        }
        return winnerTable;
    };
}
