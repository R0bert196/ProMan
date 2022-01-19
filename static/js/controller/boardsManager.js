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
      domManager.addEventListener(
        `.board-title[data-board-id="${board.id}"]`,
        "input",
        transformTitleToForm
      )
    }
  },
};

function transformTitleToForm (e){
  // e.currentTarget.preventDefault()
  e.preventDefault();
  // console.log(e.inputType)
  if(!e.data && e.inputType == "insertText"){
    dataHandler.updateName(e.target.innerText.trim().replace(/\n/g,""), e.target.dataset.boardId, '/api/create_board');
    e.target.innerHTML = e.target.textContent.trim().replace(/\n/g,"");
    e.target.contentEditable="false"
    e.target.contentEditable="true"
  }
}

function transformColumnName (e){
  // e.currentTarget.preventDefault()
  e.preventDefault();
  // console.log(e.inputType)
  if(!e.data && e.inputType == "insertText"){
    dataHandler.updateStatusName(e.target.innerText.trim().replace(/\n/g,""), e.target.dataset.statusId);
    e.target.innerHTML = e.target.textContent.trim().replace(/\n/g,"");
    e.target.contentEditable="false"
    e.target.contentEditable="true"
  }
}



async function showHideButtonHandler  (clickEvent) {
  
  const boardId = clickEvent.target.dataset.boardId;
  // console.log(clickEvent.target)
  // console.log(boardId);
  if (clickEvent.target.classList.contains('hidden')) {
    clickEvent.target.parentElement.nextElementSibling.innerHTML = 'Loading...'
    clickEvent.target.classList.remove('hidden');
    const uniqueStatuses = await dataHandler.getStatuses()
    const boardContent =  await dataHandler.getBoardContent(boardId)
    //generate html for each column
    clickEvent.target.parentElement.nextElementSibling.innerHTML = ''
    uniqueStatuses.forEach(uniqueStatus => {
      
      //aici intra factory de coloana
      const boardBuilder = htmlFactory(htmlTemplates.status);
      
      const content = boardBuilder(uniqueStatus);
      
      domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);

      domManager.addEventListener(
        `.board-columns[data-board-id="${boardId}"]`,
        'input',
        transformColumnName
      )
      console.log(clickEvent.target)
      
      if (clickEvent.target.parentElement.nextElementSibling.children[0].children[0].classList.contains('board-column-title')){
        console.log(clickEvent.target)
        domManager.addEventListener(
        clickEvent.Target,
        'input',
        transformTitleToForm
        )}
      let uniqueCards = []
      // aici avem toate cardurile pentru boardul cu id-ul corespunzator
      // console.log(boardContent)
      boardContent.forEach( card => {
        if (card.status_id==uniqueStatus.id) {
          cardsManager.addCards(card, boardId, uniqueStatus.id)
          if (clickEvent.target.classList.contains('card')){
          domManager.addEventListener(
            `.card[data-card-id="${card.card_id}"]`,
            "input",
            transformCardName
          );
          }
          uniqueCards.push(card)} 
        })
        // console.log(uniqueCards)
        cardsManager.enableDragAndDrop()
        
    })

  }
  else{
    clickEvent.target.classList.add('hidden');
    // console.log('asta e next sibling')
    // console.log(clickEvent.target.parentElement.nextElementSibling)
    clickEvent.target.parentElement.nextElementSibling.innerHTML = ''
  }
}

function transformCardName (e){
  // e.currentTarget.preventDefault()
  e.preventDefault();
  // console.log(e.inputType)
  if(!e.data && e.inputType == "insertText"){
    dataHandler.updateCardName(e.target.innerText.trim().replace(/\n/g,""), e.target.dataset.cardId);
    e.target.innerHTML = e.target.textContent.trim().replace(/\n/g,"");
    e.target.contentEditable="false"
    e.target.contentEditable="true"
  }
}
