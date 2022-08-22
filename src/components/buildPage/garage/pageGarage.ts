import { PageListener } from '../pageListener';
import { DataStorage } from '../../dataStorage';
import { ButtonCreate } from '../../button/create';
import { BtnDelete } from '../../button/delete';
import { CarTrack } from './loadCarTrack';
import { SelectCar } from '../../button/select';
import { SaveConfig } from '../../button/saveConfig';
import { StartEngine } from '../../button/startEngine';
import { GenerateCarBtn } from '../../button/generateCar';
import { PaginationBtn } from '../../button/paginationBtn';
import { ResetRaceBtn } from '../../button/reserRace';
import { StartRaceBtn } from '../../button/startAllRace';
import './garage.scss';

export class GaragePage {
    garage_page_listener: PageListener;
    static car_in_page_pagination: number = 7;
    page_number: number;
    static page_pagination_counter: number = 0;
    constructor() {
        this.garage_page_listener = new PageListener();
        this.page_number = 0;
    }

    static paginatiotCounter(): void {
        if(DataStorage.data_cars_from_server){
            GaragePage.page_pagination_counter = Math.ceil(DataStorage.data_cars_from_server?.size / GaragePage.car_in_page_pagination);
        }
    }

    buildPageGarage():void {
        GaragePage.paginatiotCounter();
        PageListener.BODY.innerHTML = `<wrapper class="wrapper">
                                            <div class="change_page">
                                            <button class="to_garage">To Garage</button>
                                            <button class="to_winners">To Winners</button>
                                            </div>
                                            <div class="race_page">
                                            <div class="info_place">
                                            <div class="button_config">
                                                <form class="create_car_form">
                                                    <input type="text" class="create_car_name"/>
                                                    <input type="color" class="create_car_color" id="create_car_color">
                                                    <input class="create_car_btn" type="button" value="Create Car">
                                                </form>
                                                <form class="change_car_form">
                                                    <input type="text" class="change_car_name" disabled="disabled"/>
                                                    <input type="color" class="change_car_color" id="change_car_color" disabled="disabled">
                                                    <input class="change_car_btn" type="button" value="Save config" disabled="disabled">
                                                </form>
                                                <button id="race" class="btn_race">Lets GO!!!</button>
                                                <button id="reset" class="btn_reset">Reset Race</button>
                                                <button id="generate" class="btn_generate">Generate Car</button>
                                            </div>
                                            <div class="winner_info inactive">
                                            <div class="winner_img_info"><img src="img/winner-5307684_1280.png"></div>
                                            <div class="winner_name_info"><p></p></div>
                                            <div class="winner_res_info"><p></p></div>
                                            </div>
                                            </div>
                                            <div class="race_arena"></div>
                                            <div class="pagination">
                                            <button id="prev" class="btn_prev_pagin"> << Prev</button>
                                            <button id="next" class="btn_next_pagin">Next >> </button>
                                            </div>
                                            </div>
                                        </wrapper>`;
        this.garage_page_listener.readPage();
        CarTrack.loadCarTrack();
        const btnDelete: BtnDelete = new BtnDelete();
        const btnCreate: ButtonCreate = new ButtonCreate();
        const btnSelect: SelectCar = new SelectCar();
        const btnSaveConfig: SaveConfig = new SaveConfig();
        const btnStartCar: StartEngine = new StartEngine();
        const btnGenerateCar: GenerateCarBtn = new GenerateCarBtn();
        const btnPaginatoin: PaginationBtn = new PaginationBtn();
        const btnReset: ResetRaceBtn = new ResetRaceBtn();
        const btnStartRace: StartRaceBtn = new StartRaceBtn();
        btnCreate.active();
        btnDelete.active();
        btnSelect.active();
        btnSaveConfig.active();
        btnStartCar.active();
        btnGenerateCar.active();
        btnPaginatoin.active();
        btnReset.active();
        btnStartRace.active();
    }
}
