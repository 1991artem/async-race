export class PageListener{
    static BODY: HTMLElement = document.body;
    static WRAPPER: HTMLElement | null;
    static RACE_AREA: HTMLElement | null;
    static CREATE_BTN: HTMLElement | null;
    static SAVE_BTN: HTMLElement | null;
    static INPUT_CREATE: HTMLInputElement | null;
    static COLOR_CREATE: HTMLInputElement | null;
    static COLOR_CHANGE: HTMLInputElement | null;
    static CAR_TRACK: HTMLElement | null;
    static CHANGE_NAME: HTMLInputElement | null;
    static GENERATE_BTN: HTMLElement | null;
    static PAGIN_BTN: HTMLElement | null;
    static CHANGE_FORM: HTMLElement | null;
    static RESET_BTN: HTMLElement | null;
    static START_RACE_BTN: HTMLElement | null;
    static CHANGE_PAGE: HTMLElement | null;
    static WIN_INFO: HTMLElement | null;
    readPage(): void{
        PageListener.WRAPPER = document.querySelector('.wrapper');
        PageListener.RACE_AREA = document.querySelector('.race_arena');
        PageListener.CREATE_BTN = document.querySelector('.create_car_btn');
        PageListener.INPUT_CREATE = document.querySelector('.create_car_name');
        PageListener.CHANGE_NAME = document.querySelector('.change_car_name');
        PageListener.COLOR_CREATE = document.querySelector('.create_car_color');
        PageListener.COLOR_CHANGE = document.querySelector('.change_car_color');
        PageListener.CAR_TRACK = document.querySelector('.race_arena');
        PageListener.SAVE_BTN = document.querySelector('.change_car_btn');
        PageListener.GENERATE_BTN = document.querySelector('.btn_generate');
        PageListener.PAGIN_BTN = document.querySelector('.pagination');
        PageListener.CHANGE_FORM = document.querySelector('.change_car_form');
        PageListener.RESET_BTN = document.querySelector('.btn_reset');
        PageListener.START_RACE_BTN = document.querySelector('.btn_race');
        PageListener.CHANGE_PAGE = document.querySelector('.change_page');
        PageListener.WIN_INFO = document.querySelector('.winner_info');
    }
}
