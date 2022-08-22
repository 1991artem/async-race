import { PageListener } from "../buildPage/pageListener";
import { WinnersPage } from "../buildPage/winners/pageWinners";

export class ChangePageBtn {
    active(): void {
        const buttonClick = (e: Event) => {
            if((<HTMLElement>e.target).className === 'to_garage'){
                PageListener.WRAPPER?.children[1].classList.remove('inactive');
                PageListener.WRAPPER?.children[2].classList.add('inactive');
            } else if((<HTMLElement>e.target).className === 'to_winners'){
                PageListener.WRAPPER?.children[2].classList.remove('inactive');
                PageListener.WRAPPER?.children[1].classList.add('inactive');
                WinnersPage.buildWinnersInfo();
            }
        }
        if(PageListener.CHANGE_PAGE){
            PageListener.CHANGE_PAGE.addEventListener('click', buttonClick);
        }
    }
}
