import { boardsManager } from "./controller/boardsManager.js";
import { addEvents } from "./controller/layoutManager.js"
import { dataHandler } from "../js/data/dataHandler.js";


function init() {
  boardsManager.loadBoards();
  // addEvents.createBoard();
  addEvents.createBoard()
}

init();
