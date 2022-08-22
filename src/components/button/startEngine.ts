import { EngineStatus } from "../enums";
import { PageListener } from "../buildPage/pageListener";
import { API } from "../api";
import { MoveElement } from "../moveElement";

export class StartEngine {
    active(): void {
        const startEngineBtn = async (e: Event) => {
            if((<HTMLElement>(e.target)).getAttribute('name') === 'start_engine') {
                let elementTarget: HTMLElement = <HTMLElement>(<HTMLElement>(e.target)).parentElement?.parentElement;
                let track_id: string[] = <Array<string>>elementTarget?.parentElement?.getAttribute('id')?.split('_');
                if(track_id && typeof track_id[1] === 'string'){
                    if(elementTarget?.parentElement?.getAttribute('status') === EngineStatus.Stop) {
                        elementTarget?.parentElement?.setAttribute('status', EngineStatus.Start)
                    await API.startEngine(track_id[1], <string>elementTarget?.parentElement.getAttribute('status'));
                    await API.getDriveMode(track_id[1]);
                    let driveCarElement = elementTarget?.children[1].children[0];
                    driveCarElement.setAttribute('startPoint', `${driveCarElement.getBoundingClientRect().left}`)
                    let finishElement = elementTarget?.children[1].children[1].children[0];
                    MoveElement.move(track_id[1], driveCarElement, finishElement, MoveElement.setMoveTimer(track_id[1]));
                        elementTarget?.children[0].children[1]?.removeAttribute("disabled");
                        elementTarget?.children[0].children[0]?.setAttribute("disabled", "disabled");

                }
                }
            }
            if((<HTMLElement>(e.target)).getAttribute('name') === 'stop_car'){
                let elementTarget:HTMLElement = <HTMLElement>(<HTMLElement>(e.target)).parentElement?.parentElement;
                if(elementTarget?.parentElement?.getAttribute('status') === EngineStatus.Start){
                    elementTarget?.children[1].children[0].setAttribute('style',`left="${elementTarget?.children[1].children[0].getAttribute('startPoint')}"`);
                    elementTarget?.children[0].children[1]?.setAttribute("disabled", "disabled");
                    elementTarget?.children[0].children[0]?.removeAttribute("disabled");
                    elementTarget?.parentElement?.setAttribute('status', EngineStatus.Stop);
                }


            }
        }
        if(PageListener.CAR_TRACK){
            PageListener.CAR_TRACK.addEventListener('click', startEngineBtn);
        }
    }
}
