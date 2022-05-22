import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const ui = {
  slots: null,
  cards: null,
  dragged: null,
};

let newCardProperties = {
  status_id: null,
  board_id: null,
  card_id: null,
  card_order: null,
};

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
  addCards: async function (card, boardId, uniqueStatusId) {
    const cardBuilder = htmlFactory(htmlTemplates.card);
    const content = cardBuilder(card);
    domManager.addChild(
      `body > div.board-container > section:nth-child(${boardId}) > div.board-columns > div:nth-child(${uniqueStatusId}) > div.board-column-content`,
      content
    );
  },

  enableDragAndDrop: function () {
    initElements(ui);
    initDraggable(ui);
    initDropZone(ui);
  },

  insertCard: async function () {
    const addCardButtons = document.querySelectorAll(".board-add");
    addCardButtons.forEach((button) => {
      button.addEventListener("click", addCard);
    });
  },
  delteCard: async function () {
    const cardContainers = document.querySelectorAll(".board-columns");
    cardContainers.forEach((container) => {
      container.addEventListener("click", deleteCard);
    });
  },
};

function deleteCard(e) {
  if (e.target.classList.contains("fa-trash-alt")) {
    console.log("card", e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
    dataHandler.deletecardFromDB(
      e.target.parentElement.parentElement.dataset.cardId
    );
  }
}

async function addCard(e) {
  const boardId = e.target.dataset.boardId;

  let cardDetailes = await dataHandler.insertCard({ board_id: boardId });
  console.log(cardDetailes[0]);

  document.querySelector(`.board-toggle[data-board-id="${boardId}"]`).click();
  document.querySelector(`.board-toggle[data-board-id="${boardId}"]`).click();
}

function selectOrder(dragged, parent) {
  let curentCount = 0;
  let found = false;
  console.log(parent.children);
  Array.from(parent.children).forEach((child) => {
    if (!found) curentCount++;
    if (child.dataset.cardId === dragged.dataset.cardId) {
      found = true;
    }
  });
  return curentCount;
}

function deleteButtonHandler(clickEvent) {}

const initElements = () => {
  ui.cards = document.querySelectorAll(".card");
  ui.slots = document.querySelectorAll(".board-column-content");

  ui.cards.forEach((card) => {
    card.setAttribute("draggable", true);
  });
};

const initDraggable = () => {
  ui.cards.forEach((card) => {
    card.setAttribute("draggable", true);
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });
};

const initDropZone = () => {
  ui.slots.forEach((slot) => {
    slot.addEventListener("dragenter", handleDragEnter);
    slot.addEventListener("dragover", handleDragOver);
    slot.addEventListener("dragleave", handleDragLeave);
    slot.addEventListener("drop", handleDrop);
  });
};

const handleDragStart = (e) => {
  console.log(
    "aici e dragstart",
    e.target.parentElement.parentElement.parentElement.dataset.boardId
  );
  ui.dragged = e.currentTarget;
  console.log(ui.dragged);
  ui.dragged.children[1].contentEditable = "false";
  ui.dragged.classList.add("curr-dragging");
  console.log("Drag start of", ui.dragged);
};

const handleDragEnd = (e) => {
  console.log(
    "aici e dragend",
    e.target.parentElement.parentElement.parentElement.dataset.boardId
  );
  console.log("Drag end of", ui.dragged);
  ui.dragged.children[1].contentEditable = "true";
  ui.dragged.classList.remove("curr-dragging");
  ui.dragged = null;
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnter = (e) => {
  console.log("Drag enter of", e.currentTarget);
};

const handleDragLeave = (e) => {
  console.log("Drag leave of", e.currentTarget);
};

const handleDrop = (e) => {
  e.preventDefault();

  console.log("elementul pe care il caram este : ", ui.dragged);

  const dropzone = e.currentTarget;
  console.log("Drop of", dropzone);
  const afterElement = getDragAfterElement(dropzone, e.clientY);
  console.log(afterElement);

  if (!afterElement) {
    dropzone.appendChild(ui.dragged);
  } else {
    dropzone.insertBefore(ui.dragged, afterElement);
  }

  newCardProperties.card_id = ui.dragged.children[1].dataset.cardId;
  newCardProperties.board_id =
    ui.dragged.parentElement.parentElement.parentElement.dataset.boardId;
  newCardProperties.status_id = ui.dragged.parentElement.dataset.statusId;
  newCardProperties.card_order = selectOrder(
    ui.dragged,
    ui.dragged.parentElement
  );
  console.log("Values to be sent final check : ", newCardProperties);
  dataHandler.updateCard(newCardProperties);

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".card:not(.curr-dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        console.log(box);
        const offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          newCardProperties.card_order = parseInt(child.dataset.cardOrder);
          return { offset: offset, element: child };
        } else {
          newCardProperties.card_order = parseInt(child.dataset.cardOrder) + 1;
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
};
