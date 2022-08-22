import { PageListener } from "../buildPage/pageListener";
import { CarTrack } from "../buildPage/garage/loadCarTrack";
import { DataStorage } from "../dataStorage";
import { API } from "../api";

export class SaveConfig {
    active(): void{
        const buttonClick = async (e: Event) => {
            if(this.validationChangeInputForm()){
                let changeCarConfig: {name:string, color:string} = {
                    name: <string>this.validationChangeInputForm(),
                    color: <string>PageListener.COLOR_CHANGE?.value
            }
            if(DataStorage.change_car){
                await API.updateCarsFromAPI((DataStorage.change_car).toString(), JSON.stringify(changeCarConfig));
                await API.getDataCarsFromAPI();
                setTimeout(() => CarTrack.loadCarTrack(), 100);
                (<HTMLInputElement>PageListener.CHANGE_NAME).value = '';
            if(PageListener.CHANGE_FORM){
                for(let i = 0; i < PageListener.CHANGE_FORM.children.length; i++){
                    PageListener.CHANGE_FORM.children[i].setAttribute("disabled", "disabled");
                }
            }
            }
        }
        }
        if(PageListener.SAVE_BTN){
            PageListener.SAVE_BTN.addEventListener('click', buttonClick);
        }
    }
    validationChangeInputForm(): string | undefined {
        if(PageListener.CHANGE_NAME) {
            if((<HTMLInputElement>PageListener.CHANGE_NAME).value){
                return (<HTMLInputElement>PageListener.CHANGE_NAME).value
            } else {
                PageListener.CHANGE_NAME?.classList.add('valid_error');
                setTimeout(()=> PageListener.CHANGE_NAME?.classList.remove('valid_error'), 100);
            }
        }
    }
}
