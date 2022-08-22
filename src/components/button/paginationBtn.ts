import { PageListener } from "../buildPage/pageListener";
import { GaragePage } from "../buildPage/garage/pageGarage";

export class PaginationBtn {
    active(): void{
        const buttonClick = async (e: Event) => {
            let pageNumberElement: HTMLElement|null = document.querySelector('.page_number');
            let pageNumber: number = Number(pageNumberElement?.innerHTML.split('#')[1]);
            if(pageNumber && pageNumberElement){
                if((<HTMLElement>e.target).id === 'next' && pageNumber !== GaragePage.page_pagination_counter){
                    document.querySelector(`.pagin_page_${pageNumber-1}`)?.classList.add('inactive_track');
                    document.querySelector(`.pagin_page_${pageNumber}`)?.classList.remove('inactive_track');
                    pageNumberElement.innerHTML = `Page #${pageNumber+1}`
                }
                if((<HTMLElement>e.target).id === 'prev' && pageNumber !== 1){
                    document.querySelector(`.pagin_page_${pageNumber-1}`)?.classList.add('inactive_track');
                    document.querySelector(`.pagin_page_${pageNumber-2}`)?.classList.remove('inactive_track');
                    pageNumberElement.innerHTML = `Page #${pageNumber-1}`
                }
            }
            GaragePage.paginatiotCounter();
        }
        if(PageListener.PAGIN_BTN){
            PageListener.PAGIN_BTN.addEventListener('click', buttonClick);
        }
    }
}
