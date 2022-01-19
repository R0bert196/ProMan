const container = document.querySelector('.board-container')

export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },
  getBoard: async function (boardId) {
    // the board is retrieved and then the callback function is called with the board
  },
  getStatuses: async function () {
    const request = await fetch(`api/status/content`)
    const response = await request.json()
    // console.log(response)
    return(response)
  }
  ,
  getBoardContent: async function (boardId) {
    // the statuses are retrieved and then the callback function is called with the statuses
    let toSend = {
      'boardId': boardId,
    }
    const request = await fetch(`api/board/content`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend)
    });
    const response = await request.json()
    // console.log(response)
    return(response)
  },
  getStatus: async function (statusId) {
    // the status is retrieved and then the callback function is called with the status
  },
  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  getCard: async function (cardId) {
    // the card is retrieved and then the callback function is called with the card
  },
  createNewBoard: async function (boardTitle) {
    // creates new board, saves it and calls the callback function with its data
    container.innerHTML = ''
    let toSend = {
      boardTitle,
    }
    const request = await fetch('/api/create_board',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend)
    });
    const response = await request.json()
    console.log(response)
    return(response)
    // nu am ce face cu raspunsul, pt ca nu updatez DOM-ul cu query, ci il adaug manual
    




  },
  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
  },
};

async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

//payload is an objcet
export async function apiPost(url, payload) {};




async function apiDelete(url) {}

async function apiPut(url) {}


// body > div.board-container > section:nth-child(1) > div.board-columns > div:nth-child(1) > div.board-column-content > div
// body > div.board-container > section:nth-child(3) > div.board-columns > div:nth-child(1) > div.board-column-content > div > div.card-title.data-card-order\=\'1\'.data-board-id\
// body > div.board-container > section:nth-child(3) > div.board-columns > div:nth-child(3) > div.board-column-content > div > div.card-title.data-card-order\=\'1\'.data-board-id\

// body > div.board-container > section:nth-child(1) > div.board-columns > div:nth-child(4) > div.board-column-content > div:nth-child(2) > div.card-title.data-card-order\=\'2\'.data-board-id\=

// // section:nth-child(n) == boardul
// // div:nth-child(n) == coloana
//div:nth-child(2)
