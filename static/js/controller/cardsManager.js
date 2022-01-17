import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";



export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    for (let card of cards) {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      domManager.addChild(`.board-header[data-board-id="${boardId}"]`, content);
      domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler
      );
    }
  },
  addCards: async function() {
    domManager.addEventListener('.board-add', 'click', addCards)
    }

};

const addCards = (clickEvent) => {
  console.log(clickEvent.targer)
}

// const addCard = (click) => {
//   console.log(click)
// }





// add event listener to board header to listen for the button AddNew 

// domManager.addEventListener('.board-add', 'click', addCard)



// dataHandler.createNewCard()


function deleteButtonHandler(clickEvent) {}
