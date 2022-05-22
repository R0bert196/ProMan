import { boardsManager } from "../controller/boardsManager.js";
import { dataHandler } from "../data/dataHandler.js";

const buttonDeleteColumn = document.querySelector(".buttonDeleteColumn");

export let addEvents = {
  createBoard: async function () {
    document
      .querySelector(".buttonAddBoard")
      .addEventListener("click", async (e) => {
        const respone = await dataHandler.createNewBoard("New Board");
        if (respone.created) {
          boardsManager.loadBoards();
        }
      });
  },
  createStatus: async function () {
    document
      .querySelector(".buttonAddColumn")
      .addEventListener("click", async (e) => {
        const respone = await dataHandler.createNewStatus();
        location.reload();
        if (respone.created) {
          boardsManager.loadBoards();
        }
      });
  },

  deleteStatuses: async function () {
    const statuses = await dataHandler.getStatuses();
    const popup = document.querySelector(".popup-wrapper");
    const ul = document.querySelector(".statuses");
    const closeX = document.querySelector("#popup-x");
    const closeClose = document.querySelector("#popup-close");
    closeX.addEventListener("click", () => (popup.style.display = "none"));
    closeClose.addEventListener("click", () => (popup.style.display = "none"));

    statuses.forEach((status) => {
      ul.innerHTML += `<li class="list-group-item" data-status-id=${status.id}>${status.title}</li>`;
    });
    console.log(ul.children);
    Array.from(ul.children).forEach((child) => {
      child.addEventListener("click", () => {
        popup.style.display = "none";
        location.reload();
        dataHandler.deleteStatuses({ stat_id: child.dataset.statusId });
      });
    });
  },
};
buttonDeleteColumn.addEventListener("click", () => {
  const popup = document.querySelector(".popup-wrapper");
  popup.style.display == "block"
    ? (popup.style.display = "none")
    : (popup.style.display = "block");
});
