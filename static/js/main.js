import { boardsManager } from "./controller/boardsManager.js";
import { addEvents } from "./controller/layoutManager.js";

async function init() {
  await boardsManager.loadBoards();
  addEvents.createBoard();
  addEvents.createStatus();
  addEvents.deleteStatuses();
}

init();
