import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";

const boardHeader = domManager.querySelector('.board-header');

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild(".board-container", content);
      domManager.addEventListener(
        `.board-toggle[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
      );
    }
  },
};





async function showHideButtonHandler  (clickEvent) {
  
  const boardId = clickEvent.target.dataset.boardId;
  console.log(clickEvent.target)
  console.log(boardId);
  if (clickEvent.target.classList.contains('hidden')) {
    clickEvent.target.classList.remove('hidden');
    

    // VERIFICA DACA ESTE DEJA AFISAT ! DACA DA ATUNCI STERGE CONTINUTUL BOARD_COLUMNS ! SI IESI

    const uniqueStatuses = await dataHandler.getStatuses()
    
    console.log("UNIQUE statuses :",uniqueStatuses)
    
    const boardContent =  await dataHandler.getBoardContent(boardId)

    console.log("All content :",boardContent)
    
    
    //generate html for each column
    
    uniqueStatuses.forEach(uniqueStatus => {
      //aici intra factory de coloana
      const boardBuilder = htmlFactory(htmlTemplates.status);
      const content = boardBuilder(uniqueStatus);
      domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
      
      let uniqueCards = []
      // aici avem toate cardurile pentru boardul cu id-ul corespunzator
      console.log(boardContent)
      boardContent.forEach( card => {
        if (card.status_id==uniqueStatus.id) {
          cardsManager.addCards(card, boardId, uniqueStatus.id)
          uniqueCards.push(card)} 
        })
        console.log(uniqueCards)
        cardsManager.enableDragAndDrop()
        
    })

  }
  else{
    clickEvent.target.classList.add('hidden');
    console.log('asta e next sibling')
    console.log(clickEvent.target.parentElement.nextElementSibling)
    clickEvent.target.parentElement.nextElementSibling.innerHTML = ''
  }
}
