import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const ui = {
  slots: null,
  cards: null,
  dragged: null,
}

let newCardProperties = {
  status_id : null,
  board_id : null,
  card_id : null,
  card_order : null,
}


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
  addCards: async function(card, boardId, uniqueStatusId) {
    const cardBuilder = htmlFactory(htmlTemplates.card);
    const content = cardBuilder(card);
    domManager.addChild(`body > div.board-container > section:nth-child(${boardId}) > div.board-columns > div:nth-child(${uniqueStatusId}) > div.board-column-content`, content);
    },

  enableDragAndDrop: function() {
    
    initElements(ui);
    initDraggable(ui)
    initDropZone(ui);



  }
  
};

function selectOrder(dragged, parent) {
  let curentCount = 0;
  let found = false;
  console.log(parent.children)
  Array.from(parent.children).forEach(child => {
    if (!found) curentCount++;
    if (child.dataset.cardId === dragged.dataset.cardId) {
      found = true
    }
  })
  return curentCount
}


function deleteButtonHandler(clickEvent) {}

const initElements = () => {
  ui.cards = document.querySelectorAll(".card");
  ui.slots = document.querySelectorAll(".board-column-content");


  // da clasa draggable ca fiind true pentru carduri
  ui.cards.forEach(card => {
      card.setAttribute("draggable", true);
  });
}

const initDraggable = () => {

  ui.cards.forEach(card => {
    card.setAttribute("draggable", true);
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

};

const initDropZone = () => {

    ui.slots.forEach(slot => {
    slot.addEventListener("dragenter", handleDragEnter);
    slot.addEventListener("dragover", handleDragOver);
    slot.addEventListener("dragleave", handleDragLeave);
    slot.addEventListener("drop", handleDrop);
    // ui.cards.forEach(card => {
    //     card.addEventListener('drop', handleDrop)
    // })

    })

}

const handleDragStart = (e) => {
  
  ui.dragged = e.currentTarget;
  console.log(ui.dragged)
  ui.dragged.children[1].contentEditable = 'false'
  ui.dragged.classList.add('curr-dragging');
  console.log("Drag start of", ui.dragged);
  //sa adaug functie sa highlightuiesc sloturile disponibile
  //addHighlight

};

const handleDragEnd = () => {
  console.log("Drag end of", ui.dragged);
  ui.dragged.children[1].contentEditable = 'true'
  ui.dragged.classList.remove('curr-dragging');
  ui.dragged = null;
  // removeHighlightCardSlots(game.dragged);
}

const handleDragOver = (e) => {
  e.preventDefault();

}

const handleDragEnter = (e) => {
  console.log("Drag enter of", e.currentTarget);
}

const handleDragLeave = (e) => {
  console.log("Drag leave of", e.currentTarget);
  // removeEnterSlots(e.currentTarget);
}

const handleDrop = (e) => {
  e.preventDefault();
  
  console.log('elementul pe care il caram este : ',ui.dragged)
  
  const dropzone = e.currentTarget;
  console.log("Drop of", dropzone);
  const afterElement = getDragAfterElement(dropzone, e.clientY)
  console.log(afterElement)
  const draggable = document.querySelector('.curr-dragging')
  
  
  if (!afterElement){
    dropzone.appendChild(ui.dragged);
  } else {
    dropzone.insertBefore(ui.dragged, afterElement)
  }
  
  // console.log(ui.dragged.parentElement)
  // let order = selectOrder(ui.dragged, ui.dragged.parentElement);
  // console.log(order);
  // console.log('detaliile elementului carat' , ui.dragged.dataset.cardId);
  newCardProperties.card_id = ui.dragged.children[1].dataset.cardId;
  newCardProperties.board_id = ui.dragged.parentElement.parentElement.parentElement.dataset.boardId;
  newCardProperties.status_id = ui.dragged.parentElement.dataset.statusId;
  newCardProperties.card_order = selectOrder(ui.dragged, ui.dragged.parentElement);
  // console.log('card_id' + ui.dragged.children[1].dataset.cardId)
  // console.log('board_id' + ui.dragged.parentElement.parentElement.parentElement.dataset.boardId)
  // console.log('status_id' + ui.dragged.parentElement.dataset.statusId)
  console.log('Values to be sent final check : ',newCardProperties)
  dataHandler.updateCard(newCardProperties)
  

  // dropzone.parentNode.insertBefore(ui.dragged, dropzone);
  // e.currentTarget.parentNode.insertBefore(ui.dragged, e.currentTarget);
  function getDragAfterElement(container, y) {
    const draggableElements = [... container.querySelectorAll('.card:not(.curr-dragging)')]
    return draggableElements.reduce((closest, child) => {

      const box = child.getBoundingClientRect()
      console.log(box)
      const offset = y - box.top - box.height / 2
      console.log(offset)
      if (offset < 0 && offset > closest.offset) {
        // console.log('daca il pun in jumatatea de JOS noua valoare a elementului carat ar trebui sa fie',child.dataset.cardOrder)
        newCardProperties.card_order = parseInt(child.dataset.cardOrder)
        return {offset: offset, element: child}
      } else {
        // console.log('daca il pun in jumatatea de JOS noua valoare a elementului carat ar trebui sa fie',parseInt(child.dataset.cardOrder)+1)
        newCardProperties.card_order = parseInt(child.dataset.cardOrder)+1
        return closest
      }

    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
  

}

