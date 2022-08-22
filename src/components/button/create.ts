import { PageListener } from "../buildPage/pageListener";
import { CarTrack } from "../buildPage/garage/loadCarTrack";
import { API } from "../api";

export class ButtonCreate {

    active(): void {
        const buttonClick = async (e: Event) => {
            if(this.validationInputForm()){
                let newCreateCar: {} = {
                    name: <string>this.validationInputForm(),
                    color: <string>PageListener.COLOR_CREATE?.value
            }
            await API.createCarsFromAPI(JSON.stringify(newCreateCar));
            await API.getDataCarsFromAPI();
            setTimeout(() => CarTrack.loadCarTrack(), 100);
            (<HTMLInputElement>PageListener.INPUT_CREATE).value = '';
        }
        }
        if(PageListener.CREATE_BTN){
            PageListener.CREATE_BTN.addEventListener('click', buttonClick);
        }
    }
    validationInputForm(): string | undefined {
        if(PageListener.INPUT_CREATE) {
            if((<HTMLInputElement>PageListener.INPUT_CREATE).value){
                return (<HTMLInputElement>PageListener.INPUT_CREATE).value
            } else {
                PageListener.INPUT_CREATE.classList.add('valid_error');
                setTimeout(()=> PageListener.INPUT_CREATE?.classList.remove('valid_error'), 100);
            }
        }
    }
}
