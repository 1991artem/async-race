import { PageListener } from "../buildPage/pageListener";
import { CarTrack } from "../buildPage/garage/loadCarTrack";
import { API } from "../api";

export class GenerateCarBtn {
    count: number;
    carsName: string[];
    carsModel: string[];
    constructor(){
        this.count = 100;
        this.carsName = ['Toyota', 'Tesla', 'Honda', 'Renault', 'Volvo', 'Chevrolet', 'Suzuki', 'Mercedes', 'Skoda', 'VW'];
        this.carsModel = ['USA', 'R', 'Monkey', 'Cat', 'Sea', 'Tree', 'Dino', 'Bird', 'Georgia', 'Poland'];
    }
    active(): void{
        const buttonClick = async (e: Event) => {
            for(let i: number = 0; i < this.count; i++){
                let newCreateCar: {} = {
                    name: `${this.carsName[Math.floor(Math.random()*10)]} ${this.carsModel[Math.floor(Math.random()*10)]}`,
                    color: `${this.getRandomColor()}`
            }
            await API.createCarsFromAPI(JSON.stringify(newCreateCar));
            }
            await API.getDataCarsFromAPI();
            setTimeout(() => CarTrack.loadCarTrack(), 100);
        }
        if(PageListener.GENERATE_BTN){
            PageListener.GENERATE_BTN.addEventListener('click', buttonClick);
        }
    }
    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
}
