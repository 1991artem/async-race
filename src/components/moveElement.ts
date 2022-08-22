import { DataStorage } from './dataStorage';
import { PageListener } from './buildPage/pageListener';
import { EngineStatus } from './enums';
import { ICarData } from 'src/components/interface';
import { Winners } from './winners';

export class MoveElement {
    static move(id:string, elementCar:Element, finishElement:Element, timer:number | undefined): void {
        let trackElement = elementCar.parentElement?.parentElement?.parentElement;
        let startTime = new Date().getTime();
        let move: number = 0;
        let moveCarInterval: NodeJS.Timer = setInterval(() =>{
            if((elementCar.getBoundingClientRect().left < finishElement.getBoundingClientRect().left) && trackElement?.getAttribute('status') === EngineStatus.Start){
              move = move + 10;
                elementCar.setAttribute(
                  "style",
                  `left:${move}px;`
                );
                if(DataStorage.data_cars_from_server.get(Number(id))?.success === false) clearInterval(moveCarInterval);
                if(DataStorage.winner === null && (elementCar.getBoundingClientRect().left > finishElement.getBoundingClientRect().left)){
                DataStorage.winner = <ICarData>DataStorage.data_cars_from_server.get(Number(id));
                let winnerTime = (new Date().getTime() - startTime)/1000;
                  Winners.setWinners(id, winnerTime);
                  finishElement.children[0].children[0].setAttribute('fill', 'red');
                  if(PageListener.WIN_INFO){
                    PageListener.WIN_INFO.children[1].children[0].innerHTML = <string>DataStorage.data_cars_from_server.get(Number(id))?.name;
                    PageListener.WIN_INFO.children[2].children[0].innerHTML = `${winnerTime} sec`;
                    PageListener.WIN_INFO?.classList.remove('inactive');
                  }
                }
            }else {
                clearInterval(moveCarInterval);
                };
        }, timer)
      }
    static setMoveTimer(id:string): number | undefined{
      let driveParams = DataStorage.data_cars_from_server.get(Number(id))?.drive_params;
      if(driveParams) {
        return Number(driveParams?.distance / driveParams?.velocity)/100!;
      }
  }
}
