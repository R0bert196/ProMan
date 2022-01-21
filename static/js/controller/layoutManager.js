import { domManager } from "../view/domManager.js";
import { boardBuilder } from "../view/htmlFactory.js";
import { apiPost } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { boardsManager } from "../controller/boardsManager.js";
import { dataHandler } from "../data/dataHandler.js";

const button = document.querySelector(".buttonAddBoard");
const buttonDeleteColumn = document.querySelector(".buttonDeleteColumn");
//baga un event listener pe buton si creeaza boardul pe care il si baga in baza de date

export let addEvents = {
  createBoard: async function () {
    // let title = 'Board-Hard-Codat';
    // button.addEventListener('click', () => dataHandler.createNewBoard(title))
    // let orice = button.addEventListener('click', () => dataHandler.createNewBoard(title))
    // console.log(orice)
    document
      .querySelector(".buttonAddBoard")
      .addEventListener("click", async (e) => {
        // e.target.parentElement.preventDefault();
        const respone = await dataHandler.createNewBoard("New Board");
        if (respone.created) {
          boardsManager.loadBoards();
        }
      });

    // // let content = boardBuilder(newBoard);
    // const boardBuilder = htmlFactory(htmlTemplates.board);
    // domManager.addChild(content);
  },
  createStatus: async function () {
    document
      .querySelector(".buttonAddColumn")
      .addEventListener("click", async (e) => {
        const respone = await dataHandler.createNewStatus();
        // const ul = document.querySelector(".statuses").innerHTML = ''
        // addEvents.deleteStatuses();
        location.reload()
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
        popup.style.display = 'none';
        location.reload();
        dataHandler.deleteStatuses({ stat_id: child.dataset.statusId })
      }
      );
    });
  },
};
buttonDeleteColumn.addEventListener("click", () => {
  const popup = document.querySelector(".popup-wrapper");
  popup.style.display == "block"
    ? (popup.style.display = "none")
    : (popup.style.display = "block");
});

