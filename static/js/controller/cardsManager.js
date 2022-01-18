import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const ui = {
  slots: null,
  cards: null,
  dragged: null,
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
    ui.cards.forEach(card => {
        card.addEventListener('drop', handleDrop)
    })

    })

}

const handleDragStart = (e) => {

  ui.dragged = e.currentTarget;
  ui.dragged.classList.add('curr-dragging');
  console.log("Drag start of", ui.dragged);
  //sa adaug functie sa highlightuiesc sloturile disponibile
  //addHighlight

};

const handleDragEnd = () => {
  console.log("Drag end of", ui.dragged);
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
        return {offset: offset, element: child}
      } else {
        return closest
      }

    }, { offset: Number.NEGATIVE_INFINITY }).element

  }

}