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
  console.log(boardId);

  // VERIFICA DACA ESTE DEJA AFISAT ! DACA DA ATUNCI STERGE CONTINUTUL BOARD_COLUMNS ! SI IESI

  const boardContent =  await dataHandler.getBoardContent(boardId)
  let uniqueStatuses = []

  console.log("All statuses :",boardContent)
  
  boardContent.forEach(statuscard => {
    let cur_status = {'status_id': statuscard.status_id,
      'status_title': statuscard.status_title
      }
    if (uniqueStatuses.length == 0) uniqueStatuses.push(cur_status);
    else {
      let exists = 0
      uniqueStatuses.forEach(uniqueStatus => {
        if (uniqueStatus.status_id==cur_status.status_id) exists++
        })
      if (exists == 0 ) {
        uniqueStatuses.push(cur_status)
        }
      }
    });

  console.log("UNIQUE statuses :",uniqueStatuses)
  
  
  uniqueStatuses.forEach(uniqueStatus => {
    //generate html for each column

    const boardBuilder = htmlFactory(htmlTemplates.status);
    const content = boardBuilder(uniqueStatus);
    domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);

    let uniqueCards = []
    boardContent.forEach( card => {
      if (card.status_id==uniqueStatus.status_id) {uniqueCards.push(card)} 
      //daca cardul are statusul corect atunci adauga-l la coloana
    })
    // console.log(unique_status,uniqueCards)
    
  })


  // construim fiecare status in parte (ex where status_id = 1)
  // initializam coloana (statusul)
  // ordonam crescator cartile din fiecare status in parte
  // adaugam pe rand cartile in tabul de status
  // adaugam statusul completat la board
  
  // iau fiecare status in parte
  // statusesCards.forEach(statusCard =>  {
  //   // creez HTML-ul pentru statusul respectiv
  //   const statusBuilder = htmlFactory(htmlTemplates.status);
  //   const content = statusBuilder.boardBuilder(status);

  //   // aici urmeaza sa appenduiesc contentul in container, iar abia apoi pentru fiecare status sa ii appenduiesc cardurile
  
  // });
  

  cardsManager.loadCards(boardId);
  cardsManager.addCards();
}
