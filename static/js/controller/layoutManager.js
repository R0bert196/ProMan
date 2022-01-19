import { domManager } from "../view/domManager.js";
import { boardBuilder } from "../view/htmlFactory.js";
import { apiPost } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { boardsManager } from "../controller/boardsManager.js";
import { dataHandler } from "../data/dataHandler.js";

const button = document.querySelector('.buttonAddBoard');




//baga un event listener pe buton si creeaza boardul pe care il si baga in baza de date

export let addEvents  = {
    createBoard: async function () {
        // let title = 'Board-Hard-Codat';
        // button.addEventListener('click', () => dataHandler.createNewBoard(title))
        // let orice = button.addEventListener('click', () => dataHandler.createNewBoard(title))
        // console.log(orice)
        document.querySelector('.buttonAddBoard').addEventListener('click',  async(e) => {
            // e.target.parentElement.preventDefault();
            const respone = await dataHandler.createNewBoard('New Board');
            if(respone.created){
              boardsManager.loadBoards()
            }
          })

        // // let content = boardBuilder(newBoard);
        // const boardBuilder = htmlFactory(htmlTemplates.board);
        // domManager.addChild(content);
        

    }
};


// cream query pt introducerea in baza de date
// actualizam domul cu noul board