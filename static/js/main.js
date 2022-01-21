import { boardsManager } from "./controller/boardsManager.js";
import { addEvents } from "./controller/layoutManager.js";
import { dataHandler } from "../js/data/dataHandler.js";
import { cardsManager } from "./controller/cardsManager.js";

async function init() {
  await boardsManager.loadBoards();
  // addEvents.createBoard();
  addEvents.createBoard();
  addEvents.createStatus();
  addEvents.deleteStatuses();
}

init();
