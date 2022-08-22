export class PageWinListener{
    static PAGIN_WIN: HTMLElement | null;
    static HEADER: HTMLElement | null;
    readPage(): void{
        PageWinListener.PAGIN_WIN = document.querySelector('.pagination_winners');
        PageWinListener.HEADER = document.querySelector('.winners_list_table_header');
    }
}
