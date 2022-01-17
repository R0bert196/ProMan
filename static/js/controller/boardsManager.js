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





function showHideButtonHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardId;
  console.log(boardId);


  // dupa ce da click pe show, o sa incarce coloanele, iar apoi pentru fiecare coloana sa incarce cardurile
  const statuses = dataHandler.getStatuses()

  // iau fiecare status in parte
  statuses.foreach(status =>  {
    // creez HTML-ul pentru statusul respectiv
    const statusBuilder = htmlFactory(htmlTemplates.status);
    const content = statusBuilder.boardBuilder(status);
    // aici urmeaza sa appenduiesc contentul in container, iar abia apoi pentru fiecare status sa ii appenduiesc cardurile
  
  });
  

  cardsManager.loadCards(boardId);
  cardsManager.addCards();
}
