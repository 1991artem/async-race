import { PageWinListener } from "../buildPage/pageWinListener";
import { WinnersPage } from "../buildPage/winners/pageWinners";

export class PaginationBtnWinPage {
     active(): void{
        const buttonClick = async (e: Event) => {
            let pageNumberElement: HTMLElement|null = document.querySelector('.page_win_number');
            let pageNumber: number = Number(pageNumberElement?.innerHTML.split('#')[1]);
            if(pageNumber && pageNumberElement){
                if((<HTMLElement>e.target).id === 'next_win' && pageNumber < WinnersPage.page_win_pagination_counter){
                    document.querySelector(`.pagin_win_page_${pageNumber-1}`)?.classList.add('inactive');
                    document.querySelector(`.pagin_win_page_${pageNumber}`)?.classList.remove('inactive');
                    pageNumberElement.innerHTML = `Page #${pageNumber+1}`
                }
                if((<HTMLElement>e.target).id === 'prev_win' && pageNumber !== 1){
                    document.querySelector(`.pagin_win_page_${pageNumber-1}`)?.classList.add('inactive');
                    document.querySelector(`.pagin_win_page_${pageNumber-2}`)?.classList.remove('inactive');
                    pageNumberElement.innerHTML = `Page #${pageNumber-1}`
                }
            }
        }
        if(PageWinListener.PAGIN_WIN){
            PageWinListener.PAGIN_WIN.addEventListener('click', buttonClick);
        }
     }
}
